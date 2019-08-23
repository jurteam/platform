import contract from "truffle-contract";
// import toAsciiFromByte32 from "../utils/toAsciiFromByte32";
import ArbitrationFactoryABI from "../build/contracts/ArbitrationFactory.json";

let arbitrationFactorySCInstance = null;

export default class ArbitrationFactory {
  constructor() {
    if (!arbitrationFactorySCInstance) {
      arbitrationFactorySCInstance = this;
      this.web3 = window.web3;
      this.contract = contract(ArbitrationFactoryABI);
      this.contract.setProvider(this.web3.currentProvider);
    }

    return arbitrationFactorySCInstance;
  }

  /**
   * @dev Creates a new arbitration
   * @param _parties Addresses of parties involved in arbitration
   * @param _dispersal Dispersal of funds if arbitration agreed
   * @param _funding Source of funds for arbitration
   * @param _agreementHash Hash of arbitration agreement
   */
  async createArbitration(parties, dispersal, funding, agreementHash) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.createArbitration(
      parties,
      dispersal,
      funding,
      agreementHash,
      {
        from: account
      }
    );
  }

  /**
   * @notice Returns the hash of an agreement string made from a stringified object of arbitration kpi and resolution proof
   */
  async generateHash(string) {
    const instance = await this.contract.deployed();
    const [account] = await this.web3.eth.getAccounts();
    return instance.generateHash(string, {
      from: account
    });
  }
}
