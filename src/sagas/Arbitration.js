import { put, call, select, takeLatest, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getDrizzleStatus,
  getCurrentContract,
  getDrizzleStoredContracts,
  getJURToken,
  getWallet
} from "./Selectors";
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

// Api layouts
import { Contracts } from "../api";

import ArbitrationJsonInterface from "../build/contracts/Arbitration.json";

import {
  log,
  warn,
  humanToEth,
  ethToHuman,
  ethToStore
} from "../utils/helpers"; // log helper

export function* fetchArbitrations(args) {
  log("fetchArbitrations", "run");
  log("fetchArbitrations - args", args);

  const ArbitrationFactory = "ArbitrationFactory";

  const drizzleStatus = yield select(getDrizzleStatus);
  log("fetchArbitrations - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const {
      contracts,
      web3,
      web3: { utils }
    } = global.drizzle;
    log("fetchArbitrations - contracts", contracts);

    const wallet = yield select(getWallet);

    log(
      "fetchArbitrations - contracts[ArbitrationFactory].methods",
      contracts[ArbitrationFactory].methods
    );

    // Read arbitrations
    log(
      "fetchArbitrations - contracts[ArbitrationFactory].methods['arbirations']",
      contracts[ArbitrationFactory].methods["arbirations"]
    );
    const txArbitrations = yield contracts[ArbitrationFactory].methods[
      "arbirations"
    ].cacheCall(wallet.address);
    log("fetchArbitrations - txArbitrations", txArbitrations);
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

export function* handleNewArbitration(args) {
  log("handleNewArbitration", "run");
  log("handleNewArbitration - args", args);

  const JURToken = "JURToken";
  const ArbitrationFactory = "ArbitrationFactory";
  const method = "createArbitration";

  // destructuring call params
  const { type } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("handleNewArbitration - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const {
      contracts,
      web3,
      web3: { utils }
    } = global.drizzle;
    log("handleNewArbitration - contracts", contracts);

    // cache call on new arbitration request
    if (type === NEW_ARBITRATION) {
      yield put({ type: CONTRACT_SAVING, payload: true });
      yield put({ type: CONTRACT_UPDATING, payload: true });

      const wallet = yield select(getWallet);

      const contractData = yield select(getCurrentContract);
      const [partA, partB] = contractData.counterparties;

      log("handleNewArbitration - contractData", contractData);

      // Setup agreement
      const agreement = {
        kpi: contractData.kpi,
        resolutionProof: contractData.resolutionProof
      };
      const generateHash = "generateHash"; // contract abi method
      const agreementHash = yield contracts[ArbitrationFactory].methods[
        generateHash
      ].cacheCall(JSON.stringify(agreement));

      log("handleNewArbitration - agreementHash", agreementHash);

      const {
        id,
        partAPenaltyFee,
        partBPenaltyFee,
        whoPays,
        value
      } = contractData;
      let fundings = {
        a: Number(
          humanToEth(
            ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee))))
          )
        ),
        b: Number(
          humanToEth(
            ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee))))
          )
        )
      };
      let dispersal = {
        a: Number(
          humanToEth(
            ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee))))
          )
        ),
        b: Number(
          humanToEth(
            ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee))))
          )
        )
      };

      if (whoPays === partA.wallet) {
        fundings.a = Number(
          humanToEth(
            ethToStore(
              ethToHuman(
                Number(humanToEth(partAPenaltyFee)) + Number(humanToEth(value))
              )
            )
          )
        );
        dispersal.b = Number(
          humanToEth(
            ethToStore(
              ethToHuman(
                Number(humanToEth(partBPenaltyFee)) + Number(humanToEth(value))
              )
            )
          )
        );
      } else {
        fundings.b = Number(
          humanToEth(
            ethToStore(
              ethToHuman(
                Number(humanToEth(partBPenaltyFee)) + Number(humanToEth(value))
              )
            )
          )
        );
        dispersal.a = Number(
          humanToEth(
            ethToStore(
              ethToHuman(
                Number(humanToEth(partAPenaltyFee)) + Number(humanToEth(value))
              )
            )
          )
        );
      }

      log("handleNewArbitration - fundings + dispersal", {
        fundings,
        dispersal
      });

      // createArbitration([party1, party2], [0, 150], [50, 100], "Do some work...")
      const contractPayload = [
        [
          utils.toChecksumAddress(partA.wallet),
          utils.toChecksumAddress(partB.wallet)
        ],
        Object.values(fundings),
        Object.values(dispersal),
        agreementHash
      ];

      log("handleNewArbitration - contractPayload", contractPayload);
      log(
        `handleNewArbitration - contracts[ArbitrationFactory].methods[${method}]`,
        contracts[ArbitrationFactory].methods[method]
      );

      const abi = contracts[ArbitrationFactory].abi;

      log("handleNewArbitration - abi", abi);
      log(
        "handleNewArbitration - next method call",
        contracts[ArbitrationFactory].methods[method](...contractPayload)
      );

      let arbitrationAddress = null;

      // // Fetch initial value from chain and return cache key for reactive updates.
      const tx = yield contracts[ArbitrationFactory].methods[method](
        ...contractPayload
      )
        .send({ from: wallet.address })
        .then(result => {
          log("handleNewArbitration - arbitration tx result", result);

          const {
            _arbitration
          } = result.events.ArbitrationCreated.returnValues; // get arbitration address
          log("handleNewArbitration - arbitration address", _arbitration);

          arbitrationAddress = _arbitration;
        })
        .catch(error => {
          log("handleNewArbitration - arbitration tx error", error);
        });

      log("handleNewArbitration - arbitration tx", tx);
      log("handleNewArbitration - arbitration address", arbitrationAddress);

      if (arbitrationAddress) {
        yield chainGetContract({ address: arbitrationAddress });

        // sign
        const signed = yield contracts[arbitrationAddress].methods[
          "sign"
        ].cacheSend({ from: wallet.address });
        log("handleNewArbitration - arbitration signed?", signed);

        // Update contract address
        let toUpdate = new FormData();
        // toUpdate.append('_method', 'PUT');
        toUpdate.append("address", arbitrationAddress);
        try {
          let response = yield call(Contracts.update, toUpdate, id);
          log("handleNewArbitration - contract address updated", response);

          // Status update
          toUpdate = new FormData();
          toUpdate.append("code", 1);
          try {
            response = yield call(Contracts.statusChange, toUpdate, id);
            log("handleNewArbitration - contract status updated", response);
            const {
              statusId,
              statusLabel,
              statusUpdatedAt
            } = response.data.data;
            yield put({
              type: SET_CONTRACT_STATUS,
              statusId,
              statusLabel,
              statusUpdatedAt,
              id
            });
            yield put({ type: FETCH_CONTRACTS });

            // const { history } = action;
            // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
          } catch (error) {
            yield put({ type: API_CATCH, error });
          }

          // const { history } = action;
          // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
        } catch (error) {
          yield put({ type: API_CATCH, error });
        }

        yield put({ type: CHAIN_GET_CONTRACT, address: arbitrationAddress });

        // Read arbitrations
        log(
          "handleNewArbitration - contracts[ArbitrationFactory].methods['arbirations']",
          contracts[ArbitrationFactory].methods["arbirations"]
        );
        const txArbitrations = yield contracts[ArbitrationFactory].methods[
          "arbirations"
        ].cacheCall(wallet.address);
        log("handleNewArbitration - txArbitrations", txArbitrations);
      }

      yield put({ type: CONTRACT_SAVING, payload: false });
      yield put({ type: CONTRACT_UPDATING, payload: false });
    }

    // // when contract var is available
    // if (type === GOT_CONTRACT_VAR) {
    //   // destructuring call params
    //   const { name, variable, value, argsHash } = args;
    //   if (name === contract && variable === method) {
    //     // only if

    //     yield put({ type: SET_BALANCE, amount: value, argsHash });
    //   }
    // }
  }
}

