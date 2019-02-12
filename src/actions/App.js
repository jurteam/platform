import { log } from "./../utils/helpers"; // log helpers
import { SET_LOADED, RESET_APP_STATE, SET_TUTORIAL_VIEWED } from "./../reducers/types";

// First load
export const setLoaded = () => {
  log("dispatch", {type: SET_LOADED});
  return {
    type: SET_LOADED
  };
};

// Reset
export const resetAppState = () => {
  log("dispatch", {type: RESET_APP_STATE});
  return {
    type: RESET_APP_STATE
  };
};

// Tutorial viewed
export const setTutorialViewed = () => {
  log("dispatch", {type: SET_TUTORIAL_VIEWED});
  return {
    type: SET_TUTORIAL_VIEWED
  };
};
