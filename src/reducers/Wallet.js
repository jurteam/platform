import {
  SET_WALLET_ADDRESS,
  RESET_WALLET
} from './types';

const INITIAL_STATE = {
  address: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // Setters
    case SET_WALLET_ADDRESS:
      return { ...state, address: action.payload };

    // Reset
    case RESET_WALLET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