export function* handleEvents(args) {
  log("handleEvents", "run");
  log("handleEvents - args", args);

  // destructuring call params
  const { type } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("handleEvents - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const {
      contracts,
      web3,
      web3: { utils }
    } = global.drizzle;
    log("handleEvents - contracts", contracts);

    // get event data
    if (type === EVENT_FIRED) {
      const { event } = args;

      log("handleEvents - event", event);
    }
  }
}

function* handleContractInitialized(args) {
  yield log("handleContractInitialized - run", args);
  const { name } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("chainGetContract - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`handleContractInitialized - contracts`, contracts);

    const wallet = yield select(getWallet);

    if (name !== "JURToken" && name !== "ArbitrationFactory") {
      const checks = {
        state: [],
        funding: [wallet.address],
        dispersal: [wallet.address],
        parties: [wallet.address],
        hasAgreed: [wallet.address],
        hasSigned: [wallet.address],
        hasFundedAmendment: [wallet.address],
        amendmentProposed: []
      };

      let idx = 1;

      for (const [fn, args] of Object.entries(checks)) {
        const res = contracts[name].methods[fn].cacheCall(...args);
        log(
          `handleContractInitialized - check ${idx}. - contracts[${name}] ${fn}`,
          res
        );

        idx++;
      }

      // const agree = contracts[name].methods["agree"].cacheSend();
      // log(`handleContractInitialized - agree`, agree);
    }
  }
}

