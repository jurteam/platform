import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { shareOn, holders } from "../api/Status";
import { statusUrlOf } from "JurUtils/StatusHelpers";
import { getStatusSharebles, getWallet } from "./Selectors";
import {
  STATUS_SHARE,
  STATUS_FETCH_MINE,
  STATUS_UPDATE_MINE,
  STATUS_UPDATE_HOLDERS,
  STATUS_FETCH_HOLDERS
} from "../reducers/types";

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getStatusSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchMyStatus() {
  const { address } = yield select(getWallet);
  const payload = yield holders(address);
  yield put({ type: STATUS_UPDATE_MINE, payload });
}

function* fetchHolders() {
  const { data, meta } = yield holders();
  const payload = {
    holders: data,
    holdersMeta: meta
  };
  yield put({ type: STATUS_UPDATE_HOLDERS, payload });
}

export default function* Status() {
  yield takeLatest(STATUS_SHARE, shareStatus);
  yield takeLatest(STATUS_FETCH_MINE, fetchMyStatus);
  yield takeLatest(STATUS_FETCH_HOLDERS, fetchHolders);
}
