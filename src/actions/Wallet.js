import { log } from "../utils/helpers"; // log helpers

// Web3 dapp utilities
import { web3 } from "../bootstrap/Dapp";

import {
  RESET_WALLET
} from "../reducers/types";

// Reset
export const resetWallet = () => ({
  type: RESET_WALLET
});

// Accounts
export const fetchAccounts = () => {
  return dispatch => {
    web3.eth.getAccounts((err, accounts) => {
      log("fetchAccounts", { accounts, err }); // logs

      // dispatch({ type: SET_WALLET_ADDRESS, payload: accounts[0] });
    });
  };
};
