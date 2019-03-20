import { call, put, select, takeLatest } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  RESET_CONTRACT,
  NEW_CONTRACT,
  PUT_CONTRACT,
  CONTRACT_UPDATING,
  UPDATE_CONTRACT_FILTER,
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

import {
  getNewContract,
  getCurrentContract,
  getContractFilters
} from "./Selectors"; // selector

// Get
export function* getContract(action) {
  const { id } = action;

  try {
    const response = yield call(Contracts.get, { id });
    log("getContract", response);
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
    log("deleteContract - error", error);
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchContracts() {
  yield put({ type: UPDATE_CONTRACT_FILTER, disabled: true });
  const { status, fromDate, toDate, searchText } = yield select(
    getContractFilters
  );
  log("contracts - filters", {
    status: status && typeof status.value !== "undefined" ? status.value : null,
    from:fromDate,
    to:toDate,
    q:searchText
  });
  try {
    const response = yield call(Contracts.list, {
      status:
        status && typeof status.value !== "undefined" ? status.value : null,
      from:fromDate,
      to:toDate,
      q:searchText
    });
    log("contracts - fetch", response);
    yield put({ type: CONTRACTS_FETCHED, payload: response.data.data });
    yield put({ type: UPDATE_CONTRACT_FILTER, disabled: false });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
    yield put({ type: UPDATE_CONTRACT_FILTER, disabled: false });
  }
}

// Create
export function* createContract(action) {
  log("createContract - run");
  const contractData = yield select(getNewContract);

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

// Update
export function* updateContract(action) {
  log("updateContract - run");
  const { id, contractName, kpi, resolutionProof, category } = yield select(getCurrentContract);

  const toUpdate = new FormData();
  // toUpdate.append('_method', 'PUT');
  toUpdate.append("contract_name", contractName);
  toUpdate.append("kpi", kpi);
  toUpdate.append("resolution_proof", resolutionProof);
  toUpdate.append("category", category);

  for (let i = 0; i < action.attachments.length; i++) {
    // iteate over any file sent over appending the files to the form data.
    let file = action.attachments[i];

    toUpdate.append("attachments[" + i + "]", file);
  }
  // toUpdate.append("attachments[]", action.attachments);

  log("updateContract - contractData", toUpdate);

  try {
    const response = yield call(Contracts.update, toUpdate, id);
    log("updateContract - contract created", response);
    // yield put({ type: SET_CONTRACT, payload: response.data.data });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
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
  yield takeLatest(PUT_CONTRACT, updateContract);
  yield takeLatest(API_GET_CONTRACT, getContract);
  yield takeLatest(API_DELETE_CONTRACT, deleteContract);
  yield takeLatest(FETCH_CONTRACTS, fetchContracts);
  yield takeLatest(CONTRACT_DELETED, onContractDelete);
  yield takeLatest(RESET_CONTRACT, onContractReset);
  yield takeLatest(API_CATCH, onError);
}
