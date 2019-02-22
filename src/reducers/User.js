import { DISCLAIMER_OPTIN, DISCLAIMER_VISIBILITY, RESET_USER } from "./types"; // action types

const INITIAL_STATE = {
  disclaimer: {
    optin: false,
    viewed: false
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case DISCLAIMER_OPTIN:
      return { ...state, disclaimer: { ...state.disclaimer, optin: action.optin } };

    case DISCLAIMER_VISIBILITY:
      return { ...state, disclaimer: { ...state.disclaimer, viewed: action.viewed } };

    // Reset
    case RESET_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
