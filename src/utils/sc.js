import { put, call, select, takeLatest, takeEvery } from "redux-saga/effects";

import {
  getAccounts,
  getDrizzleStatus,
  getCurrentContract,
  getDrizzleStoredContracts,
  getJURToken,
  getWallet
} from "../sagas/Selectors";

import {
  DRIZZLE_INITIALIZED,
  GOT_CONTRACT_VAR,
  SET_CONTRACT,
  SET_CONTRACT_STATUS,
  FETCH_CONTRACTS,
  API_CATCH,
  NEW_ARBITRATION,
  PAY_ARBITRATION,
  SUCCESS_ARBITRATION,
  ACCEPT_ARBITRATION,
  REJECT_ARBITRATION,
  SEND_TO_COUNTERPARTY,
  EVENT_FIRED,
  SET_BALANCE,
  CONTRACT_INITIALIZED,
  CONTRACT_SAVING,
  CONTRACT_UPDATING,
  CHAIN_GET_CONTRACT,
  ACCEPT_ARBITRATION_AMENDMENT
} from "../reducers/types";

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

  const drizzleStatus = yield select(getDrizzleStatus);
  log("callToContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;

    yield put({ type: CONTRACT_SAVING, payload: true });
    yield put({ type: CONTRACT_UPDATING, payload: true });

    log("callToContract - payload", payload);

    try {
      let tx;
      const abi = contracts[contract].methods[method];
      if (cache) {
        try {
          tx = yield abi.cacheCall(payload);

          // TODO: handle with actions
          if (typeof success === "function") {
            success(tx);
          } // handle success if present
          return tx;
        } catch (e) {
          // TODO: handle with actions
          if (typeof fail === "function") {
            fail(e);
          } // handle success if present
          return false;
        }
      } else {
        tx = yield abi(...payload)
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
      }

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

    yield put({ type: CONTRACT_SAVING, payload: false });
    yield put({ type: CONTRACT_UPDATING, payload: false });
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

    yield put({ type: CONTRACT_SAVING, payload: true });
    yield put({ type: CONTRACT_UPDATING, payload: true });

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
      if (cache) {
        yield (tx = abi.cacheSend(...payload));

        log(`sendToContract – ${contract}[${method}] - tx`, tx);

        // TODO: handle with actions
        if (typeof success === "function") {
          success(tx);
        } // handle success if present
      } else {
        yield (tx = abi(...payload).send({ from: wallet.address }));

        log(`sendToContract – ${contract}[${method}].send() - then result`, tx);

        // TODO: handle with actions
        if (typeof success === "function") {
          success(tx);
        } // handle success if present
      }
    } catch (e) {
      log(`sendToContract – ${contract}[${method}] - error`, e);

      // TODO: handle with actions
      if (typeof fail === "function") {
        fail(e);
      } // handle fail if present
    }

    yield put({ type: CONTRACT_SAVING, payload: false });
    yield put({ type: CONTRACT_UPDATING, payload: false });
  }
}

export function* chainGetContract(args) {
  log("chainGetContract - args", args);

  const { address } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("chainGetContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts, web3 } = global.drizzle;

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
