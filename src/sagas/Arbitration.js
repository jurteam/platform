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
  ACCEPT_ARBITRATION_AMENDMENT,
  CHAIN_CREATE_ARBITRATION,
  CHAIN_APPROVE_JURTOKEN,
  CHAIN_SIGN_ARBITRATION,
  CHAIN_AGREE_ARBITRATION,
  CHAIN_WITHDRAW_DISPERSAL_ARBITRATION
} from "../reducers/types";

// Api layouts
import { Contracts } from "../api";

import {
  chainGetContract,
  callToContract,
  sendToContract,
  checkDrizzleInit
} from "../utils/sc";

import {
  log,
  warn,
  humanToEth,
  ethToHuman,
  ethToStore,
  calculateFundingAndDispersal
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

export function* handleCreateArbitration(args) {
  log("handleCreateArbitration", "run");
  log("handleCreateArbitration - args", args);

  // Check if Drizzle is initialized
  const check = checkDrizzleInit();
  if (!check) { return false; }

  const {
    web3: { utils }
  } = global.drizzle;

  yield put({ type: CONTRACT_SAVING, payload: true });
  yield put({ type: CONTRACT_UPDATING, payload: true });

  const wallet = yield select(getWallet);

  const contractData = yield select(getCurrentContract);
  const [partA, partB] = contractData.counterparties;

  log("handleCreateArbitration - contractData", contractData);

  // Setup agreement
  const agreement = {
    kpi: contractData.kpi,
    resolutionProof: contractData.resolutionProof
  };
  const agreementHash = yield callToContract("ArbitrationFactory", "generateHash", JSON.stringify(agreement))

  log("handleCreateArbitration - agreementHash", agreementHash);

  // TODO: move elsewhere
  // --
  /*
  const { id, partAPenaltyFee, partBPenaltyFee, whoPays, value } = contractData;
  let fundings = {
    a: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee)))))
    ),
    b: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee)))))
    )
  };
  let dispersal = {
    a: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partAPenaltyFee)))))
    ),
    b: Number(
      humanToEth(ethToStore(ethToHuman(Number(humanToEth(partBPenaltyFee)))))
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
  */
  const { id, partAPenaltyFee, partBPenaltyFee, whoPays, value } = contractData;
  const { fundings, dispersal} = calculateFundingAndDispersal(contractData);

  log("handleCreateArbitration - fundings + dispersal", {
    fundings,
    dispersal
  });
  // --

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

  let arbitrationAddress = null;

  // Fetch initial value from chain and return cache key for reactive updates.
  const tx = yield sendToContract(
    "ArbitrationFactory",
    "createArbitration",
    contractPayload,
    result => {
      log("[promise] handleCreateArbitration - arbitration tx result", result);

      const { _arbitration } = result.events.ArbitrationCreated.returnValues; // get arbitration address
      log("handleCreateArbitration - arbitration address", _arbitration);

      arbitrationAddress = _arbitration;
    },
    error => {
      log("handleCreateArbitration - arbitration tx error", error);
    },
    false
  );

  log("handleCreateArbitration - arbitration tx", tx);
  log("handleCreateArbitration - arbitration address", arbitrationAddress);

  if (arbitrationAddress) {

    // Step .2 - JURToken

    // approve
    /*
    let approveFundings =
      partA.wallet === wallet.address ? fundings.a : fundings.b;
    const approved = yield sendToContract("JURToken", "approve", [
      wallet.address,
      approveFundings
    ]);
    log("handleCreateArbitration - jur Token approved?", approved);
    */

    // Update contract address
    let toUpdate = new FormData();
    // toUpdate.append('_method', 'PUT');
    toUpdate.append("address", arbitrationAddress);
    try {
      let response = yield call(Contracts.update, toUpdate, id);
      log("handleCreateArbitration - contract address updated", response);

      // Status update
      toUpdate = new FormData();
      toUpdate.append("code", 1);
      try {
        response = yield call(Contracts.statusChange, toUpdate, id);
        log("handleCreateArbitration - contract status updated", response);
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

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
    }

    yield put({ type: CHAIN_GET_CONTRACT, address: arbitrationAddress });

    // Read arbitrations
    const txArbitrations = yield sendToContract("ArbitrationFactory", "arbirations", wallet.address);
    log("handleCreateArbitration - txArbitrations", txArbitrations);
  }

  yield put({ type: CONTRACT_SAVING, payload: false });
  yield put({ type: CONTRACT_UPDATING, payload: false });
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

  // Check if Drizzle is initialized
  const check = checkDrizzleInit();
  if (!check) { return false; }

  const { id, address } = args;
  if (!address) { return false; } // proceed only if exist an arbitration on chain

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

  // chain rejection
  if (hasSigned.value) {

    // Unsign
    yield sendToContract(address, "unsign", { from: wallet.address })
    // yield contracts[address].methods["unsign"].cacheSend();
  }

  // contracts[address].methods["isParty"].cacheCall(wallet.address); // address

  // } else {
  //   contracts["JURToken"].approve();
  //   contracts[address].methods["sign"]
  //     .cacheSend() // chain rejection

  // }

  // Prevent future token sign
  yield put({ type: CHAIN_APPROVE_JURTOKEN, amount: 0 }); // ???

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
    log(`pay - current drizzle contract`, drizzleContracts[address]);

    // const payStatus = yield contracts[address].methods["pay"].cacheSend();
    // log(
    //   `pay - payment status`,
    //   payStatus
    // );
    log(`pay - address isAddress?`, web3.utils.isAddress(address));
    log(
      `pay - wallet.address isAddress?`,
      web3.utils.isAddress(wallet.address)
    );
    log(`pay - amount`, amount);
    log(`pay - payload`, {
      from: wallet.address,
      to: address,
      value: web3.utils.toWei(amount.toString(), "ether")
    });

    yield sendToContract();

    // yield web3.eth.sendSignedTransaction(
    //   {
    //     from: wallet,
    //     to: address,
    //     value: web3.utils.toWei(amount.toString(), "ether")
    //   },
    //   function(error, result) {
    //     if (error) {
    //       log("pay - error", error);
    //       return false;
    //     } else {
    //       log("pay - result", result);
    //       return true;
    //     }
    //   }
    // );

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

export function* handleSignArbitration({contractAddress}) {
  log('handleSignArbitration');

  const success = () => {
    log('handleSignArbitration – success');
  }

  const fail = () => {
    log('handleSignArbitration – fail');
  }

  yield sendToContract(contractAddress, "sign", null, success, fail)
}

export function* handleWithdrawDispersal({contractAddress}) {
  log('handleWithdrawDispersal');

  const success = () => {
    log('handleWithdrawDispersal – success');
  }

  const fail = () => {
    log('handleWithdrawDispersal – fail');
  }

  yield sendToContract(contractAddress, "withdrawDispersal", null, success, fail)
}

export function* handleAgreeArbitration({contractAddress}) {
  log('handleAgreeArbitration');
  const wallet = yield select(getWallet);

  const hasAgreed = yield callToContract(contractAddress, "hasAgreed", wallet.address)
  log('handleAgreeArbitration – hasAgreed', hasAgreed);

  if (hasAgreed === true) {
    const success = () => {
      log('handleAgreeArbitration – success');
    }

    const fail = () => {
      log('handleAgreeArbitration – fail');
    }

    yield sendToContract(contractAddress, "agree", null, success, fail)
  }
}

export function* handleWithdrawDispersalArbitration({contractAddress}) {
  log('handleWithdrawDispersalArbitration');
  const wallet = yield select(getWallet);

  const hasWithdrawn = yield callToContract(contractAddress, "hasWithdrawn", wallet.address)
  log('handleWithdrawDispersalArbitration – hasWithdrawn', hasWithdrawn);

  if (hasWithdrawn === true) {
    const success = () => {
      log('handleWithdrawDispersalArbitration – success');
    }

    const fail = () => {
      log('handleWithdrawDispersalArbitration – fail');
    }

    yield sendToContract(contractAddress, "agree", null, success, fail)
  }
}

export function* handleApproveJurToken({amount}) {
  log('handleApproveJurToken');
  const wallet = yield select(getWallet);
  // TODO: convert amount with 18 decimals

  const success = () => {
    log('handleApproveJurToken – success');
  }

  const fail = () => {
    log('handleApproveJurToken – fail');
  }

  yield sendToContract("JURToken", "approve", [wallet.address, amount], success, fail)
}

export function* handleSendToCounterparty() {
  yield put({ type: CHAIN_CREATE_ARBITRATION });
  // const wallet = yield select(getWallet);
  // const contractData = yield select(getCurrentContract);
  // const [partA, partB] = contractData.counterparties;
  // const fd = calculateFundingAndDispersal(contractData);
  // let amount = 0;
  // if (wallet.address === partA.address)
  //   amount = fd.fundings.a;
  // else
  //   amount = fd.fundings.b;
  // yield put({ type: CHAIN_APPROVE_JURTOKEN, amount});
}

// spawn tasks base certain actions
export default function* arbitrationSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(SEND_TO_COUNTERPARTY, handleSendToCounterparty);
  yield takeEvery(CHAIN_CREATE_ARBITRATION, handleCreateArbitration);
  yield takeEvery(CHAIN_APPROVE_JURTOKEN, handleApproveJurToken);
  yield takeEvery(CHAIN_SIGN_ARBITRATION, handleSignArbitration);
  yield takeEvery(CHAIN_AGREE_ARBITRATION, handleAgreeArbitration);
  yield takeEvery(CHAIN_WITHDRAW_DISPERSAL_ARBITRATION, handleWithdrawDispersalArbitration);
  yield takeEvery(
    ACCEPT_ARBITRATION_AMENDMENT,
    handleAcceptArbitrationAmendment
  );
  yield takeEvery(ACCEPT_ARBITRATION, handleAcceptArbitration);
  yield takeEvery(REJECT_ARBITRATION, handleRejectArbitration);
  yield takeEvery(SUCCESS_ARBITRATION, handleSuccessArbitration);
  yield takeEvery(PAY_ARBITRATION, handlePayArbitration);
  yield takeEvery(EVENT_FIRED, handleEvents);
  yield takeEvery(SET_BALANCE, fetchArbitrations);
  yield takeEvery(CHAIN_GET_CONTRACT, chainGetContract);
  yield takeEvery(CONTRACT_INITIALIZED, handleContractInitialized);
}