export function* handleAcceptArbitrationAmendment(args) {
  log("handleAcceptArbitrationAmendment - run", args);
  const { id, address } = args;

  // Status update
  let toUpdate = new FormData();
  toUpdate.append("code", 29); // closed friendly resolution

  try {
    const response = yield call(Contracts.statusChange, toUpdate, id);
    log("handleAcceptArbitrationAmendment - contract status updated", response);
    const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
      statusLabel,
      statusUpdatedAt,
      id
    });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export function* handleAcceptArbitration(args) {
  log("handleAcceptArbitration - run", args);
  const { id, address, value } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("handleAcceptArbitration - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`handleAcceptArbitration - current contract`, contracts[address]);
    log(`handleAcceptArbitration - JURToken contract`, contracts["JURToken"]);

    const wallet = yield select(getWallet);

    const drizzleContracts = yield select(getDrizzleStoredContracts);
    log(
      `handleAcceptArbitration - current drizzle contract`,
      drizzleContracts[address]
    );

    const hasAgreed = Object.values(drizzleContracts[address].hasAgreed).pop();

    log(`handleAcceptArbitration - current user has agreed?`, hasAgreed);

    // approve
    try {
      const funding = Object.values(drizzleContracts[address].funding).pop();
      log("handleAcceptArbitration - arbitration funding", funding.value);
      log(
        "handleAcceptArbitration - arbitration funding parsedInt",
        parseInt(funding.value)
      );
      log(
        "handleAcceptArbitration - arbitration funding converted",
        Number(humanToEth(ethToStore(ethToHuman(Number(funding.value)))))
      );
      log("handleAcceptArbitration - arbitration value", humanToEth(value));

      // sign
      const sign = contracts[address].methods["sign"].cacheSend({
        from: wallet.address
      });
      log("handleAcceptArbitration - arbitration signed?", sign);

      const approve = contracts["JURToken"].methods["approve"];
      const approved = yield call(
        approve.cacheSend,
        address,
        funding.value || humanToEth(value)
      );

      log("handleAcceptArbitration - approved?", approved);

      // Status update
      let toUpdate = new FormData();
      toUpdate.append("code", 2);

      try {
        const response = yield call(Contracts.statusChange, toUpdate, id);
        log("handleAcceptArbitration - contract status updated", response);
        const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
        yield put({
          type: SET_CONTRACT_STATUS,
          statusId,
          statusLabel,
          statusUpdatedAt,
          id
        });
        yield put({ type: FETCH_CONTRACTS });

        // const { history } = action;
        // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
      } catch (error) {
        yield put({ type: API_CATCH, error });
      }
    } catch (error) {
      log("handleAcceptArbitration - error", error);
    }
  }
}

export function* handleRejectArbitration(args) {
  log("handleRejectArbitration - run", args);
  const { id, address } = args;

  const drizzleStatus = yield select(getDrizzleStatus);
  log("handleRejectArbitration - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`handleRejectArbitration - current contract`, contracts[address]);
    log(`handleRejectArbitration - JURToken contract`, contracts["JURToken"]);

    const wallet = yield select(getWallet);

    const drizzleContracts = yield select(getDrizzleStoredContracts);
    log(
      `handleRejectArbitration - current drizzle contract`,
      drizzleContracts[address]
    );

    const hasSigned = Object.values(drizzleContracts[address].hasSigned).pop();

    // log(`handleRejectArbitration - current user has agreed?`, hasSigned);

    // contracts["JURToken"].methods["approve"].cacheSend();

    if (hasSigned.value) {
      yield contracts[address].methods["unsign"].cacheSend({
        from: wallet.address
      }); // chain rejection
    }

    // contracts[address].methods["isParty"].cacheCall(wallet.address); // address

    // } else {
    //   contracts["JURToken"].approve();
    //   contracts[address].methods["sign"]
    //     .cacheSend() // chain rejection

    // }

    // Status update
    let toUpdate = new FormData();
    toUpdate.append("code", -1);

    try {
      const response = yield call(Contracts.statusChange, toUpdate, id);
      log("handleRejectArbitration - contract status updated", response);
      const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
      yield put({
        type: SET_CONTRACT_STATUS,
        statusId,
        statusLabel,
        statusUpdatedAt,
        id
      });
      yield put({ type: FETCH_CONTRACTS });

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
    }
  }
}

