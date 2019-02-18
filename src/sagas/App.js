import { put, takeEvery } from "redux-saga/effects";
import { DRIZZLE_INITIALIZED, NETWORK_ID_FAILED, SET_READY, SET_LOADING } from "./../reducers/types"

import { log } from "./../utils/helpers" // log helper

// app loading disable
export function* disableLoading() {
  log("run", "disableLoading");
  yield put({ type: SET_LOADING, payload: false });
  yield put({ type: SET_READY, payload: true });
}

// spawn a new actions task
export default function* appSagas() {
  log("run", "appSagas");
  yield takeEvery(DRIZZLE_INITIALIZED, disableLoading);
  yield takeEvery(NETWORK_ID_FAILED, disableLoading);
}
