import {
    SET_LOADED,
    RESET_APP_STATE
  } from "./types";

  const INITIAL_STATE = {
    loaded: false
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      // Setters
      case SET_LOADED:
        return { ...state, loaded: true };

      // Reset
      case RESET_APP_STATE:
        return { ...INITIAL_STATE };

      default:
        return state;
    }
  };
