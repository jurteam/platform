import React, { Component } from "react";

import appReference from "../../package.json"; // config
import i18n from "../assets/i18n/en/labels.json"; // i18n

import { log, connector } from "../utils/helpers";

// Comet
import Comet from "../hooks/Comet";
import {
  SET_LOADING,
   APP_EXIT,
   CATCH_EVENTS,
   CONNEX_INITIALIZED,
   CONNEX_SETWALLETAPI,
   SET_WALLET_ADDRESS
  } from "../reducers/types.js";

// Api layouts
import { connexSign } from "../api";

// Application Context
export const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    // this.auth = this.auth.bind(this);
    this.connexAuth = this.connexAuth.bind(this);
    this.tickerLoop = this.tickerLoop.bind(this);
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
    }
    // else if (connectorValue === 'web3') {
    //   log('AppProvider - componentDidMount - window.web3',window.web3)
    //   this.auth();
    // }
    else {
      log('AppProvider - componentDidMount - else window.web3',window.web3)
      this.setState({ cometLoading: false });
      this.store.dispatch({ type: SET_LOADING, payload: false });
    }
  }

  componentWillUnmount() {
    Comet.cancel()
  }

  connexAuth()
  {

    let address='';

    this.store.dispatch({ type: SET_LOADING, payload: true });
    this.setState({ cometLoading: true });

    // try to connect via connex
    if(window.connex) {

      global.dispatcher = this.store.dispatch;
      log("AppProvider - connexAuth", "connex ok");
      const connex = window.connex

      const signApp = new connexSign();

      signApp.signCertIdentification()
      .then(result=>{

          log("AppProvider - connexAuth - result",result)
          log("AppProvider - connexAuth - signer",result.annex.signer)
          address = result.annex.signer

          global.dispatcher({ type: SET_WALLET_ADDRESS, payload: address });

          this.setState({ onNetwork: true, connex: true, connex });
          global.connector = 'connex'

          this.tickerLoop()

          global.dispatcher({type: CONNEX_INITIALIZED, address: address });

        }).catch(err => {
          log("AppProvider - connexAuth - catch",err)

          log("AppProvider", "network connection error!");
          this.setState({ cometLoading: false });
          global.dispatcher({ type: SET_LOADING, payload: false });
        })

    }

  }

  tickerLoop() {
    log('tickerLoop')
    if(window.connex)
    {
      log('tickerLoop - connex')
      const ticker = window.connex.thor.ticker()
      ticker.next().then((head)=>{
        this.tickerLoop()

        global.dispatcher({type: CATCH_EVENTS, block: head });
      })
    }
  }

  // auth() {
  //   this.store.dispatch({ type: SET_LOADING, payload: true });
  //   this.setState({ cometLoading: true });
  //   Comet.auth(
  //     (customProvider) => {
  //       // success
  //       log("AppProvider", "store should be updated");
  //       log("AppProvider - customProvider", customProvider);


  //       global.connector = 'web3'


  //       this.setState({ onNetwork: true, web3: true, customProvider });
  //     },
  //     () => {
  //       // error
  //       log("AppProvider", "network connection error!");
  //       this.setState({ cometLoading: false });
  //       this.store.dispatch({ type: SET_LOADING, payload: false });
  //     }
  //   );
  // }

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
