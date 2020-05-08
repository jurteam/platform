import OathKeeperContract from "../../build/contracts/OathKeeper.json";
import connexJURToken from "./JURToken";

export default class connexOathKeeper {
  constructor() {
    // this.contractAddress = "0x730c7A23A6258Ed2BaD2EEF4b227f3044Dc160EB";
    // this.contractAddress = "0x862676750f53e92e2502e54ef5c5bfefccfcef51";
    this.contractAddress =
      OathKeeperContract.networks[this.currentNetworkId()].address;
    this.contractAccount = global.connex.thor.account(this.contractAddress);
  }

  takeAnOath = (address, amount, lockInPeriod) => {
    if (!isOathable(amount, lockInPeriod))
      return Promise.reject("Invalid parameters! Can't take oath");

    const approveClause = new connexJURToken().approveClause(
      this.contractAddress,
      amount
    );

    return this.lockIn(address, lockInPeriod, approveClause).then(data => {
      this.listen(data, amount, lockInPeriod);
      return data;
    });
  };

  lockIn = (address, lockInPeriod, approveClause) => {
    const takeAnOathMethod = this.contractAccount.method(
      this.abiOf("takeAnOath")
    );

    const takeAnOathClause = takeAnOathMethod.asClause(lockInPeriod);

    const signingService = global.connex.vendor.sign("tx");
    signingService
      .signer(address)
      .gas(global.connex.thor.genesis.gasLimit)
      .link("https://connex.vecha.in/{txid}")
      .comment("Take an oath with given lock up duration");

    return signingService.request([
      {
        comment: "approve the amount",
        ...approveClause
      },
      {
        comment: "lock up the amount",
        ...takeAnOathClause
      }
    ]);
  };

  releaseOath = (address, oathIndex) => {
    const releaseOathMethod = this.contractAccount.method(
      this.abiOf("releaseOath")
    );
    const releaseOathClause = releaseOathMethod.asClause(oathIndex);

    const signingService = global.connex.vendor.sign("tx");
    signingService
      .signer(address)
      .gas(global.connex.thor.genesis.gasLimit)
      .link("https://connex.vecha.in/{txid}")
      .comment("Release the unlocked oath");

    return signingService.request([
      {
        comment: "release the oath",
        ...releaseOathClause
      }
    ]);
  };

  fetchOathAt = (address, oathIndex) => {
    const lockMapMethod = this.contractAccount.method(this.abiOf("lockMap"));
    lockMapMethod.cache([address]);
    return lockMapMethod.call(address, oathIndex).then(output => {
      return {
        ...output.decoded,
        amount: Number(output.decoded.amount),
        oathIndex
      };
    });
  };

  fetchOathStatsOf = address => {
    const oathStatsMethod = this.contractAccount.method(
      this.abiOf("oathStats")
    );
    oathStatsMethod.cache([address]);
    return oathStatsMethod.call(address).then(output => {
      return { ...output.decoded };
    });
  };

  fetchOathsOf = async address => {
    let decoded = await this.fetchOathStatsOf(address);
    const total = Number(decoded.count);
    const allFetches = [];
    for (let oathIndex = total; oathIndex >= 1; oathIndex--) {
      allFetches.push(this.fetchOathAt(address, oathIndex));
    }

    return Promise.all(allFetches).catch(err =>
      console.error("oathStats failed all oaths", err)
    );
  };

  listen = ({ signer, txid }, amount, lockInPeriod) => {
    const oathTakenEvent = this.contractAccount.event(this.abiOf("OathTaken"));
    const filter = oathTakenEvent
      .filter([
        {
          __beneficiary: signer,
          _amount: amount,
          _lockInPeriod: lockInPeriod
        }
      ])
      .order("desc");
    filter.apply(0, 1).then(logs => console.log("OathTaken Event Logs", logs));
  };

  abiOf = method => OathKeeperContract.abi.filter(a => a.name === method)[0];

  currentNetworkId = () => {
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

export const isOathable = (amount, lockInPeriod) => {
  return Number(amount) > 0 && Number(lockInPeriod) > 0;
};
