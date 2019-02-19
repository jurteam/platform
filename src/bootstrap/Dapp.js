import { log } from "../utils/helpers"; // helpers
import MetaMask from "../hooks/MetaMask"; // MetaMask hook

// Actions types
import {
  HEARTBEAT,
  NETWORK_UPDATE,
  APP_SHOULD_RESET
} from "../reducers/types";

let dappHeartbeat = null;

// Dapp init
export const init = () => {
  const { web3, store } = global.drizzle;

  log("Dapp - web3", web3);
  log("Dapp - web3.currentProvider", web3.currentProvider);
  log("Dapp - web3.currentProvider._metamask", web3.currentProvider._metamask);

  // provider change handler
  if (web3.currentProvider._metamask) {
    // MetaMask handler
    MetaMask.setProvider(web3.currentProvider);

    // only if current provider is hosted by MetaMask
    web3.currentProvider.publicConfigStore.on("update", evm => {
      log("Dapp - evm", evm);
      store.dispatch({ type: NETWORK_UPDATE, payload: evm });
    });

    // Heartbeat for connection
    // TODO: Evaluate a Service Worker for this purpose
    if (process.env.REACT_APP_HEARTBEAT_ENABLED === "true") {
      dappHeartbeat = setInterval(() => {
        store.dispatch({ type: HEARTBEAT });
        log("Dapp - Heartbeat", "run");

        log("Dapp - MetaMask.isEnabled()", MetaMask.isEnabled());

        MetaMask.isApproved().then(isApproved => {
          log("Dapp - MetaMask - isApproved?", isApproved);
          if (!isApproved) {
            store.dispatch({ type: APP_SHOULD_RESET });
            clearInterval(dappHeartbeat);
          }
        });
        MetaMask.isUnlocked().then(isUnlocked =>
          log("Dapp - MetaMask - isUnlocked?", isUnlocked)
        );
      }, process.env.REACT_APP_HEARTBEAT_DELAY);
    }
  }
};
