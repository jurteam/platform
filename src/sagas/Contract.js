import { put, select, takeLatest } from "redux-saga/effects";
import {
  getUser
} from "./Selectors";
import {
  RESET_CONTRACT,
  UPDATE_CONTRACT_FIELD
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

// Reset
export function* onContractReset() {
  const user = yield select(getUser);
  yield put({ type: UPDATE_CONTRACT_FIELD, field: "part_a_wallet", value: user.wallet });
  yield put({ type: UPDATE_CONTRACT_FIELD, field: "part_a_public_name", value: (user.show_fullname) ? user.name : "" });
  yield put({ type: UPDATE_CONTRACT_FIELD, field: "part_a_email", value: user.email });
}

// spawn tasks base certain actions
export default function* contractSagas() {
  log("run", "contractSagas");
  yield takeLatest(RESET_CONTRACT, onContractReset);
}
