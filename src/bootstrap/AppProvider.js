import React, { Component } from "react";

import appReference from "../../package.json"; // config
import i18n from "../assets/i18n/en/labels.json"; // i18n

import { log, randomHEXString, connector } from "../utils/helpers";

// Comet
import Comet from "../hooks/Comet";
import { 
  SET_LOADING,
   APP_EXIT,
   CONNEX_INITIALIZED,
   CONNEX_SETWALLETAPI,
   SET_WALLET_ADDRESS 
  } from "../reducers/types.js";

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.auth = this.auth.bind(this);
    this.connexAuth = this.connexAuth.bind(this);
    this.exit = this.exit.bind(this);
    global.exit = this.exit; // available everywhere for sync purposes

    this.store = props.store;

    global.store = props.store;

    this.state = {
      version: appReference.version,
      labels: i18n,
      closedCodes: [-1, 9, 29, 39],
      archivableCodes: [-1, 0, 9, 29, 39],
      cometLoading: true,
      customProvider: null,
      connex: false,
      web3: false,
      notificationsTableHeaders: [
        {label: "", className: "jur-col--options", key: "status"},
        {label: i18n.date, sortable: true, className: "jur-col--duration", key: "date"},
        {label: i18n.message, key: "activity"},
        {label: "", className: "jur-col--options", key: "opt"}
      ],
      contractTableHeaders: [
        { label: i18n.status, sortable: false, className: "jur-col--status" },
        { label: i18n.contractName, fieldName:'name', sortable: true },
        { label: i18n.duration, sortable: false, className: "jur-col--duration" },
        { label: i18n.couterpartyDetails, sortable: false, className: "jur-col--wallet" },
        { label: i18n.contractValue, fieldName:'value', sortable: true, className: "jur-col--amount" },
        { label: "", sortable: false, className: "jur-col--options" } // options
      ],
      disputeTableHeaders: [
        { label: i18n.status, sortable: false, className: "jur-col--status" },
        { label: i18n.disputeName, fieldName:'name', sortable: true },
        { label: i18n.duration, sortable: false, className: "jur-col--duration-with-seconds" },
        { label: i18n.category, fieldName:'category', sortable: true, className: "jur-col--category" },
        { label: i18n.contractValue, fieldName:'value', sortable: true, className: "jur-col--amount" },
        { label: i18n.earnings, sortable: false, className: "jur-col--amount" },
        { label: "", sortable: false, className: "jur-col--options" } // options
      ],
      oraclesTableHeaders: [
        { label: i18n.ethAddress, sortable: false },
        { label: i18n.vote, sortable: false },
        { label: i18n.msg, sortable: false },
        { label: i18n.amount, sortable: false },
        { label: i18n.time, sortable: false }
      ],
      oraclesFullTableHeaders: [
        { label: i18n.ethAddress, sortable: false },
        { label: i18n.vote, fieldName:'wallet_part', sortable: true },
        { label: i18n.msg, sortable: false },
        { label: i18n.evidences, sortable: false },
        { label: i18n.amount, fieldName:'amount', sortable: true },
        { label: i18n.time, sortable: false }
      ],
      onNetwork: false,
      auth: this.auth,
      connexAuth: this.connexAuth,
      exit: this.exit
    };
  }

  componentDidMount() {

    const connectorValue = connector();
    log('AppProvider - componentDidMount',connectorValue)
    
    if(connectorValue === 'connex') {
      log('AppProvider - componentDidMount - window.connex',window.connex)
      this.connexAuth();
    } else if (connectorValue === 'web3') {
      log('AppProvider - componentDidMount - window.web3',window.web3)
      this.auth();
    } else {
      log('AppProvider - componentDidMount - else window.web3',window.web3)
      this.setState({ cometLoading: false });
      this.store.dispatch({ type: SET_LOADING, payload: false });
    }
  }

  componentWillUnmount() {
    Comet.cancel()
  }

  connexAuth() {

        let address = '';
        this.store.dispatch({ type: SET_LOADING, payload: true });
        this.setState({ cometLoading: true });
    
        // try to connect via connex
        if(window.connex && address === '') {

          global.dispatcher = this.store.dispatch;
          log("AppProvider - connexAuth", "connex ok");
          const connex = window.connex
          

          const signingService = connex.vendor.sign('cert')
          log("AppProvider - connexAuth - signingService1", signingService);
          
          // signingService.link('https://rugge.free.beeceptor.com/{certid}') // User will be back to the app by the url https://connex.vecha.in/0xffff....
          
          log("AppProvider - connexAuth - signingService2", signingService);


          let rndString = randomHEXString(8);

          // Generate a random string and request the identification
          signingService.request({
            purpose: 'identification',
            payload: {
                type: 'text',
                content: rndString
                //auth-429895D1-95D1-F11B-DD10 

                //auth-0E51B805-B805-A668-71D1
                //auth-7FF3228A-228A-71DB-BFBB
            }
          }).then(result=>{
            log("AppProvider - connexAuth - result",result)
            log("AppProvider - connexAuth - signer",result.annex.signer)
            address = result.annex.signer

            global.dispatcher({ type: SET_WALLET_ADDRESS, payload: address });

            this.setState({ onNetwork: true, connex: true, connex });
            global.connector = 'connex'
            global.dispatcher({type: CONNEX_INITIALIZED, address: address });

          }).catch(err => {
            log("AppProvider - connexAuth - catch",err)

            log("AppProvider", "network connection error!");
            this.setState({ cometLoading: false });
            global.dispatcher({ type: SET_LOADING, payload: false });
          })

          // location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href)

          // const status = connex.thor.status
          // log('AppProvider - You are `connexed` to vechain, the status is ' + (status.progress === 1 ? 'synced': 'syncing'))
          // log('AppProvider - window',window)
          // log('AppProvider - connex',connex)
          // // log('AppProvider - connex.caller()',connex.caller())
          // log('AppProvider - connex.vendor',connex.vendor)
          // log('AppProvider - connex.vendor.owned',connex.vendor.owned)
          // log('AppProvider - connex.vendor.sign',connex.vendor.sign)
          // log('AppProvider - connex.thor',connex.thor)
          // log('AppProvider - connex.thor.genesis',connex.thor.genesis)
          // log('AppProvider - connex.account',connex.thor.account)
          // log('AppProvider - connex.account.get',connex.account.get)
          
          // connex.vendor.owned('0x7567D83b7b8d80ADdCb281A71d54Fc7B4364ffed').then(owned =>{ 
          //   console.log(owned)
          // })

        //   this.setState({ onNetwork: false });

        // } else {

          
        }
  }

  auth() {
    this.store.dispatch({ type: SET_LOADING, payload: true });
    this.setState({ cometLoading: true });
    Comet.auth(
      (customProvider) => {
        // success
        log("AppProvider", "store should be updated");
        log("AppProvider - customProvider", customProvider);


        global.connector = 'web3'


        this.setState({ onNetwork: true, web3: true, customProvider });
      },
      () => {
        // error
        log("AppProvider", "network connection error!");
        this.setState({ cometLoading: false });
        this.store.dispatch({ type: SET_LOADING, payload: false });
      }
    );
  }

  exit() {
    const exitState = { onNetwork: false, cometLoading: false };
    this.store.dispatch({ type: APP_EXIT, exitState });
    this.setState(exitState);
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
