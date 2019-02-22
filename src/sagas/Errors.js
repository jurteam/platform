import { put, select, takeEvery } from "redux-saga/effects";

import { API_CATCH } from "../reducers/types"; // action types

import { log } from "../utils/helpers"; // log helper

export function* handleApiErrors(action) {
  const { type, error } = action;
  yield log("handleApiErrors - action", action);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    log("handleApiErrors - error.response.data", error.response.data);
    log("handleApiErrors - error.response.status", error.response.status);
    log("handleApiErrors - error.response.headers", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    log("handleApiErrors - error.request", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    log("handleApiErrors - error.message", error.message);
  }
  log("handleApiErrors - error.config", error.config);
}

// spawn tasks base certain actions
export default function* errorsSagas() {
  log("run", "errorsSagas");
  yield takeEvery(API_CATCH, handleApiErrors);
}
