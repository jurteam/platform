import { put, select, takeLatest } from "redux-saga/effects";

import { API_CATCH, SET_LOADING } from "../reducers/types"; // action types

import { log, warn } from "../utils/helpers"; // log helper

export function* handleApiErrors(action) {
  const { type, error } = action;

  yield log("handleApiErrors - action", action);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    log("handleApiErrors - error.response.data", error.response.data);
    log("handleApiErrors - error.response.status", error.response.status);
    log("handleApiErrors - error.response.headers", error.response.headers);

    // Handle all status codes
    const { response:{status}} = error;

    if (status === 400) {
      warn('Bad request, often due to missing a required parameter.');
    } else if (status === 401) {
      warn('No valid Wallet provided.');
    } else if (status === 404) {
      warn('The requested resource doesn\'t exist.');
    }

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

  yield put({ type: SET_LOADING, payload: false });
}

// spawn tasks base certain actions
export default function* errorsSagas() {
  log("run", "errorsSagas");
  yield takeLatest(API_CATCH, handleApiErrors);
}
