import { log } from "../utils/helpers"; // log helpers

// Web3 dapp utilities
import { web3 } from "../bootstrap/Dapp";

import { SET_WALLET_ADDRESS, SET_WALLET_CONNECTION } from "../reducers/types";

// Setters
export const setWalletAddress = address => ({
  type: SET_WALLET_ADDRESS,
  payload: address
});
export const setWalletConnection = status => ({
  type: SET_WALLET_CONNECTION,
  payload: status
});

// Accounts
export const fetchAccounts = () => {
  return dispatch => {
    web3.eth.getAccounts((err, accounts) => {
      log('fetchAccounts', { accounts, err }); // logs

      dispatch({ type: SET_WALLET_ADDRESS, payload: accounts[0] });
    });
  };
};
