// Contracts
// please see "protocol/README.md" subtree for furter informations about contracts deployment
import ArbitrationFactory from "../build/contracts/ArbitrationFactory.json";
import JURToken from "../build/contracts/JURToken.json";

const options = {
  web3: {
    block: false,
    vechain: "http://localhost:8669",
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

export default options;
