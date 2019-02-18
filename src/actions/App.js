import { log } from "./../utils/helpers"; // log helpers
import {
  SET_LOADING,
  RESET_APP_STATE,
  SET_TUTORIAL_VIEWED
} from "./../reducers/types";

// First load
export const setLoading = loading => {
  log("dispatch", { type: SET_LOADING, payload: loading });
  return {
    type: SET_LOADING,
    payload: loading
  };
};

// Reset
export const resetAppState = () => {
  log("dispatch", { type: RESET_APP_STATE });
  return {
    type: RESET_APP_STATE
  };
};

// Tutorial viewed
export const setTutorialViewed = () => {
  log("dispatch", { type: SET_TUTORIAL_VIEWED });
  return {
    type: SET_TUTORIAL_VIEWED
  };
};
