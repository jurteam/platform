import { put, select, takeEvery } from "redux-saga/effects";

import { DISCLAIMER_OPTIN } from "../reducers/types"; // action types

import { log } from "../utils/helpers"; // log helper

export function* handleDisclaimerOptin(args) {
  log("handleDisclaimerOptin", "run");
  log("handleDisclaimerOptin - args", args);
  yield put({ type: DISCLAIMER_OPTIN, optin: args.optin })
}

// spawn tasks base certain actions
export default function* userSagas() {
  log("run", "arbitrationSagas");
  yield takeEvery(DISCLAIMER_OPTIN, handleDisclaimerOptin);
}
