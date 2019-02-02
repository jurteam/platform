import { SET_LOADED, RESET_APP_STATE } from "../reducers/types";

// First load
export const setLoaded = () => {
  return {
    type: SET_LOADED
  };
};

// Reset
export const resetAppState = () => {
  return {
    type: RESET_APP_STATE
  };
};
