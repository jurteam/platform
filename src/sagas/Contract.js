import { call, put, select, takeLatest } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  RESET_CONTRACT,
  NEW_CONTRACT,
  CONTRACT_UPDATING,
  FETCH_CONTRACTS,
  API_GET_CONTRACT,
  SET_CONTRACT,
  API_DELETE_CONTRACT,
  CONTRACTS_FETCHED,
  CONTRACT_DELETED,
  API_CATCH,
  UPDATE_CONTRACT_FIELD
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

// Api layouts
import { Contracts } from "../api";

import { getCurrentContract } from "./Selectors"; // selector

// Get
export function* getContract(action) {
  const { id } = action;

  try {
    const response = yield call(Contracts.get, { id });
    log("createContract - get", response);
    yield put({ type: SET_CONTRACT, payload: response.data.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Delete
export function* deleteContract(action) {
  yield put({ type: CONTRACT_UPDATING, payload: true });

  log("deleteContract - action", action);

  // proceed
  const { id } = action;
  try {
    const response = yield call(Contracts.delete, action);
    log("deleteContract - delete", response);
    yield put({ type: CONTRACT_DELETED, id });
  } catch (error) {
    log("deleteContract - error", error)
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchContracts() {

  try {
    const response = yield call(Contracts.list);
    log("contracts - fetch", response);
    yield put({ type: CONTRACTS_FETCHED, payload: response.data.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Create
export function* createContract(action) {
  log("createContract - run");
  const {
    part_a_email,
    part_a_name,
    part_a_wallet,
    part_b_email,
    part_b_name,
    part_b_wallet
  } = yield select(getCurrentContract);

  const contractData = {
    part_a_email,
    part_a_name,
    part_a_wallet,
    part_b_email,
    part_b_name,
    part_b_wallet
  };

  log("createContract - contractData", contractData);

  try {
    const response = yield call(Contracts.create, contractData);
    log("createContract - contract created", response);
    yield put({ type: SET_CONTRACT, payload: response.data.data });

    const { id } = response.data.data;
    const { history } = action;
    history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
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
    field: "part_a_name",
    value: user.show_fullname ? user.name : ""
  });
  yield put({
    type: UPDATE_CONTRACT_FIELD,
    field: "part_a_email",
    value: user.email
  });
}

export function* onContractDelete() {
  yield put({ type: FETCH_CONTRACTS });
}

export function* onError() {
  yield put({ type: CONTRACT_UPDATING, payload: false });
}

// spawn tasks base certain actions
export default function* contractSagas() {
  log("run", "contractSagas");
  yield takeLatest(NEW_CONTRACT, createContract);
  yield takeLatest(API_GET_CONTRACT, getContract);
  yield takeLatest(API_DELETE_CONTRACT, deleteContract);
  yield takeLatest(FETCH_CONTRACTS, fetchContracts);
  yield takeLatest(CONTRACT_DELETED, onContractDelete);
  yield takeLatest(RESET_CONTRACT, onContractReset);
  yield takeLatest(API_CATCH, onError);
}
