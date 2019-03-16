import { call, takeLatest } from "redux-saga/effects";
import { setLoading } from "./App";

// Api layouts
import { Media } from "../api";

import { MEDIA_UPLOAD } from "../reducers/types"; // action types

import { log, warn } from "../utils/helpers"; // log helper

export function* handleMediaUpload(action) {
  log("handleMediaUpload - action", action);
  const { type, ...data } = action; // destructuring data out of received action
  yield call(Media.store, data);
}

// spawn tasks base certain actions
export default function* mediaSagas() {
  log("run", "mediaSagas");
  yield takeLatest(MEDIA_UPLOAD, handleMediaUpload);
}
