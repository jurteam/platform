import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { getUser } from "./Selectors";
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
  CHAIN_GET_DISPUTE
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

    if (typeof onSuccess === "function") onSuccess(); // exec onSuccess callback if present

  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });

    if (typeof onError === "function") onError(error); // exec onError callback if present
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
  const { status, fromDate, toDate, searchText } = yield select(
    getDisputeFilters
  );
  const page = yield select(getDisputeListPage);
  log("Disputes - filters", {
    status: status && typeof status.value !== "undefined" ? status.value : null,
    from:fromDate,
    to:toDate,
    q:searchText
  });
  try {
    const response = yield call(Disputes.list, {
      status:
        status && typeof status.value !== "undefined" ? status.value : null,
      from:fromDate,
      to:toDate,
      q:searchText,
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

// Update
export function* updateDispute(action) {
  log("updateDispute - run");
  yield put({ type: DISPUTE_SAVING, payload: true });
  const { id, DisputeName, kpi, resolutionProof, category, value, whoPays, duration, hasPenaltyFee, partAPenaltyFee, partBPenaltyFee } = yield select(getCurrentDispute);

  const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const toUpdate = new FormData();
  // toUpdate.append('_method', 'PUT');
  if (DisputeName) toUpdate.append("name", DisputeName);
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

  log("updateDispute - DisputeData", toUpdate);

  try {
    const response = yield call(Disputes.update, toUpdate, id);
    log("updateDispute - Dispute created", response);
    yield put({ type: SET_DISPUTE, payload: response.data.data });
    yield put({ type: FETCH_DISPUTES });

    // const { history } = action;
    // history.push(`/Disputes/detail/${id}`); // go to Dispute detail for furter operations

    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  } catch (error) {
    yield put({ type: API_CATCH, error });
    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
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

// spawn tasks base certain actions
export default function* disputeSagas() {
  log("run", "DisputeSagas");
  yield takeEvery(PUT_DISPUTE, updateDispute);
  yield takeEvery(API_GET_DISPUTE, getDispute);
  yield takeLatest(API_DELETE_DISPUTE, deleteDispute);
  yield takeEvery(FETCH_DISPUTES, fetchDisputes);
  yield takeLatest(DISPUTE_DELETED, onDisputeDelete);
  yield takeLatest(API_CATCH, resetUpdating);
  yield takeLatest(SET_DISPUTE, resetUpdating);
  yield takeLatest(DISPUTE_MEDIA_DELETE, deleteDisputeMedia);
  yield takeLatest(DISPUTE_PAGE_CHANGE, onDisputePageChange);
}
