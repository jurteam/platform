import {
  SET_WALLET_ADDRESS,
  SET_BALANCE,
  RESET_WALLET
} from "./types";

const INITIAL_STATE = {
  address: null,
  balance: 0,
  user: {}
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    // Setters
    case SET_WALLET_ADDRESS:
      return { ...state, address: action.payload };

    case SET_BALANCE:
      return { ...state, balance: action.payload };

    // Reset
    case RESET_WALLET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
