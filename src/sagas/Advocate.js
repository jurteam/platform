import { takeLatest, put, select } from "redux-saga/effects";
import { shareOn, advocates } from "../api/Advocate";
import { statusUrlOf } from "JurUtils/AdvocateHelpers";
import { getSocialSharebles, getWallet } from "./Selectors";
import {
  ADVOCATE_SHARE,
  ADVOCATE_FETCH_MINE,
  ADVOCATE_UPDATE_MINE,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_FETCH_ALL
} from "../reducers/types";

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getSocialSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchMyAdvocasy() {
  const { address } = yield select(getWallet);
  const payload = yield advocates(address);
  yield put({ type: ADVOCATE_UPDATE_MINE, payload });
}

function* fetchAdvocates() {
  const { data, meta } = yield advocates();
  const payload = {
    holders: data,
    holdersMeta: meta
  };
  yield put({ type: ADVOCATE_UPDATE_ALL, payload });
}

export default function* Status() {
  yield takeLatest(ADVOCATE_SHARE, shareStatus);
  yield takeLatest(ADVOCATE_FETCH_MINE, fetchMyAdvocasy);
  yield takeLatest(ADVOCATE_FETCH_ALL, fetchAdvocates);
}
