/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { log } from "../utils/helpers"; // log helpers

// Web3 dapp utilities
import { web3 } from "./Dapp";

// Actions
import { setWalletAddress, setWalletConnection } from "../actions/Wallet";

class Initializer extends PureComponent {
  componentDidMount() {
    const { wallet, setWalletConnection, setWalletAddress } = this.props;

    // provider change handler
    if (web3.currentProvider.host === "metamask") {
      // only if current provider is hosted by MetaMask
      web3.currentProvider.connection.publicConfigStore.on("update", evm => {
        log("MetaMask update", evm);
        if (
          typeof evm.selectedAddress !== "undefined" &&
          wallet.address !== evm.selectedAddress
        ) {
          setWalletConnection(true);
          setWalletAddress(evm.selectedAddress);
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
