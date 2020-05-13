import OathKeeperContract from "../../build/contracts/OathKeeper.json";
import connexJURToken from "./JURToken";

export default class connexOathKeeper {
  constructor() {
    // this.contractAddress = "0x730c7A23A6258Ed2BaD2EEF4b227f3044Dc160EB";
    this.contractAddress = "0x862676750f53e92e2502e54ef5c5bfefccfcef51"; //min
    // this.contractAddress = "0x1d34b7409114772d09784aeaa3203055c6805fe9" // Suhail
    // this.contractAddress =
    //   OathKeeperContract.networks[this.currentNetworkId()].address;
    this.contractAccount = global.connex.thor.account(this.contractAddress);
  }

  takeAnOath = (address, amount, lockInPeriod) => {
    if (!isOathable(amount, lockInPeriod))
      return Promise.reject("Invalid parameters! Can't take oath");

    const approveClause = new connexJURToken().approveClause(
      this.contractAddress,
      amount
    );

    return this.lockIn(address, lockInPeriod, approveClause).then(
      signedResponse => {
        const filters = [
          {
            _beneficiary: address,
            _amount: amount,
            _lockInPeriod: lockInPeriod
          }
        ];
        return this.listen("OathTaken", signedResponse, filters);
      }
    );
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

    return signingService
      .request([
        {
          comment: "release the oath",
          ...releaseOathClause
        }
      ])
      .then(signedResponse => {
        const filters = [
          {
            _beneficiary: address,
            _oathIndex: oathIndex
          }
        ];

        return this.listen("IHoldYourOathFulfilled", signedResponse, filters);
      });
  };

  fetchOathAt = (address, oathIndex) => {
    const lockMapMethod = this.contractAccount.method(this.abiOf("lockMap"));
    lockMapMethod.cache([address]);
    return lockMapMethod.call(address, oathIndex).then(output => {
      const oath = {
        ...output.decoded,
        amount: Number(output.decoded.amount),
        oathIndex
      };
      console.log("connexOathKeeper fetchOathAt", oath);
      return oath;
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

  listen = (eventName, { signer, txid }, filters) => {
    console.log("Created hound for", eventName, txid, filters);
    const smell = this.contractAccount.event(this.abiOf(eventName));
    const filter = smell.filter([...filters]);

    function shouldStop(logs) {
      console.log("Event Logs", eventName, txid, filters, "received", logs);
      if (logs.length) {
        console.log("Event Logs", eventName, txid, filters, "DONE");
        return true;
      }
      return false;
    }

    return { filter, shouldStop };
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
