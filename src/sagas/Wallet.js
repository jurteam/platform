import { put, select, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getDrizzleStatus,
  getWallet
} from "./Selectors";
import {
  DRIZZLE_INITIALIZED,
  SET_BALANCE,
  SET_WALLET_ADDRESS,
  GOT_CONTRACT_VAR
} from "./../reducers/types";

import { log } from "./../utils/helpers" // log helper

// set wallet address from data retrievied via blockchain
export function* setWalletAddress() {
  log("setWalletAddress", "run");
  const accounts = yield select(getAccounts);
  log("setWalletAddress - accounts", accounts);
  yield put({ type: SET_WALLET_ADDRESS, payload: accounts[0] });
}

export function* getBalance(args) {
  log("getBalance", "run");
  log("getBalance - args", args);

  const contract = "JURToken";
  const method = "balanceOf";

  // destructuring call params
  const { type } = args;

  // cache call on address set
  if (type === SET_WALLET_ADDRESS) {

    const drizzleStatus = yield select(getDrizzleStatus, true);
    log("getBalance - drizzleStatus", drizzleStatus);

    if (drizzleStatus.initialized && global.drizzle) {
      const { contracts } = global.drizzle;

      const wallet = yield select(getWallet);

      // Fetch initial value from chain and return cache key for reactive updates.
      yield contracts[contract].methods[method].cacheCall(wallet.address);
    }
  }

  // when contract var is available
  if (type === GOT_CONTRACT_VAR) {
    // destructuring call params
    const { name, variable, value } = args;
    if (name === contract && variable === method) {
      // only if

      yield put({ type: SET_BALANCE, payload: value });
    }
  }
}

// spawn tasks base certain actions
export default function* walletSagas() {
  log("run", "walletSagas");
  yield takeEvery(DRIZZLE_INITIALIZED, setWalletAddress);
  yield takeEvery(SET_WALLET_ADDRESS, getBalance);
  yield takeEvery(GOT_CONTRACT_VAR, getBalance);
}
