/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DrizzleProvider } from "drizzle-react";
import drizzleOptions from "../config/drizzleOptions"

import { log } from "../utils/helpers"; // log helpers
import MetaMask from "../hooks/MetaMask"; // MetaMask hook

// Actions
import { setLoaded } from "../actions/App";
import { setWalletAddress, setWalletConnection } from "../actions/Wallet";

class Initializer extends PureComponent {
  componentDidMount() {
    const { setLoaded, setWalletConnection, setWalletAddress } = this.props;

    // TODO: centralize auth promise actions
    // First load
    if (!MetaMask.isEnabled()) {
      MetaMask.auth()
        .then(addresses => {
          log("MetaMask is authorized", addresses);
          setWalletConnection(true); // is connected
          setWalletAddress(addresses[0]); // only the first
          setLoaded();
        })
        .catch(e => {
          log("MetaMask authorization denied", e);
          setWalletConnection(false); // is connected
          setLoaded();
        });
    }
  }
  render() {
    const { children } = this.props;
    return (<DrizzleProvider options={drizzleOptions}>{children}</DrizzleProvider>);
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
