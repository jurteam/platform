import OathKeeperContract from "../../build/contracts/OathKeeper.json";
import connexJURToken from "./JURToken";
import { toBigFixed } from "../../utils/helpers";

export const MIN_TOKEN_AMOUNT = 0.01;
export const MIN_LOCK_IN_PERIOD = 1;

export default class connexOathKeeper {
  constructor() {
    this.contractAddress =
      OathKeeperContract.networks[this.currentNetworkId()].address;
    this.contractAccount = global.connex.thor.account(this.contractAddress);
  }

  takeAnOath = (address, amount, lockInPeriod, { balance }) => {
    if (!isOathable(amount, lockInPeriod, balance))
      return Promise.reject("Invalid parameters! Can't take oath");

    const blockchainAmount = toBigFixed(amount).replace(".", "");
    const approveClause = new connexJURToken().approveClause(
      this.contractAddress,
      blockchainAmount
    );

    return this.lockIn(
      address,
      blockchainAmount,
      lockInPeriod,
      approveClause
    ).then(signedResponse => {
      const filters = [
        {
          _beneficiary: address,
          _amount: blockchainAmount,
          _lockInPeriod: lockInPeriod
        }
      ];
      return this.listen("OathTaken", signedResponse, filters);
    });
  };

  lockIn = (address, amount, lockInPeriod, approveClause) => {
    const takeAnOathMethod = this.contractAccount.method(
      this.abiOf("takeAnOath")
    );

    const takeAnOathClause = takeAnOathMethod.asClause(lockInPeriod);

    const signingService = global.connex.vendor.sign("tx");
    signingService
      .signer(address)
      // .gas(global.connex.thor.genesis.gasLimit)
      .link("https://connex.vecha.in/{txid}")
      .comment(`Take an oath of ${amount} JUR for ${lockInPeriod} months`);

    return signingService.request([
      {
        comment: `approve ${amount} JUR`,
        ...approveClause
      },
      {
        comment: `lock up for ${lockInPeriod} months`,
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
      // .gas(global.connex.thor.genesis.gasLimit)
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
      return {
        ...output.decoded,
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

  listen = (eventName, { signer, txid }, filters) => {
    const smell = this.contractAccount.event(this.abiOf(eventName));
    const filter = smell.filter([...filters]);

    function shouldStop(logs) {
      if (logs.length) {
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

export const isOathable = (amount, lockInPeriod, balance) => {
  const numericAmount = Number(amount);

  return (
    numericAmount >= MIN_TOKEN_AMOUNT &&
    numericAmount <= balance &&
    Number(lockInPeriod) >= MIN_LOCK_IN_PERIOD
  );
};
