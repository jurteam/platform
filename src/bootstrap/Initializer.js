/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { log } from "../utils/helpers"; // log helpers
import MetaMask from "../hooks/MetaMask"; // MetaMask hook

// Web3 dapp utilities
import { web3 } from "./Dapp";

// Actions
import { setWalletAddress, setWalletConnection } from "../actions/Wallet";

class Initializer extends PureComponent {
  componentDidMount() {
    const { wallet, setWalletConnection, setWalletAddress } = this.props;

    // TODO: centralize auth promise actions
    if (MetaMask.isEnabled()) {
      MetaMask.auth()
        .then((addresses) => {
          log('MetaMask is authorized', addresses);
          setWalletConnection(true); // is connected
          setWalletAddress(addresses[0]); // only the first
        })
        .catch((e) => {
          log('MetaMask authorization denied', e);
          setWalletConnection(false); // is connected
        })
    };

    // provider change handler
    if (web3.currentProvider.host === "metamask") {

      // only if current provider is hosted by MetaMask
      web3.currentProvider.connection.publicConfigStore.on("update", (evm, t) => {

        log("MetaMask", MetaMask.isEnabled());
        log("MetaMask update data", {evm, t});

        if (typeof evm.selectedAddress !== "undefined") {
          // TODO: refers to web3 properties
          setWalletConnection(true); // is connected

          // Update address when needed
          if (wallet.address !== evm.selectedAddress) {
            log("MetaMask update", evm);
            setWalletAddress(evm.selectedAddress);
          }
        } else {
          // TODO: refers to web3 properties
          setWalletConnection(false); // is considered disconnected
        }
      });
    }
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = state => ({
  wallet: state.wallet
});

const mapDispatchToProps = {
  setWalletAddress,
  setWalletConnection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initializer);
