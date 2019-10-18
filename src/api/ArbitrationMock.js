import contract from "truffle-contract";
import ArbitrationMockABI from "../build/contracts/ArbitrationMock.json";

import { log } from "../utils/helpers";

let arbitrationMockSCInstance = null;

export default class ArbitrationMock {
  constructor(address) {

    log("ArbitrationMock – Contract", global.drizzle.contracts[address])

    if (!arbitrationMockSCInstance) {
      arbitrationMockSCInstance = this;
      this.web3 = window.web3;
      this.contract = contract({...ArbitrationMockABI, address, networks: { "5777" : address }});
      this.contract.setProvider(this.web3.currentProvider);

      // define easy access variables
      this.address = address;
    }

    return arbitrationMockSCInstance;
  }

  /**
   * @notice Returns current block number
   */
  async getBlockNumber() {
    const instance = await this.contract.deployed();
    return instance.getBlockNumber();
  }

  /**
   * @notice Set a new block number
   */
  async setMockedBlockNumber(blockNumber) {
    const instance = await this.contract.deployed();
    return instance.setMockedBlockNumber(blockNumber);
  }

  /**
   * @notice Returns current timestamp
   */
  async getNow() {
    const instance = await this.contract.deployed();
    return instance.getNow();
  }

  /**
   * @notice Set a new chain timestamp
   */
  async setMockedNow(blockNumber) {
    const instance = await this.contract.deployed();
    return instance.setMockedNow(blockNumber);
  }
}
