import {
  SET_READY,
  SET_LOADING,
  SET_TUTORIAL_VIEWED,
  RESET_APP_STATE,
  NETWORK_UPDATE,
  SET_FAQ,
  APP_SET_LABELS
} from "./types";

const INITIAL_STATE = {
  ready: false,
  loading: true,
  tutorial: false,
  faqs: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_READY:
      return { ...state, ready: action.payload };

    case SET_TUTORIAL_VIEWED:
      return { ...state, tutorial: true };

    case SET_FAQ:
      return { ...state, faqs: action.payload.faqs };

    case APP_SET_LABELS:
      return { ...state, labels: action.payload };

    // Reset
    case RESET_APP_STATE:
      return { ...INITIAL_STATE };

    case NETWORK_UPDATE: // saga
    default:
      return state;
  }
};
