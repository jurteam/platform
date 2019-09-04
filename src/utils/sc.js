import {
  // put,
  // call,
  // takeLatest,
  // takeEvery,
  select
} from "redux-saga/effects";

import {
  // getAccounts,
  getDrizzleStatus,
  // getCurrentContract,
  // getDrizzleStoredContracts,
  // getJURToken,
  getWallet
} from "../sagas/Selectors";

import ArbitrationJsonInterface from "../build/contracts/Arbitration.json";

import { log } from "../utils/helpers"; // log helper

export function* callToContract(
  contract,
  method,
  payload,
  success,
  fail,
  cache
) {
  if (typeof cache === "undefined") {
    cache = true;
  } // handle empty value

  cache = false;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("callToContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;

    log("contracts", contracts);
    log("callToContract - payload", payload);

    const wallet = yield select(getWallet);

    try {
      let tx;
      const abi = contracts[contract].methods[method];
      if (payload !== null) {
        tx = yield abi(...payload).call({ from: wallet.address });
      } else {
        tx = yield abi().call({ from: wallet.address });
      }

      log(`callToContract – ${contract}[${method}].call() - then result`, tx);

      // TODO: handle with actions
      if (typeof success === "function") {
        return success(tx);
      } // handle success if present

      return tx
    } catch (e) {
      log(`callToContract – ${contract}[${method}] - error`, e);

      // TODO: handle with actions
      if (typeof fail === "function") {
        return fail(e);
      } // handle fail if present

      return e;
    }

    /*
    try {
      let tx;
      const abi = contracts[contract].methods[method];
      tx = yield abi()
        .call()
        .then(result => {
          log(
            `callToContract – ${contract}[${method}].call() - then result`,
            result
          );

          // TODO: handle with actions
          if (typeof success === "function") {
            success(result);
          } // handle success if present
        })
        .catch(error => {
          log(
            `callToContract – ${contract}[${method}].call() - catch error`,
            error
          );

          // TODO: handle with actions
          if (typeof fail === "function") {
            fail(error);
          } // handle fail if present
        });

      log(`callToContract – ${contract}[${method}] - tx`, tx);

      // TODO: handle with actions
      if (typeof success === "function") {
        success(tx);
      } // handle success if present
    } catch (e) {
      log(`callToContract – ${contract}[${method}] - error`, e);

      // TODO: handle with actions
      if (typeof fail === "function") {
        fail(e);
      } // handle fail if present
    }
    */
  }
}

export function* sendToContract(
  contract,
  method,
  payload,
  success,
  fail,
  cache
) {
  if (typeof cache === "undefined") {
    cache = true;
  } // handle empty value

  const drizzleStatus = yield select(getDrizzleStatus);
  log("sendToContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;

    log("sendToContract - contracts", contracts);
    log("sendToContract - contracts[contract]", contracts[contract]);
    log(
      "sendToContract - contracts[contract].methods",
      contracts[contract].methods
    );
    log(
      "sendToContract - contracts[contract].methods[method]",
      contracts[contract].methods[method]
    );
    log("sendToContract - payload", payload);

    const wallet = yield select(getWallet);

    try {
      let tx;
      const abi = contracts[contract].methods[method];

      if (payload !== null) {
          tx = yield abi(...payload).send({ from: wallet.address });
      } else {
          tx = yield abi().send({ from: wallet.address });
      }

      log(`sendToContract – ${contract}[${method}].send() - then result`, tx);

      // TODO: handle with actions
      if (typeof success === "function") {
        return success(tx);
      } // handle success if present

      return tx
    } catch (e) {
      log(`sendToContract – ${contract}[${method}] - error`, e);

      // TODO: handle with actions
      if (typeof fail === "function") {
        return fail(e);
      } // handle fail if present

      return e;
    }
  }
}

export function* chainGetContract(args) {
  log("chainGetContract - args", args);

  const { address } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("chainGetContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { web3 } = global.drizzle;

    const wallet = yield select(getWallet);

    // add new arbitration to drizzle
    const contractConfig = {
      contractName: address,
      web3Contract: new web3.eth.Contract(
        ArbitrationJsonInterface.abi,
        address,
        { from: wallet.address }
      )
    };
    const contractEvents = [
      "StateChange",
      "ContractCreated",
      "ContractSigned",
      "ContractUnsigned",
      "ContractAgreed",
      "ContractUnagreed",
      "ContractAmendmentProposed",
      "ContractAmendmentAgreed",
      "ContractAmendmentUnagreed",
      "ContractWithdrawn",
      "ContractDisputed",
      "ContractDisputeDispersalAmended",
      "DisputeEndsAdjusted",
      "VoteCast",
      "VoterPayout",
      "PartyPayout"
    ];

    log("chainGetContract - contractConfig", contractConfig);
    log("chainGetContract - contractEvents", contractEvents);

    // Or using the Drizzle context object
    const newContractAdded = yield global.drizzle.addContract(
      contractConfig,
      contractEvents
    );

    log("chainGetContract - newContractAdded", newContractAdded);

    // const txApprove = yield contracts[JURToken].methods["approve"].cacheSend(_arbitration, 50000000000000000000); // 50 JUR
    // log("chainGetContract - txApprove", txApprove);
  }
}

export function* checkDrizzleInit() {
  const drizzleStatus = yield select(getDrizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    log("checkDrizzleInit", global.drizzle);
    return global.drizzle;
  }
  return false;
}
