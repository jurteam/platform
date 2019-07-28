import { log } from "../utils/helpers"; // helpers
import Comet from "../hooks/Comet"; // Comet hook
import API from "./Api"; // Axios

// Actions types
import { HEARTBEAT, NETWORK_UPDATE, APP_SHOULD_RESET } from "../reducers/types";

let dappHeartbeat = null;

// Dapp init
export const init = () => {
  const { web3, store } = global.drizzle;

  log("Dapp - global.drizzle", global.drizzle);
  log("Dapp - web3", web3);
  log("Dapp - web3.currentProvider", web3.currentProvider);
  log("Dapp - web3.currentProvider._comet", web3.currentProvider._comet);

  // provider change handler
  if (web3.currentProvider._comet) {
    // Comet handler
    Comet.setProvider(web3.currentProvider);

    // only if current provider is hosted by Comet
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

        log("Dapp - Comet.isEnabled()", Comet.isEnabled());

        Comet.isApproved().then(isApproved => {
          log("Dapp - Comet - isApproved?", isApproved);
          if (!isApproved) {
            store.dispatch({ type: APP_SHOULD_RESET });
            clearInterval(dappHeartbeat);
          }
        });
        Comet.isUnlocked().then(isUnlocked =>
          log("Dapp - Comet - isUnlocked?", isUnlocked)
        );
      }, process.env.REACT_APP_HEARTBEAT_DELAY);
    }

    global.API = API; // use a axios api istance globally
  }
};
