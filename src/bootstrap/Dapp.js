import Web3 from "web3";
import { log } from "../utils/helpers"; // helpers
import MetaMask from "../hooks/MetaMask"; // MetaMask hook

// Actions types
import { NETWORK_UPDATE } from "../reducers/types";

const ETHEREUM_PROVIDER = process.env.REACT_APP_ETHEREUM_PROVIDER;

let web3;
let network;

// Dapp init
export const init = () => {
  const { web3, store } = global.drizzle;

  log("Dapp - web3", web3);
  log("Dapp - web3.currentProvider", web3.currentProvider);
  log("Dapp - web3.currentProvider._metamask", web3.currentProvider._metamask);

  // provider change handler
  if (web3.currentProvider._metamask) {

    // MetaMask handler
    // MetaMask.setProvider(web3.currentProvider);

    // const { wallet } = store.getState();

    // only if current provider is hosted by MetaMask
    web3.currentProvider.publicConfigStore.on("update", evm => {
      log("Dapp - evm", evm);
      store.dispatch({ type: NETWORK_UPDATE, payload: evm });
    });
  }
};
/*
  if (process.env.NODE_ENV === "test")
    web3 = new Web3(require("ganache-cli").provider());
  else if (window.web3 && window.web3.currentProvider)
    web3 = new Web3(window.web3.currentProvider);
  else web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));

  network =
    web3.eth &&
    web3.eth.net
      .getId()
      .then(networkID => {
        switch (networkID) {
          case 1:
            return "main";
          case 3:
            return "ropsten";
          case 4:
            return "rinkeby";
          case 42:
            return "kovan";
          default:
            return null;
        }
      })
      .catch(() => null);

  // provider change handler
  if (web3.currentProvider.host === "metamask") {
    // MetaMask handler
    MetaMask.setProvider(web3.currentProvider);

    const { wallet } = store.getState();

    // only if current provider is hosted by MetaMask
    web3.currentProvider.connection.publicConfigStore.on("update", evm => {
      log("MetaMask", MetaMask.isEnabled());
      log("MetaMask update data", evm);

      if (
        typeof evm.selectedAddress !== "undefined" &&
        evm.selectedAddress !== undefined
      ) {
        // TODO: refers to web3 properties
        // store.dispatch(setWalletConnection(true)); // is connected

        // Update address when needed
        if (wallet.address !== evm.selectedAddress) {
          log("wallet.address !== evm.selectedAddress", evm);
          store.dispatch(setWalletAddress(evm.selectedAddress));
        }
      } else {
        // TODO: refers to web3 properties
        store.dispatch(resetWallet()); // is considered disconnected
      }
    });

    // Heartbeat for connection
    // TODO: Evaluate a Service Worker for this purpose
    setInterval(() => {
      log("Heartbeat", MetaMask.isEnabled());
      if (!MetaMask.isEnabled()) {
        store.dispatch(resetWallet()); // is considered disconnected
      }
    }, process.env.REACT_APP_HEARTBEAT_DELAY);
  }
};

const ETHAddressRegExpCaptureGroup = "(0x[a-fA-F0-9]{40})";
const ETHAddressRegExp = /0x[a-fA-F0-9]{40}/;
const strictETHAddressRegExp = /^0x[a-fA-F0-9]{40}$/;

export {
  web3,
  network,
  ETHAddressRegExpCaptureGroup,
  ETHAddressRegExp,
  strictETHAddressRegExp
};
*/
