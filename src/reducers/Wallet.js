import {
  SET_WALLET_ADDRESS,
  SET_WALLET_CONNECTION,
  RESET_WALLET
} from "./types";

const INITIAL_STATE = {
  address: null,
  isConnected: false,
  user: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_WALLET_ADDRESS:
      return { ...state, address: action.payload };

    case SET_WALLET_CONNECTION:
      return { ...state, isConnected: action.payload };

    // Reset
    case RESET_WALLET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
