import { SET_WALLET_ADDRESS, SET_BALANCE, RESET_WALLET } from "./types";

const INITIAL_STATE = {
  address: null,
  balance: 0,
  hash: null,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_WALLET_ADDRESS:
      return { ...state, address: action.payload.toLowerCase() }; // always lower case
      // TODO: should be checked if is a issue when using another provider instead of Metamask

    case SET_BALANCE:
      return { ...state, balance: action.amount, hash: action.argsHash };

    // Reset
    case RESET_WALLET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
