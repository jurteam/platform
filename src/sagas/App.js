import { put, takeEvery, select } from "redux-saga/effects";
import {
  DRIZZLE_INITIALIZED,
  SET_WALLET_ADDRESS,
  NETWORK_ID_FAILED,
  SET_READY,
  SET_LOADING,
  NETWORK_UPDATE,
  APP_SHOULD_RESET
} from "./../reducers/types";

import { getWallet } from "./Selectors"; // selectors

// Dapp utilities
import { init } from "./../bootstrap/Dapp";

import { log } from "./../utils/helpers"; // log helper

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

  const { address, hash } = yield select(getWallet);
  log("handleNetworkUpdate - current address", address);
  log("handleNetworkUpdate - current address LOWER", address.toLowerCase());

  const {
    payload: { selectedAddress }
  } = data;
  log("handleNetworkUpdate - network address", selectedAddress);

  // if current address is different from network address
  // should be checked via lowercase due the MetaMask returned value
  // TODO: check if this can be an issue on long term basis
  if (address && address.toLowerCase() !== selectedAddress) {
    yield put({ type: APP_SHOULD_RESET });
    yield put({ type: SET_WALLET_ADDRESS, payload: selectedAddress });
  }
}

// spawn a new actions task
export default function* appSagas() {
  yield takeEvery(DRIZZLE_INITIALIZED, disableLoading);
  yield takeEvery(DRIZZLE_INITIALIZED, init);
  yield takeEvery(NETWORK_ID_FAILED, disableLoading);
  yield takeEvery(NETWORK_UPDATE, handleNetworkUpdate);
}
