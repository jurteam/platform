import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { connexOathKeeper, OathKeeper } from "../api";
import { getWallet, getNewOath, getMyOaths } from "./Selectors";
import {
  OATH_KEEPER_TAKE_OATH,
  OATH_KEEPER_TOOK_OATH,
  OATH_KEEPER_UPDATE_MY_OATHS,
  OATH_KEEPER_FETCH_MY_OATHS,
  OATH_KEEPER_FETCH_RANK,
  OATH_KEEPER_UPDATE_RANK,
  OATH_KEEPER_FETCH_OATH_TAKERS,
  OATH_KEEPER_UPDATE_OATH_TAKERS,
  OATH_KEEPER_FETCH_ANALYTICS,
  OATH_KEEPER_UPDATE_ANALYTICS,
  OATH_KEEPER_WITHDRAW_OATH,
  OATH_KEEPER_WITHDREW_OATH,
  HOUND_START_SMELLING
} from "../reducers/types";

function* fetchMyRank() {
  const { address } = yield select(getWallet);
  const oathTaker = yield OathKeeper.oathTakers(address);
  yield put({
    type: OATH_KEEPER_UPDATE_RANK,
    payload: oathTaker.data.attributes.rank
  });
}

function* takeAnOath() {
  const { address } = yield select(getWallet);
  const { amount, lockInPeriod, acceptTnC } = yield select(getNewOath);
  const myOaths = yield select(getMyOaths);
  const oathIndex = myOaths.length;

  // TODO: Check for acceptTnC and dispatch accordingly
  const prey = yield new connexOathKeeper().takeAnOath(
    address,
    amount,
    lockInPeriod
  );
  yield put({ type: OATH_KEEPER_TOOK_OATH });

  prey.onFound = () =>
    global.store.dispatch({
      type: OATH_KEEPER_FETCH_MY_OATHS,
      payload: oathIndex
    });

  yield put({ type: HOUND_START_SMELLING, payload: prey });
}

function* withdrawAnOath(action) {
  const oathIndex = action.payload;
  const { address } = yield select(getWallet);

  const prey = yield new connexOathKeeper().releaseOath(address, oathIndex);
  yield put({ type: OATH_KEEPER_WITHDREW_OATH, payload: oathIndex });

  prey.onFound = () =>
    global.store.dispatch({
      type: OATH_KEEPER_FETCH_MY_OATHS,
      payload: oathIndex
    });

  yield put({ type: HOUND_START_SMELLING, payload: prey });
}

function* fetchMyOaths(action) {
  const { address } = yield select(getWallet);
  let myOaths = yield select(getMyOaths);
  // TODO: add cache machanizm here
  console.log("saga OathKeeper fetchMyOaths", action);

  if (action.payload !== undefined) {
    const oath = yield new connexOathKeeper().fetchOathAt(
      address,
      action.payload
    );

    // if (myOaths.length + 1 > action.payload)
    myOaths = myOaths.map(o => (o.oathIndex === action.payload ? oath : o));
    // else myOaths = [oath, ...myOaths];
  } else {
    myOaths = yield new connexOathKeeper().fetchOathsOf(address);
  }

  yield put({ type: OATH_KEEPER_UPDATE_MY_OATHS, payload: myOaths });
}

function* fetchOathTakers(action) {
  let params = yield select(state => ({
    ...state.oathKeeper.oathTakersFilters
  }));

  if (typeof action.payload === "object") {
    params = { ...params, ...action.payload };
  }

  const oathTakers = yield OathKeeper.oathTakers(null, params);
  yield put({ type: OATH_KEEPER_UPDATE_OATH_TAKERS, payload: oathTakers });
}

function* fetchAnalytics(action) {
  const analytics = yield OathKeeper.analytics(action.card, action.payload);

  yield put({
    type: OATH_KEEPER_UPDATE_ANALYTICS,
    payload: analytics,
    card: action.card
  });
}

export default function* oathKeeperSagas() {
  yield takeLatest(OATH_KEEPER_FETCH_RANK, fetchMyRank);
  yield takeEvery(OATH_KEEPER_TAKE_OATH, takeAnOath);
  yield takeLatest(OATH_KEEPER_FETCH_MY_OATHS, fetchMyOaths);
  yield takeLatest(OATH_KEEPER_FETCH_OATH_TAKERS, fetchOathTakers);
  yield takeLatest(OATH_KEEPER_FETCH_ANALYTICS, fetchAnalytics);
  yield takeEvery(OATH_KEEPER_WITHDRAW_OATH, withdrawAnOath);
}
