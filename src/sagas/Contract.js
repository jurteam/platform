import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
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
  SET_CONTRACT_ACTIVITIES,
  SET_CONTRACT_CURRENT_PAGE,
  CONTRACT_LIST_UPDATING,
  API_DELETE_CONTRACT,
  CONTRACTS_FETCHED,
  CONTRACT_DELETED,
  API_CATCH,
  READ_NOTIFICATIONS,
  CONTRACT_NOTIFICATIONS_LOADING,
  CONTRACT_READ_NOTIFICATIONS,
  CONTRACT_SAVING,
  CONTRACT_MEDIA_DELETE,
  CONTRACT_MEDIA_DELETED,
  CONTRACT_PAGE_CHANGE,
  UPDATE_NEW_CONTRACT_FIELD,
  CHAIN_GET_CONTRACT
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

// Api layouts
import { Contracts } from "../api";

import {
  getNewContract,
  getCurrentContract,
  getContractListPage,
  getContractFilters,
  getCurrentContractActivities
} from "./Selectors"; // selector

// Get
export function* getContract(action) {
  const { id, onSuccess, onError } = action;
  yield put({ type: CONTRACT_UPDATING, payload: true });

  try {
    const response = yield call(Contracts.get, { id });
    const { data } = response.data;
    const { address } = data;
    log("getContract", response);
    yield put({ type: SET_CONTRACT, payload: data });
    if (address) {
      yield put({ type: CHAIN_GET_CONTRACT, address });
    }

    if (typeof onSuccess === "function") onSuccess(); // exec onSuccess callback if present

  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });

    if (typeof onError === "function") onError(error); // exec onError callback if present
  }
}

export function* getContractActivities(action) {
  const { payload: { id } } = action;
  yield put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: true });

  try {
    const response = yield call(Contracts.getActivities, { id });
    const { data } = response.data;
    log("getContract", response);
    yield put({ type: SET_CONTRACT_ACTIVITIES, payload: data });

  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
    yield put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: false });
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

export function* readActivities(action) {
  let activities = [];
  const { type } = action;
  console.log("readActivities - run", action);

  if (type === READ_NOTIFICATIONS) { // whole notifications
  } else { // contract activities only
    activities = yield select(getCurrentContractActivities);
  };

  console.log("readActivities - activities", activities);

  const filteredAcivities = activities.reduce((acc, activity) => {
    activity.readed ? acc.old.push(activity) : acc.new.push(activity);
    return acc;
  }, {old: [], new: []});

  console.log("readActivities - activities", filteredAcivities.new);
  // loop filtered activities new
}

export function* fetchContracts() {
  yield put({ type: CONTRACT_LIST_UPDATING, payload: true });
  yield put({ type: UPDATE_CONTRACT_FILTER, disabled: true });
  const { status, fromDate, toDate, searchText } = yield select(
    getContractFilters
  );
  const page = yield select(getContractListPage);
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
      q:searchText,
      page
    });
    log("contracts - fetch", response);
    yield put({ type: CONTRACTS_FETCHED, payload: response.data });
    yield put({ type: UPDATE_CONTRACT_FILTER, disabled: false });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
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
    yield put({ type: FETCH_CONTRACTS });

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
  yield put({ type: CONTRACT_SAVING, payload: true });
  const { id, contractName, kpi, resolutionProof, category, value, whoPays, duration, hasPenaltyFee, partAPenaltyFee, partBPenaltyFee } = yield select(getCurrentContract);

  const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const toUpdate = new FormData();
  // toUpdate.append('_method', 'PUT');
  if (contractName) toUpdate.append("name", contractName);
  if (kpi) toUpdate.append("kpi", kpi);
  if (resolutionProof) toUpdate.append("resolution_proof", resolutionProof);
  if (category) toUpdate.append("category", category);
  if (whoPays) toUpdate.append("who_pays", whoPays);
  toUpdate.append("value", Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)); // always
  if (duration && duration.days) toUpdate.append("duration_days", duration.days);
  if (duration && duration.hours) toUpdate.append("duration_hours", duration.hours);
  if (duration && duration.minutes) toUpdate.append("duration_minutes", duration.minutes);
  toUpdate.append("has_penalty_fee", hasPenaltyFee ? 1 : 0); // always
  if (hasPenaltyFee) {
    if (partAPenaltyFee) toUpdate.append("part_a_penalty_fee", hasPenaltyFee && Number(partAPenaltyFee) <= Number(value) ? Number(partAPenaltyFee).toFixed(process.env.REACT_APP_TOKEN_DECIMALS) : Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)); // handle maximum value possibile
    if (partBPenaltyFee) toUpdate.append("part_b_penalty_fee", hasPenaltyFee && Number(partBPenaltyFee) <= Number(value) ? Number(partBPenaltyFee).toFixed(process.env.REACT_APP_TOKEN_DECIMALS) : Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)); // handle maximum value possibile
  } else { // reset penalty fees
    toUpdate.append("part_a_penalty_fee", zero);
    toUpdate.append("part_b_penalty_fee", zero);
  };
  toUpdate.append("in_case_of_dispute", "open"); // default

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
    yield put({ type: SET_CONTRACT, payload: response.data.data });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations

    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  } catch (error) {
    yield put({ type: API_CATCH, error });
    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  }
}

// Delete media
export function* deleteContractMedia(action) {
  log("deleteContractMedia - run", action);

  const { type, ...params } = action;

  try {
    const response = yield call(Contracts.deleteMedia, params);
    log("deleteContractMedia - media deleted", response);
    yield put({ type: CONTRACT_MEDIA_DELETED, ...params });

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
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_wallet",
    value: user.wallet
  });
  yield put({
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_name",
    value: user.show_fullname ? user.name : ""
  });
  yield put({
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_email",
    value: user.email
  });
}

export function* onContractDelete() {
  yield put({ type: FETCH_CONTRACTS });
  yield put({ type: SET_CONTRACT_CURRENT_PAGE, payload: 1 });
}

export function* onContractPageChange(action) {
  yield put({ type: SET_CONTRACT_CURRENT_PAGE, payload: action.payload });
  yield put({ type: CONTRACT_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_CONTRACTS });
}

export function* resetUpdating() {
  yield put({ type: CONTRACT_SAVING, payload: false });
  yield put({ type: CONTRACT_UPDATING, payload: false });
}

// spawn tasks base certain actions
export default function* contractSagas() {
  log("run", "contractSagas");
  yield takeLatest(NEW_CONTRACT, createContract);
  yield takeEvery(PUT_CONTRACT, updateContract);
  yield takeEvery(API_GET_CONTRACT, getContract);
  yield takeLatest(API_DELETE_CONTRACT, deleteContract);
  yield takeEvery(FETCH_CONTRACTS, fetchContracts);
  yield takeLatest(CONTRACT_DELETED, onContractDelete);
  yield takeLatest(RESET_CONTRACT, onContractReset);
  yield takeLatest(API_CATCH, resetUpdating);
  yield takeLatest(SET_CONTRACT, resetUpdating);
  yield takeLatest(SET_CONTRACT, getContractActivities);
  yield takeLatest(SET_CONTRACT_ACTIVITIES, () => put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: false }));
  yield takeLatest(READ_NOTIFICATIONS, readActivities);
  yield takeLatest(CONTRACT_READ_NOTIFICATIONS, readActivities);
  yield takeLatest(CONTRACT_MEDIA_DELETE, deleteContractMedia);
  yield takeLatest(CONTRACT_PAGE_CHANGE, onContractPageChange);
}
