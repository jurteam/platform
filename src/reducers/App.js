import {
  SET_READY,
  SET_LOADING,
  SET_TUTORIAL_VIEWED,
  RESET_APP_STATE
} from "./types";

const INITIAL_STATE = {
  ready: false,
  loading: true,
  tutorial: false
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

    // Reset
    case RESET_APP_STATE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
