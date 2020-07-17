export default class BaseConnexSC {
  constructor(contractJson) {
    this.contractJson = contractJson;
    console.log("BaseConnexSC", this.contractJson.networks, this.networkId());
    this.contractAddress = this.contractJson.networks[this.networkId()].address;
    this.contractAccount = global.connex.thor.account(this.contractAddress);
  }

  execute = (address, method, comment, ...params) => {
    const clause = this.clause(method, ...params);
    const signingService = this.signer();

    signingService
      .signer(address)
      .link("https://connex.vecha.in/{txid}")
      .comment(comment);

    return signingService.request([{ comment, ...clause }]);
  };

  filter = (eventName, filters) => this.event(eventName).filter(filters);

  signer = (of = "tx") => global.connex.vendor.sign(of);

  clause = (method, ...params) => this.method(method).asClause(...params);

  event = name => this.contractAccount.event(this.abiOf(name));

  method = name => this.contractAccount.method(this.abiOf(name));

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
