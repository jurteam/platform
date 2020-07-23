export default class BaseConnexSC {
  constructor(contractJson) {
    this.contractJson = contractJson;
    this.contractAddress = this.contractJson.networks[this.networkId()].address;
    this.contractAccount = global.connex.thor.account(this.contractAddress);
  }

  /**
   *
   * @param {string} address : Signer's wallet address
   * @param {string} method : One of the methods in Smart Contract
   * @param {string} comment : A message shown on sign box in Sync browser
   * @param  {...any} params : Parameters the 'method' takes
   *
   * @returns {Promise} : A connex request promise which resolves to tx (transaction hash) and signer
   */
  execute = (address, method, comment, ...params) => {
    const clause = this.clause(method, ...params);
    const signingService = this.signer();

    signingService
      .signer(address)
      .link("https://connex.vecha.in/{txid}")
      .comment(comment);

    return signingService.request([{ comment, ...clause }]);
  };

  /**
   *
   * @param {String} eventName : One of the event from Smart Contract
   * @param {Array<Object>} filters : Connex filter function's parameter. Please read Connex doc
   *
   * @returns {Promise} : Resolves when filter condition is satisfied or then latest block is read
   */
  filter = (eventName, filters) => this.event(eventName).filter(filters);

  /**
   *
   * @param {String} of : Type of signer proviced by Connex. Please read Connex doc
   *
   * @returns {Signer} : Connex signer object
   */
  signer = (of = "tx") => global.connex.vendor.sign(of);

  /**
   *
   * @param {String} method : One of the method from Smart Contract
   * @param  {...any} params : Parameters for the 'method'
   *
   * @returns {Clause} : Connex clause object
   */
  clause = (method, ...params) => this.method(method).asClause(...params);

  /**
   *
   * @param {String} name : One of the event from the Smart Contract
   *
   * @returns {Event} : Connex event object
   */
  event = name => this.contractAccount.event(this.abiOf(name));

  /**
   *
   * @param {String} name : One of the method from the Smart Contract
   *
   * @returns {Method} : Connex method object
   */
  method = name => this.contractAccount.method(this.abiOf(name));

  /**
   *
   * @param {String} method : One of the method from the Smart Contract
   *
   * @returns {Object} : ABI of the method
   */
  abiOf = method => this.contractJson.abi.filter(a => a.name === method)[0];

  networkId = () => {
    const thorGenesisId = global.connex.thor.genesis.id;
    const chainTag = thorGenesisId.toString().substr(-2);

    switch (chainTag) {
      case "4a": // mainnet
        return 1;
      case "27": // testnet
        return 3;
      default:
        // localhost / other
        return 5777;
    }
  };
}
