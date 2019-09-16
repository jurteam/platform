import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import {
  DRIZZLE_INITIALIZING,
  DRIZZLE_INITIALIZED,
  SET_WALLET_ADDRESS,
  NETWORK_ID_FAILED,
  NETWORK_UPDATE,
  APP_SHOULD_RESET,
  SET_READY,
  SET_LOADING,
  FETCH_USER,
  RESET_USER,
  SET_FAQ,
  FETCH_FAQ,
  HEARTBEAT,
  FETCH_CONTRACTS,
  RESET_APP_STATE,
  SET_TUTORIAL_VIEWED,
  FETCH_DISPUTES,
  FETCH_ACTIVITIES
} from "../reducers/types";

import { getWallet, getCurrentContract } from "./Selectors"; // selectors

// Api layouts
import { Faq } from "../api";

// Dapp utilities
import { init } from "../bootstrap/Dapp";

import { log } from "../utils/helpers"; // log helper

// First load
export function* setLoading(loading) {
  log("dispatch", { type: SET_LOADING, payload: loading });
  yield put({ type: SET_LOADING, payload: loading });
}

// Reset
export function* resetAppState() {
  log("dispatch", { type: RESET_APP_STATE });

  yield put({ type: RESET_APP_STATE });
}

// Tutorial viewed
export const setTutorialViewed = () => {
  localStorage.setItem("jur_welcome", true);
  return { type: SET_TUTORIAL_VIEWED };
};

// app loading disable
export function* disableLoading() {
  log("disableLoading", "run");
  yield put({ type: SET_LOADING, payload: false });
  yield put({ type: SET_READY, payload: true });
}

// app handle network update
export function* handleNetworkUpdate(data) {
  log("handleNetworkUpdate", "run");
  log("handleNetworkUpdate - data", data);
  log("handleNetworkUpdate - drizzle", global.drizzle);

  const { web3 } = global.drizzle;
  log("handleNetworkUpdate - web3", web3);

  const { address } = yield select(getWallet);
  log("handleNetworkUpdate - current address", address);
  log("handleNetworkUpdate - current address LOWER", address.toLowerCase());

  const {
    payload: { selectedAddress }
  } = data;
  log("handleNetworkUpdate - network address", selectedAddress);

  // if current address is different from network address
  // should be checked via lowercase due the MetaMask returned value
  // TODO: check if this can be an issue on long term basis
  if (address && address.toLowerCase() !== selectedAddress.toLowerCase()) {

    const { API } = global;
    API.defaults.headers.common['wallet'] = selectedAddress.toLowerCase(); // update wallet in REST API request header

    yield put({ type: SET_LOADING, payload: true });
    yield put({ type: SET_WALLET_ADDRESS, payload: selectedAddress.toLowerCase() });
    yield put({ type: RESET_USER });
    yield put({ type: FETCH_USER });
    yield put({ type: FETCH_CONTRACTS });
    yield put({ type: FETCH_DISPUTES });
    yield put({ type: FETCH_ACTIVITIES });
  }
}

// handle app reset when needed
export function* handleAppReset() {
  const { exit } = global;
  localStorage.setItem("jur_welcome", false);
  yield exit();
}

// handles app initialization
export function* handleAppInit() {
  log("handleAppInit", "run");

  // tutorial info from local storage
  let tutorialViewed = yield localStorage.getItem("jur_welcome");
  log("hadleAppInit - tutorialViewed", tutorialViewed);
  if (typeof tutorialViewed === "undefined" || !tutorialViewed) {
    // handle local storage init
    tutorialViewed = false;
    localStorage.setItem("jur_welcome", tutorialViewed);
  } else if (tutorialViewed === "true") {
    yield put({ type: SET_TUTORIAL_VIEWED });
  }
}

// handles app HeartBeat
export function* handleHeartBeat() {

  console.log('handleHeartBeat');
  

  const currContr = yield select(getCurrentContract);

  log("handleHeartBeat",currContr);

  
}

// handles app initialization
export function* handleFetchFaq() {
  log("handleFetchFaq", Faq.get);
  const response = yield call(Faq.get);
  if (response) yield put({ type: SET_FAQ, payload: response.data });
}

// handles app ready
export function* handleAppReady() {
  yield init();
  yield put({ type: FETCH_FAQ });
  yield put({ type: FETCH_USER });
  yield put({ type: FETCH_CONTRACTS });
  yield put({ type: FETCH_DISPUTES });
  yield put({ type: FETCH_ACTIVITIES });
}

// spawn a new actions task
export default function* appSagas() {
  yield takeEvery(DRIZZLE_INITIALIZING, handleAppInit);
  yield takeLatest(DRIZZLE_INITIALIZED, handleAppReady);
  yield takeEvery(NETWORK_ID_FAILED, disableLoading);
  yield takeLatest(NETWORK_UPDATE, handleNetworkUpdate);
  yield takeLatest(APP_SHOULD_RESET, handleAppReset);
  yield takeLatest(FETCH_FAQ, handleFetchFaq);
  yield takeLatest(HEARTBEAT, handleHeartBeat);
}
