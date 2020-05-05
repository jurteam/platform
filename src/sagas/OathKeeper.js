import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import OathKeeper from "../api/connex/OathKeeper";
import { getWallet, getNewOath } from "./Selectors";
import {
  OATH_KEEPER_START_TAKING_OATH,
  OATH_KEEPER_DONE_TAKING_OATH,
  OATH_KEEPER_FETCHED_MY_OATHS,
  OATH_KEEPER_FETCH_MY_OATHS
} from "../reducers/types";

function* takeAnOath() {
  const { address } = yield select(getWallet);
  const { amount, lockInPeriod, acceptTnC } = yield select(getNewOath);

  // TODO: Check for acceptTnC and dispatch accordingly
  yield new OathKeeper().takeAnOath(address, amount, lockInPeriod);
  yield put({ type: OATH_KEEPER_DONE_TAKING_OATH });
}

function* fetchMyOaths() {
  const { address } = yield select(getWallet);
  // TODO: add cache machanizm here
  const myOaths = yield new OathKeeper().fetchOathsOf(address);
  yield put({ type: OATH_KEEPER_FETCHED_MY_OATHS, payload: myOaths });
}

export default function* oathKeeperSagas() {
  yield takeEvery(OATH_KEEPER_START_TAKING_OATH, takeAnOath);
  yield takeLatest(OATH_KEEPER_FETCH_MY_OATHS, fetchMyOaths);
}
