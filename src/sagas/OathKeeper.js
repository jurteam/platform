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
  OATH_KEEPER_WITHDREW_OATH
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

  // TODO: Check for acceptTnC and dispatch accordingly
  yield new connexOathKeeper().takeAnOath(address, amount, lockInPeriod);
  yield put({ type: OATH_KEEPER_TOOK_OATH });
  yield new Promise(resolve => setTimeout(resolve, 12000));
  yield put({ type: OATH_KEEPER_FETCH_MY_OATHS, payload: myOaths.length + 1 });
}

function* withdrawAnOath(action) {
  console.log("about to withdraw", action);
  const oathIndex = action.payload;
  const { address } = yield select(getWallet);

  yield new connexOathKeeper().releaseOath(address, oathIndex);
  yield put({ type: OATH_KEEPER_WITHDREW_OATH, payload: oathIndex });
  yield put({ type: OATH_KEEPER_FETCH_MY_OATHS, payload: oathIndex });
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

    console.log("saga OathKeeper fetchMyOaths oath", oath);

    if (myOaths.length <= action.payload)
      myOaths = myOaths.map(o => (o.oathIndex === action.payload ? oath : o));
    else myOaths = [oath, ...myOaths];
  } else {
    myOaths = yield new connexOathKeeper().fetchOathsOf(address);
  }

  console.log("saga OathKeeper fetchMyOaths myOaths", action, myOaths);
  yield put({ type: OATH_KEEPER_UPDATE_MY_OATHS, payload: myOaths });
}

function* fetchOathTakers(action) {
  const params = yield select(state => ({
    filter: state.oathKeeper.oathTakersFilters,
    page: {}
  }));

  console.log("fetchOathTakers saga action", action, params);

  if (action.payload) {
    [("filter", "page")].forEach(key => {
      if (action.payload[key]) {
        console.log("fetchOathTakers saga fe", key, action.payload, params);
        params[key] = { ...params[key], ...action.payload[key] };
      }
    });
  }

  console.log(
    "fetchOathTakers saga params",
    JSON.parse(JSON.stringify(params))
  );
  delete params.filter; // TODO: remove once backend is working

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
