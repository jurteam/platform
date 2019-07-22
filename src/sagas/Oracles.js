import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  FETCH_ORACLES,
  FETCH_CURRENT_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED,
  API_CATCH,
  API_GET_DISPUTE,
  ORACLE_PAGE_CHANGE,
  SET_ORACLE_CURRENT_PAGE,
  DISPUTE_UPDATING,
  RESET_VOTE,
  PUT_VOTE
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

import contractStatuses from "../assets/i18n/en/status.json";

// Api layouts
import { Oracles, Disputes } from "../api";

import {
  getOracleOrder,
  getOracleListPage
} from "./Selectors"; // selector

// Get
export function* fetchOracles(action) {
  const { id } = action;

  const { wallet_part } = yield select(getOracleOrder);
  const page = yield select(getOracleListPage);

  try {
    const response = yield call(Oracles.list, {
      id,
      include: "attachments",
      "order[wallet_part]": wallet_part,
      page
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
}

export function* onVote(action) {
  log("onVote - run");
  yield put({ type: DISPUTE_UPDATING, payload: true });
  const {
    vote: {
      amount,
      contract_id,
      message,
      hash,
      oracle_wallet,
      wallet_part
    },
    attachments
  } = action;

  const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const voteData = new FormData();
  // voteData.append('_method', 'PUT');
  if (contract_id) voteData.append("contract_id", contract_id);
  voteData.append("hash", hash || "0x0");
  if (wallet_part) voteData.append("wallet_part", wallet_part);
  if (oracle_wallet) voteData.append("oracle_wallet", oracle_wallet);
  if (message) voteData.append("message", message);
  voteData.append("amount", Number(amount).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)); // always

  for (let i = 0; i < attachments.length; i++) {
    // iteate over any file sent over appending the files to the form data.
    let file = attachments[i];

    voteData.append("attachments[" + i + "]", file);
  }
  // voteData.append("attachments[]", attachments);

  log("onVote - voteData", voteData);

  try {
    const response = yield call(Disputes.vote, voteData);
    log("onVote - vote created", response);

    yield put({ type: DISPUTE_UPDATING, payload: false });
    yield put({ type: RESET_VOTE });
    // TODO: fetch new votes

    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  } catch (error) {

    yield put({ type: DISPUTE_UPDATING, payload: false });

    yield put({ type: API_CATCH, error });
    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  }
}

// spawn tasks base certain actions
export default function* oracleSagas() {
  log("run", "oracleSagas");
  yield takeEvery(PUT_VOTE, onVote);
  yield takeEvery(FETCH_ORACLES, fetchOracles);
  yield takeEvery(FETCH_CURRENT_ORACLES, fetchCurrentOracles);
  yield takeEvery(API_GET_DISPUTE, fetchCurrentOracles);
  yield takeLatest(ORACLE_PAGE_CHANGE, onOraclePageChange);
}