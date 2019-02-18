/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { Route, Switch, Router } from "react-router"; // react-router v4
import PropTypes from "prop-types";

import { drizzleConnect } from "drizzle-react";

import { log } from "./../utils/helpers"; // log helpers
import MetaMask from "./../hooks/MetaMask"; // MetaMask hook

// Web3 dapp utilities
import { init } from "../bootstrap/Dapp";

// Actions
import { setLoading } from "./../actions/App";
import { setWalletAddress } from "./../sagas/Wallet";

// Routes
import { createRoutes } from "./Routing";

// Commons
import Header from "../components/common/Header";
import Spinner from "../components/common/Spinner";

const Routes = createRoutes();

class Initializer extends PureComponent {
  constructor(props, context) {
    super(props);

    const { drizzle } = context;
    this.drizzle = drizzle;

    this.renderTestReport = this.renderTestReport.bind(this);
  }
  componentDidMount() {
    const { setLoaded, setWalletConnection, setWalletAddress } = this.props;

    // Drizzle init

    // // subscribe to changes in the store
    // this.unsubscribe = this.drizzle.store.subscribe(() => {
    //   // every time the store updates, grab the state from drizzle
    //   const drizzleState = this.drizzle.store.getState();

    //   // check to see if it's ready, if so, update local component state
    //   if (drizzleState.drizzleStatus.initialized) {
    //     this.setState({ loading: false, drizzleState });
    //   }
    // });

    // Load Drizzle context globally for actions
    global.drizzle = this.drizzle;

    // init(this.drizzle.store); // Dapp init

    log("Initializer - componentDidMount", {
      MetaMask,
      setLoading,
      setWalletConnection,
      setWalletAddress
    });

    // TODO: centralize auth promise actions
    // First load
    // if (!MetaMask.isEnabled()) {
    //   MetaMask.auth()
    //     .then(addresses => {
    //       log("Initializer - MetaMask is authorized", addresses);
    //       setWalletConnection(true); // is connected
    //       setWalletAddress(addresses[0]); // only the first
    //       setLoading(false);
    //     })
    //     .catch(e => {
    //       log("Initializer - MetaMask authorization denied", e);
    //       setWalletConnection(false); // is connected
    //       setLoading(false);
    //     });
    // }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderTestReport() {
    const { testElement } = this.props;
    return process.env.NODE_ENV === "development" ? testElement : null;
  }

  render() {
    const { children, web3, wallet, history } = this.props;
    log("Initializer - web3", web3);
    return (
      <Router history={history}>
        <>
          <Spinner />
          <Header />
          <Switch>
            {Routes.map((params, key) => (
              <Route {...params} key={key} />
            ))}
          </Switch>

          {this.renderTestReport()}
        </>
      </Router>
    );
  }
}

Initializer.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => ({
  wallet: state.wallet,
  web3: state.web3
});

const mapDispatchToProps = {
  setLoading,
  setWalletAddress
};

export default drizzleConnect(Initializer, mapStateToProps, mapDispatchToProps);
