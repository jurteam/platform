import { put, select, takeEvery } from "redux-saga/effects";
import {
  getAccounts,
  getDrizzleStatus,
  getJURToken,
  getWallet
} from "./Selectors";
import {
  DRIZZLE_INITIALIZED,
  GOT_CONTRACT_VAR,
  SET_BALANCE,
  SET_WALLET_ADDRESS,
  RESET_WALLET,
  LOOKUP_WALLET_BALANCE
} from "../reducers/types";

import { log } from "../utils/helpers"; // log helper
import { callToContract /*, checkDrizzleInit*/ } from "../utils/sc";

// Reset
export function* resetWallet() {
  yield put({ type: RESET_WALLET });
}

// set wallet address from data retrievied via blockchain
export function* setWalletAddress() {
  log("setWalletAddress", "run");
  const accounts = yield select(getAccounts);
  log("setWalletAddress - accounts", accounts);
  const { API } = global;
  if (typeof API !== 'undefined')
  {
    API.defaults.headers.common['wallet'] = accounts[0].toLowerCase(); // update wallet in REST API request header
    yield put({ type: SET_WALLET_ADDRESS, payload: accounts[0] });
  }
}

export function* handleLookupWalletBalance(args) {

  // // Check if Drizzle is initialized
  // const check = checkDrizzleInit();
  // if (!check) { return false; }

  log("handleLookupWalletBalance", "run");

  const wallet = yield select(getWallet);

  // it will sync automatically token balance using Drizzle fresh data
  const jurTokenBalance = yield callToContract("JURToken", "balanceOf", [wallet.address]);

  if (typeof jurTokenBalance !== 'undefined' && jurTokenBalance) {
    yield put({
      type: SET_BALANCE,
      amount: jurTokenBalance
    })
  }
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
    const drizzleStatus = yield select(getDrizzleStatus);
    log("getBalance - drizzleStatus", drizzleStatus);

    if (drizzleStatus.initialized && global.drizzle) {
      const { contracts } = global.drizzle;

      const wallet = yield select(getWallet);

      // Fetch initial value from chain and return cache key for reactive updates.
      const dataKey = yield contracts[contract].methods[method].cacheCall(
        wallet.address
      );

      // If hash retrived and set balanche only if there is already a value in store
      if (dataKey) {
        const JURToken = yield select(getJURToken);

        if (JURToken.balanceOf[dataKey]) {
          yield put({
            type: SET_BALANCE,
            amount: JURToken.balanceOf[dataKey].value,
            argsHash: dataKey
          });
        }
      }
    }
  }

  // when contract var is available
  if (type === GOT_CONTRACT_VAR) {
    // destructuring call params
    const { name, variable, value, argsHash } = args;
    if (name === contract && variable === method) {
      // only if

      yield put({ type: SET_BALANCE, amount: value, argsHash });
    }
  }
}

// spawn tasks base certain actions
export default function* walletSagas() {
  log("run", "walletSagas");
  yield takeEvery(DRIZZLE_INITIALIZED, setWalletAddress);
  yield takeEvery(SET_WALLET_ADDRESS, getBalance);
  yield takeEvery(GOT_CONTRACT_VAR, getBalance);
  yield takeEvery(LOOKUP_WALLET_BALANCE, handleLookupWalletBalance);
}
