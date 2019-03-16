import { call, put, select, takeLatest } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  RESET_CONTRACT,
  NEW_CONTRACT,
  API_CATCH,
  UPDATE_CONTRACT_FIELD
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

// Api layouts
import { Contracts } from "../api";

import { getCurrentContract } from "./Selectors"; // selector

// Create
export function* createContract(action) {
  log("createContract - run");
  const {
    part_a_email,
    part_a_public_name,
    part_a_wallet,
    part_b_email,
    part_b_public_name,
    part_b_wallet
  } = yield select(getCurrentContract);

  const contractData = {
    part_a_email,
    part_a_public_name,
    part_a_wallet,
    part_b_email,
    part_b_public_name,
    part_b_wallet
  };

  log("createContract - contractData", contractData);

  try {
    const response = yield call(Contracts.create, contractData);
    log("createContract - contract created", response);

    const { id } = response.data;
    const { history } = action;
    history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    // yield put({ type: USER_UPDATE, ...response.data });
  } catch (error) {
    yield put({ type: API_CATCH, error });
    // yield put({ type: USER_UPDATING, payload: false });
  }
}

// Reset
export function* onContractReset() {
  const user = yield select(getUser);
  yield put({
    type: UPDATE_CONTRACT_FIELD,
    field: "part_a_wallet",
    value: user.wallet
  });
  yield put({
    type: UPDATE_CONTRACT_FIELD,
    field: "part_a_public_name",
    value: user.show_fullname ? user.name : ""
  });
  yield put({
    type: UPDATE_CONTRACT_FIELD,
    field: "part_a_email",
    value: user.email
  });
}

// spawn tasks base certain actions
export default function* contractSagas() {
  log("run", "contractSagas");
  yield takeLatest(NEW_CONTRACT, createContract);
  yield takeLatest(RESET_CONTRACT, onContractReset);
}
