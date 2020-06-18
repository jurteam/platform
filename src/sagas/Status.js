import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { shareOn } from "../api/Status";
import { getStatusSharebles } from "./Selectors";
import { STATUS_SHARE } from "../reducers/types";

function* shareStatus() {
  console.log("Status saga shareStatus");
  const { shareNetwork, shareText } = yield select(getStatusSharebles);
  yield shareOn(shareNetwork, shareText);
}

export default function* Status() {
  yield takeLatest(STATUS_SHARE, shareStatus);
}
