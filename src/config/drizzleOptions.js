// Contracts
// please see "protocol/README.md" subtree for furter informations about contracts deployment
// import Arbitration from "../build/contracts/Arbitration.json";
import ArbitrationFactory from "./../build/contracts/ArbitrationFactory.json";
import JURToken from "./../build/contracts/JURToken.json";

// import Migrations from "../build/contracts/Migrations.json";

const options = {
  // web3: {
  //   block: false,
  //   fallback: {
  //     type: "ws",
  //     url: "ws://127.0.0.1:8545"
  //   }
  // },
  contracts: [JURToken, ArbitrationFactory],
  // events: {
  //   SimpleStorage: ["StorageSet"],
  // },
  // polls: {
  //   accounts: 1500
  // }
};

export default options;
