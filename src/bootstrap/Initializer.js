/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { log } from "./../utils/helpers"; // log helpers
import MetaMask from "./../hooks/MetaMask"; // MetaMask hook

// Actions
import { setLoaded } from "./../actions/App";
import { setWalletAddress, setWalletConnection } from "./../actions/Wallet";

class Initializer extends PureComponent {
  componentDidMount() {
    const { setLoaded, setWalletConnection, setWalletAddress } = this.props;

    log('Initializer - componentDidMount', { MetaMask, setLoaded, setWalletConnection, setWalletAddress });

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
  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = {
  setLoaded,
  setWalletAddress,
  setWalletConnection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initializer);
