/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

import { log } from "./../utils/helpers"; // log helpers
import MetaMask from "./../hooks/MetaMask"; // MetaMask hook

// Web3 dapp utilities
import { init } from "../bootstrap/Dapp";

// Actions
import { setLoaded } from "./../actions/App";
import { setWalletAddress, setWalletConnection } from "./../actions/Wallet";

class Initializer extends PureComponent {
  constructor(props, context) {
    super(props);

    const { drizzle } = context;
    this.drizzle = drizzle;
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

    init(this.drizzle.store); // Dapp init

    log("Initializer - componentDidMount", {
      MetaMask,
      setLoaded,
      setWalletConnection,
      setWalletAddress
    });

    // TODO: centralize auth promise actions
    // First load
    if (!MetaMask.isEnabled()) {
      MetaMask.auth()
        .then(addresses => {
          log("Initializer - MetaMask is authorized", addresses);
          setWalletConnection(true); // is connected
          setWalletAddress(addresses[0]); // only the first
          setLoaded();
        })
        .catch(e => {
          log("Initializer - MetaMask authorization denied", e);
          setWalletConnection(false); // is connected
          setLoaded();
        });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { children, web3, wallet } = this.props;
    return (
      <div status={web3.status || wallet.isConnected ? "on" : "off"}>
        {children}
      </div>
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
  setLoaded,
  setWalletAddress,
  setWalletConnection
};

export default drizzleConnect(Initializer, mapStateToProps, mapDispatchToProps);
