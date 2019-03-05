import {
  DISCLAIMER_OPTIN,
  DISCLAIMER_VISIBILITY,
  USER_UPDATE,
  RESET_USER
} from "./types"; // action types

const INITIAL_STATE = {
  disclaimer: {
    optin: false,
    viewed: false
  },
  id: null,
  name: null,
  email: null,
  wallet: null,
  birth_date: null,
  gender: null,
  location: null,
  category: null,
  show_fullname: null,
  accepted_terms: null,
  accepted_disclaimer: null,
  created_at: null,
  updated_at: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case DISCLAIMER_OPTIN:
      return {
        ...state,
        disclaimer: { ...state.disclaimer, optin: action.optin }
      };

    case DISCLAIMER_VISIBILITY:
      return {
        ...state,
        disclaimer: { ...state.disclaimer, viewed: action.viewed }
      };

    case USER_UPDATE:
      return { ...state, ...action.user };

    // Reset
    case RESET_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
