import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";

import {
  RESET_DISPUTE,
  PUT_DISPUTE,
  DISPUTE_UPDATING,
  UPDATE_DISPUTE_FILTER,
  FETCH_DISPUTES,
  API_GET_DISPUTE,
  SET_DISPUTE,
  SET_DISPUTE_CURRENT_PAGE,
  DISPUTE_LIST_UPDATING,
  API_DELETE_DISPUTE,
  DISPUTES_FETCHED,
  DISPUTE_DELETED,
  API_CATCH,
  READ_NOTIFICATIONS,
  DISPUTE_SAVING,
  DISPUTE_MEDIA_DELETE,
  DISPUTE_MEDIA_DELETED,
  DISPUTE_PAGE_CHANGE,
  CHAIN_GET_DISPUTE,
  DELETE_ALL_DISPUTES,
  RESET_ALL_DISPUTES
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper

// Api layouts
import { Disputes } from "../api";

import {
  getNewDispute,
  getCurrentDispute,
  getDisputeListPage,
  getDisputeFilters,
  getCurrentDisputeActivities
} from "./Selectors"; // selector

// Get
export function* getDispute(action) {
  const { id, onSuccess, onError } = action;
  yield put({ type: DISPUTE_UPDATING, payload: true });

  try {
    const response = yield call(Disputes.get, { id });
    const { data } = response.data;
    const { address } = data;
    log("getDispute", response);
    yield put({ type: SET_DISPUTE, payload: data });
    if (address) {
      yield put({ type: CHAIN_GET_DISPUTE, address });
    }

    if (typeof onSuccess === "function") {onSuccess();} // exec onSuccess callback if present
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });

    if (error.response.status === 404 && error.response.config.headers.wallet !== null) {
      const { history } = action;
      history.push(`/disputes/`); // go to contracts list
    }

    if (typeof onError === "function") {onError(error);} // exec onError callback if present
  }
}

// Delete
export function* deleteDispute(action) {
  yield put({ type: DISPUTE_UPDATING, payload: true });

  log("deleteDispute - action", action);

  // proceed
  const { id } = action;
  try {
    const response = yield call(Disputes.delete, action);
    log("deleteDispute - delete", response);
    yield put({ type: DISPUTE_DELETED, id });
  } catch (error) {
    log("deleteDispute - error", error);
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchDisputes() {
  yield put({ type: DISPUTE_LIST_UPDATING, payload: true });
  yield put({ type: UPDATE_DISPUTE_FILTER, disabled: true });
  const { status, fromDate, toDate, searchText, category, mine } = yield select(
    getDisputeFilters
  );
  const page = yield select(getDisputeListPage);
  log("Disputes - filters", {
    status: status && typeof status.value !== "undefined" ? status.value : null,
    from: fromDate,
    to: toDate,
    q: searchText
  });
  try {
    const response = yield call(Disputes.list, {
      status:
        status && typeof status.value !== "undefined" ? status.value : null,
      from: fromDate,
      to: toDate,
      category:
        category && typeof category.value !== "undefined"
          ? category.value
          : null,
      q: searchText,
      show: mine ? "my" : "all",
      page
    });
    log("Disputes - fetch", response);
    yield put({ type: DISPUTES_FETCHED, payload: response.data });
    yield put({ type: UPDATE_DISPUTE_FILTER, disabled: false });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Delete media
export function* deleteDisputeMedia(action) {
  log("deleteDisputeMedia - run", action);

  const { type, ...params } = action;

  try {
    const response = yield call(Disputes.deleteMedia, params);
    log("deleteDisputeMedia - media deleted", response);
    yield put({ type: DISPUTE_MEDIA_DELETED, ...params });

    // const { history } = action;
    // history.push(`/Disputes/detail/${id}`); // go to Dispute detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// Reset
export function* onDisputeDelete() {
  yield put({ type: FETCH_DISPUTES });
  yield put({ type: SET_DISPUTE_CURRENT_PAGE, payload: 1 });
}

export function* onDisputePageChange(action) {
  yield put({ type: SET_DISPUTE_CURRENT_PAGE, payload: action.payload });
  yield put({ type: DISPUTE_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_DISPUTES });
}

export function* resetUpdating() {
  yield put({ type: DISPUTE_SAVING, payload: false });
  yield put({ type: DISPUTE_UPDATING, payload: false });
}

export function* onDeleteAllDisputes() {
  try {
    yield call(Disputes.deleteAll);
    yield put({ type: DISPUTE_DELETED });
    yield put({ type: RESET_ALL_DISPUTES });
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// spawn tasks base certain actions
export default function* disputeSagas() {
  log("run", "DisputeSagas");
  yield takeEvery(API_GET_DISPUTE, getDispute);
  yield takeLatest(API_DELETE_DISPUTE, deleteDispute);
  yield takeEvery(FETCH_DISPUTES, fetchDisputes);
  yield takeLatest(DISPUTE_DELETED, onDisputeDelete);
  yield takeLatest(API_CATCH, resetUpdating);
  yield takeLatest(SET_DISPUTE, resetUpdating);
  yield takeLatest(DISPUTE_MEDIA_DELETE, deleteDisputeMedia);
  yield takeLatest(DISPUTE_PAGE_CHANGE, onDisputePageChange);
  yield takeLatest(DELETE_ALL_DISPUTES, onDeleteAllDisputes);
}
