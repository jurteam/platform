import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  FETCH_ORACLES,
  FETCH_CURRENT_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED,
  API_CATCH,
  API_GET_DISPUTE
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

import contractStatuses from "../assets/i18n/en/status.json";

// Api layouts
import { Oracles } from "../api";

import {
  getNewContract
} from "./Selectors"; // selector

// Get
export function* fetchOracles(action) {
  const { id } = action;
  try {
    const response = yield call(Oracles.list, {
      id
    });
    log("contracts - fetch", response);
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
    log("contracts - fetch", response);
    yield put({ type: CURRENT_ORACLES_FETCHED, payload: response.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Create
// export function* storeVote(action) {
//   log("createContract - run");
//   const contractStoredData = yield select(getNewContract);
//   const { statusId, statusLabel, kpi, resolution_proof, ...contractData } = contractStoredData;

//   log("createContract - contractData", contractData);

//   try {
//     const response = yield call(Contracts.create, contractData);
//     log("createContract - contract created", response);
//     yield put({ type: SET_CONTRACT, payload: response.data.data });
//     yield put({ type: FETCH_CONTRACTS });

//     const { id } = response.data.data;
//     const { history } = action;
//     history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
//   } catch (error) {
//     yield put({ type: API_CATCH, error });
//   }
// }

// spawn tasks base certain actions
export default function* oracleSagas() {
  log("run", "oracleSagas");
  yield takeEvery(FETCH_ORACLES, fetchOracles);
  yield takeEvery(FETCH_CURRENT_ORACLES, fetchCurrentOracles);
  yield takeEvery(API_GET_DISPUTE, fetchCurrentOracles);
}