export function* handleSuccessArbitration(args) {
  log("handleSuccessArbitration - run", args);
  const { id } = args;

  // Status update
  let toUpdate = new FormData();
  toUpdate.append("code", 9);

  try {
    const response = yield call(Contracts.statusChange, toUpdate, id);
    log("handleSuccessArbitration - contract status updated", response);
    const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
    yield put({
      type: SET_CONTRACT_STATUS,
      statusId,
      statusLabel,
      statusUpdatedAt,
      id
    });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export function* pay(address, amount) {

  const drizzleStatus = yield select(getDrizzleStatus);
  log("pay - drizzleStatus", drizzleStatus);
  if (drizzleStatus.initialized && global.drizzle) {
    const { contracts } = global.drizzle;
    log(`pay - current contract`, contracts[address]);
    log(`pay - global.drizzle`, global.drizzle);
    log(`pay - global.web3`, global.web3);
    // log(`pay - JURToken contract`, contracts["JURToken"]);

    const { web3 } = global.drizzle;

    const wallet = yield select(getWallet);

    const drizzleContracts = yield select(getDrizzleStoredContracts);
    log(
      `pay - current drizzle contract`,
      drizzleContracts[address]
    );

    // const payStatus = yield contracts[address].methods["pay"].cacheSend();
    // log(
    //   `pay - payment status`,
    //   payStatus
    // );
    log(`pay - address isAddress?`, web3.utils.isAddress(address));
    log(`pay - wallet.address isAddress?`, web3.utils.isAddress(wallet.address));
    log(`pay - amount`, amount);
    log(
      `pay - payload`,
      {
        from: wallet.address,
        to: address,
        value: web3.utils.toWei(amount.toString(), "ether")
    }
    );

    yield web3.eth.sendSignedTransaction({
      from: wallet,
      to: address,
      value: web3.utils.toWei(amount.toString(), "ether")
  }, function (error, result) {
      if (error) {
        log("pay - error", error);
        return false;
      } else {
        log("pay - result", result);
        return true;
      }
  });

    return false;
  }

  return false;
}

export function* handlePayArbitration(args) {
  log("handlePayArbitration - run", args);
  const { id, address, amount, onFail } = args;

  const paymentEsit = yield pay(address, amount);

  if (address && paymentEsit) {
    log("handlePayArbitration - contract paymentEsit", paymentEsit);

    // Status update
    let toUpdate = new FormData();
    toUpdate.append("code", 5); // ongoing

    try {
      const response = yield call(Contracts.statusChange, toUpdate, id);
      log("handlePayArbitration - contract status updated", response);
      const { statusId, statusLabel, statusUpdatedAt } = response.data.data;
      yield put({
        type: SET_CONTRACT_STATUS,
        statusId,
        statusLabel,
        statusUpdatedAt,
        id
      });
      yield put({ type: FETCH_CONTRACTS });

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
    }
  } else {
    if (typeof onFail === "function") onFail();
  }
}

// spawn tasks base certain actions
export default function* arbitrationSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(NEW_ARBITRATION, handleNewArbitration);
  yield takeEvery(
    ACCEPT_ARBITRATION_AMENDMENT,
    handleAcceptArbitrationAmendment
  );
  yield takeEvery(ACCEPT_ARBITRATION, handleAcceptArbitration);
  yield takeEvery(REJECT_ARBITRATION, handleRejectArbitration);
  yield takeEvery(SUCCESS_ARBITRATION, handleSuccessArbitration);
  yield takeEvery(PAY_ARBITRATION, handlePayArbitration);
  yield takeEvery(SEND_TO_COUNTERPARTY, handleNewArbitration);
  yield takeEvery(EVENT_FIRED, handleEvents);
  yield takeEvery(SET_BALANCE, fetchArbitrations);
  yield takeEvery(CHAIN_GET_CONTRACT, chainGetContract);
  yield takeEvery(CONTRACT_INITIALIZED, handleContractInitialized);
}
