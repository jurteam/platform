import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { getCurrentDispute } from "./Selectors";
import {
  FETCH_ORACLES,
  FETCH_CURRENT_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED,
  API_CATCH,
  API_GET_DISPUTE,
  ORACLE_PAGE_CHANGE,
  ORACLE_ORDER_CHANGE,
  SET_ORACLE_CURRENT_PAGE,
  SET_ORACLE_CURRENT_ORDER,
  DISPUTE_UPDATING,
  RESET_VOTE,
  PUT_VOTE,
  LOOKUP_WALLET_BALANCE,
  // SET_CONTRACT_STATUS
  FETCH_CONTRACTS
} from "../reducers/types";

import { log, chainErrorHandler } from "../utils/helpers"; // log helper

// import contractStatuses from "../assets/i18n/en/status.json";

// Api layouts
import { Oracles, Disputes, JURToken /*, Arbitration, Contracts*/ } from "../api";

import { getOracleOrder, getOracleListPage, getOracleListOrder } from "./Selectors"; // selector

// Get
export function* fetchOracles(action) {
  const { id } = action;

  const { wallet_part } = yield select(getOracleOrder);
  const page = yield select(getOracleListPage);


  const order = yield select(getOracleListOrder);

  let orderby = {};
  order.forEach((ord) => {
    let fieldname = `orderBy[${ord.field}]`
    orderby[fieldname] = ord.type
  });
  



  try {
    const response = yield call(Oracles.list, {
      id,
      include: "attachments",
      // "order[wallet_part]": wallet_part,
      page,
      ...orderby
    });
    log("oracles - fetch", response);
    yield put({ type: ORACLES_FETCHED, payload: response.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchCurrentOracles(action) {
  const { id } = action;
  try {
    const response = yield call(Oracles.get, {
      id
    });
    log("oracles - fetch", response);
    yield put({ type: CURRENT_ORACLES_FETCHED, payload: response.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

export function* onOraclePageChange(action) {
  yield put({ type: SET_ORACLE_CURRENT_PAGE, payload: action.payload });
  yield put({ type: FETCH_ORACLES });
  // TODO: maybe must be fixed with id with the following line 
  // yield put({ type: FETCH_ORACLES, id: action.id });
}

export function* onOracleOrderChange(action) {
  yield put({ type: SET_ORACLE_CURRENT_ORDER, payload: action.payload });
  yield put({ type: FETCH_ORACLES, id: action.id });
}

export function* onVote(action) {
  log("onVote - run");
  yield put({ type: DISPUTE_UPDATING, payload: true });
  let {
    vote: { wallet_part }
  } = action;
  const {
    vote: { contract_id, message, hash, oracle_wallet, reject },
    attachments,
    callback
  } = action;
  let {
    vote: { amount }
  } = action;

  // const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const voteData = new FormData();
  // voteData.append('_method', 'PUT');
  if (contract_id) voteData.append("contract_id", contract_id);
  voteData.append("hash", hash || "0x0");
  if (wallet_part) {
    voteData.append("wallet_part", wallet_part);
    if (reject) wallet_part = "0x0000000000000000000000000000000000000000"; // set wallet_part properly for chain action
  }
  if (oracle_wallet) voteData.append("oracle_wallet", oracle_wallet);
  voteData.append("message", message ? message : ''); // empty string
  voteData.append(
    "amount",
    Number(amount).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
  ); // always

  for (let i = 0; i < attachments.length; i++) {
    // iteate over any file sent over appending the files to the form data.
    let file = attachments[i];

    voteData.append("attachments[" + i + "]", file);
  }
  // voteData.append("attachments[]", attachments);

  log("onVote - action", action);
  log("onVote - voteData", voteData);

  // single step with approve and call
  const currentContract = yield select(getCurrentDispute);
  log("onVote - currentContract", currentContract);
  const { address: contractAddress } = currentContract;

  const token = new JURToken();
  // const arbitration = new Arbitration(contractAddress);

  // fix amount decimals
  amount = amount * 10**18;

  // fix strings
  amount = amount.toString();

  const voteTx = yield token
    .approveAndCall(contractAddress, amount, 'vote', [oracle_wallet, wallet_part, amount])
    .catch(chainErrorHandler);

  log("onVote – voteTx", voteTx);

  if (voteTx) { // only if there is a valid sign tx

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    voteData.append("hash", voteTx.tx); // chain transaction

    try {
      const response = yield call(Disputes.vote, voteData);
      log("onVote - vote created", response);

      yield put({ type: DISPUTE_UPDATING, payload: false });
      yield put({ type: RESET_VOTE });
      // TODO: fetch new votes

      yield put({ type: FETCH_CONTRACTS });

      if (typeof callback === "function") callback();

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
      yield put({ type: DISPUTE_UPDATING, payload: false });
    }
  } else {
    if (typeof callback === "function") callback();
    yield put({ type: DISPUTE_UPDATING, payload: false });
  }

  // try {
  //   const response = yield call(Disputes.vote, voteData);
  //   log("onVote - vote created", response);

  //   yield put({ type: DISPUTE_UPDATING, payload: false });
  //   yield put({ type: RESET_VOTE });
  //   // TODO: fetch new votes

  //   if (typeof action.callback === "function") {
  //     action.callback();
  //   } // invoke callback if needed
  // } catch (error) {
  //   yield put({ type: DISPUTE_UPDATING, payload: false });

  //   yield put({ type: API_CATCH, error });
  //   if (typeof action.callback === "function") {
  //     action.callback();
  //   } // invoke callback if needed
  // }
}

// spawn tasks base certain actions
export default function* oracleSagas() {
  log("run", "oracleSagas");
  yield takeEvery(PUT_VOTE, onVote);
  yield takeEvery(FETCH_ORACLES, fetchOracles);
  yield takeEvery(FETCH_CURRENT_ORACLES, fetchCurrentOracles);
  yield takeEvery(API_GET_DISPUTE, fetchCurrentOracles);
  yield takeLatest(ORACLE_PAGE_CHANGE, onOraclePageChange);
  yield takeLatest(ORACLE_ORDER_CHANGE, onOracleOrderChange);
}
