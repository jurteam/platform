import {
  DISCLAIMER_OPTIN,
  RESET_USER
} from "./types"; // action types

const INITIAL_STATE = {
  disclaimer: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case DISCLAIMER_OPTIN:
      return { ...state, disclaimer: action.optin };

    // Reset
    case RESET_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
