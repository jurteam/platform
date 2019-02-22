import { put, select, takeEvery } from "redux-saga/effects";

import { DISCLAIMER_OPTIN, DISCLAIMER_VISIBILITY, DISCLAIMER_ACCEPTED } from "../reducers/types"; // action types

import { log } from "../utils/helpers"; // log helper

export function* handleDisclaimerOptin(args) {
  log("handleDisclaimerOptin", "run");
  log("handleDisclaimerOptin - args", args);

  // handle visibility and API saga
  if (args.optin === true) {
    yield put({ type: DISCLAIMER_VISIBILITY, viewed: true })
    yield put({ type: DISCLAIMER_ACCEPTED })
  }
}

// spawn tasks base certain actions
export default function* userSagas() {
  log("run", "userSagas");
  yield takeEvery(DISCLAIMER_OPTIN, handleDisclaimerOptin);
}
