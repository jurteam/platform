import { put, takeEvery } from "redux-saga/effects";

// Our worker Saga: will perform the async increment task
export function* setWalletAddress() {
  console.log("run", "setWallet");
  yield put({ type: "SET_WALLET" });
}

// Our worker Saga: will perform the async increment task
export function* refreshOnWalletChange() {
  console.log("run", "refreshOnWalletChange");
  // yield window.location.reload();
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export default function* walletSagas() {
  console.log("run", "walletSagas");
  yield takeEvery("DRIZZLE_INITIALIZED", refreshOnWalletChange);
}
