// Contracts
// please see "protocol/README.md" subtree for furter informations about contracts deployment
import Arbitration from "../build/contracts/Arbitration.json";
import ArbitrationFactory from "../build/contracts/ArbitrationFactory.json";
import JURToken from "../build/contracts/JURToken.json";

import { thorify } from "thorify";
const Web3 = require("web3");		// Recommend using require() instead of import here

const customProvider = thorify(new Web3(), "http://localhost:8669");

const options = {
  web3: {
    block: false,
    customProvider,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545"
    }
  },
  contracts: [JURToken, ArbitrationFactory],
  events: {
    ArbitrationFactory: ["ArbitrationCreated"],
    JURToken: ["Approval"],
  },
  // polls: {
  //   accounts: 1500
  // }
};

export default options;
