import {
    SET_LOADED,
    SET_TUTORIAL_VIEWED,
    RESET_APP_STATE
  } from "./types";

  const INITIAL_STATE = {
    loaded: false,
    tutorial: false
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      // Setters
      case SET_LOADED:
        return { ...state, loaded: true };

      case SET_TUTORIAL_VIEWED:
        return { ...state, tutorial: true };

      // Reset
      case RESET_APP_STATE:
        return { ...INITIAL_STATE };

      default:
        return state;
    }
  };
