import { log } from "../utils/helpers"; // log helpers

// Web3 dapp utilities
import { web3 } from "../bootstrap/Dapp";

import { SET_WALLET_ADDRESS } from "../reducers/types";

// Accounts
export const fetchAccounts = () => {
  return dispatch => {
    web3.eth.getAccounts((err, accounts) => {
      log('fetchAccounts', { accounts, err }); // logs

      dispatch({ type: SET_WALLET_ADDRESS, payload: accounts[0] });
    });
  };
};
