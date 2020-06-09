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
  OATH_KEEPER_FETCH_OATHS_OF,
  OATH_KEEPER_UPDATE_OATHS_OF,
  HOUND_START_SMELLING,
  OATH_KEEPER_REJECT_OATH,
  OATH_KEEPER_REJECT_WITHDRAW,
  LOOKUP_WALLET_BALANCE
} from "../reducers/types";
import { oathState } from "../utils/helpers";

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
  if (!acceptTnC) return;

  const myOaths = yield select(getMyOaths);
  const oathIndex = myOaths.length;

  try {
    const prey = yield new connexOathKeeper().takeAnOath(
      address,
      amount,
      lockInPeriod
    );

    yield put({ type: OATH_KEEPER_TOOK_OATH });

    prey.onFound = () => {
      global.store.dispatch({
        type: OATH_KEEPER_FETCH_MY_OATHS,
        payload: oathIndex
      });
      global.store.dispatch({ type: LOOKUP_WALLET_BALANCE });
    };

    yield put({ type: HOUND_START_SMELLING, payload: prey });
  } catch (e) {
    console.error("Failed to take an oath", e);
    yield put({
      type: OATH_KEEPER_REJECT_OATH,
      error: e,
      payload: {
        message: e.message,
        oathIndex
      }
    });
  }
}

function* withdrawAnOath(action) {
  const oathIndex = action.payload;
  const { address } = yield select(getWallet);

  try {
    const prey = yield new connexOathKeeper().releaseOath(address, oathIndex);
    yield put({ type: OATH_KEEPER_WITHDREW_OATH, payload: oathIndex });

    prey.onFound = () => {
      global.store.dispatch({
        type: OATH_KEEPER_FETCH_MY_OATHS,
        payload: oathIndex
      });
      global.store.dispatch({ type: LOOKUP_WALLET_BALANCE });
    };

    yield put({ type: HOUND_START_SMELLING, payload: prey });
  } catch (e) {
    console.error("Failed to withdraw an oath", e);
    yield put({
      type: OATH_KEEPER_REJECT_WITHDRAW,
      error: e,
      payload: {
        message: e.message,
        oathIndex
      }
    });
  }
}

function* fetchMyOaths(action) {
  const { address } = yield select(getWallet);
  let myOaths = yield select(getMyOaths);
  // TODO: add cache machanizm here

  if (action.payload !== undefined) {
    const oath = yield new connexOathKeeper().fetchOathAt(
      address,
      action.payload
    );

    // if (myOaths.length + 1 > action.payload)
    myOaths = myOaths.map(o =>
      o.oathIndex === action.payload ? preserveOathInfo(oath, o) : o
    );
    // else myOaths = [oath, ...myOaths];
  } else {
    myOaths = yield new connexOathKeeper().fetchOathsOf(address);
  }

  yield put({ type: OATH_KEEPER_UPDATE_MY_OATHS, payload: myOaths });
}

function* fetchOathsOf(action) {
  const address = action.payload;
  const oaths = yield new connexOathKeeper().fetchOathsOf(address);
  yield put({ type: OATH_KEEPER_UPDATE_OATHS_OF, payload: { address, oaths } });
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

function preserveOathInfo(oath, original) {
  if (Number(oath.lockInPeriod) < 1) {
    oath.lockInPeriod = original.lockInPeriod;
    oath.amount = original.amount;
    oath.customStatus = oathState.FAILED;
  }
  return oath;
}

export default function* oathKeeperSagas() {
  yield takeLatest(OATH_KEEPER_FETCH_RANK, fetchMyRank);
  yield takeEvery(OATH_KEEPER_TAKE_OATH, takeAnOath);
  yield takeLatest(OATH_KEEPER_FETCH_MY_OATHS, fetchMyOaths);
  yield takeLatest(OATH_KEEPER_FETCH_OATHS_OF, fetchOathsOf);
  yield takeLatest(OATH_KEEPER_FETCH_OATH_TAKERS, fetchOathTakers);
  yield takeLatest(OATH_KEEPER_FETCH_ANALYTICS, fetchAnalytics);
  yield takeEvery(OATH_KEEPER_WITHDRAW_OATH, withdrawAnOath);
}
