// Contracts
// please see "protocol/README.md" subtree for furter informations about contracts deployment
import ArbitrationFactory from "../build/contracts/ArbitrationFactory.json";
import JURToken from "../build/contracts/JURToken.json";

import { log } from "../utils/helpers";

const options = {
  web3: {
    block: false,
    vechain: (process.env.REACT_APP_VECHAIN_NETWORK_URL === "true") ? true : process.env.REACT_APP_VECHAIN_NETWORK_URL, // TODO: change API endpoint based on web3.eth.getChainTag()
    thorify: true,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [JURToken, ArbitrationFactory],
  events: {
    ArbitrationFactory: ["ArbitrationCreated"],
    JURToken: ["Approval"],
  }
  // polls: {
  //   accounts: 1500
  // }
};

log("drizzleOptions", options);
log("drizzleOptions", options);

export default options;
