import {
  DISCLAIMER_OPTIN,
  DISCLAIMER_VISIBILITY,
  USER_UPDATE,
  UPDATE_USER_FIELD,
  USER_UPDATING,
  RESET_USER,
  FETCH_USER,
  NEW_USER,
  PUT_USER
} from "./types"; // action types

const INITIAL_STATE = {
  disclaimer: {
    optin: false,
    viewed: false
  },
  updating: false,
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
      return { ...state, ...action.user, updating: false };

    case USER_UPDATING:
      return { ...state, updating: action.payload };

    // Updates
    case UPDATE_USER_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      console.log(UPDATE_USER_FIELD, toUpdate);
      return { ...state, ...toUpdate };

    // Fetching
    case FETCH_USER:
    case NEW_USER:
    case PUT_USER:
      return { ...state, updating: true };

    // Reset
    case RESET_USER:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
