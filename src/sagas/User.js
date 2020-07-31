import { put, call, select, takeEvery, takeLatest } from "redux-saga/effects";
import { push } from "connected-react-router";
import { setLoading } from "./App";

import { dateReducer } from "../utils/helpers"; // helpers

// Api layouts
import { User } from "../api";

import {
  DISCLAIMER_OPTIN,
  DISCLAIMER_VISIBILITY,
  DISCLAIMER_ACCEPTED,
  API_CATCH,
  NEW_USER,
  PUT_USER,
  FETCH_USER,
  USER_UPDATE,
  USER_UPDATING,
  USER_OBLIVION,
  SET_LOADING,
  FETCH_ACTIVITIES,
  SET_USER_ACTIVITIES,
  RESET_USER
} from "../reducers/types"; // action types

import { log } from "../utils/helpers"; // log helper

import { getUser } from "./Selectors"; // selector

export function* handleDisclaimerOptin(args) {
  log("handleDisclaimerOptin", "run");
  log("handleDisclaimerOptin - args", args);

  // handle visibility and API saga
  if (args.optin === false) {
    yield put({ type: USER_OBLIVION }); // user oblivion on disclaimer decline
  } else {
    yield put({ type: DISCLAIMER_VISIBILITY, viewed: true });
    if (
      typeof args.shouldSendActions === "undefined" ||
      args.shouldSendActions === true
    ) {
      yield put({ type: DISCLAIMER_ACCEPTED }); // dispatch this only if needed
    } else if (args.shouldSendActions === false) {
      // Send PUT request to accept disclaimer
      yield call(User.acceptDisclaimer);
    }
  }
}

export function* handleUserOblivion() {
  yield call(User.delete);
  yield put({ type: RESET_USER });
}

export function* apiCatch(err) {
  yield put({ type: API_CATCH, error: err });
}

export function* checkUserExist(action) {
  log("checkUserExist", "run");

  // Looking for existing user
  try {
    const response = yield call(User.get);
    if (response) {
      log("checkUserExist - user exist", response);
      yield put({
        type: DISCLAIMER_OPTIN,
        shouldSendActions: false,
        optin: response.data.user.accepted_disclaimer
      });
      yield put({ type: USER_UPDATE, ...response.data });
    }
  } catch (error) {
    log("checkUserExist - error", error);
    log("checkUserExist - action", action);
    if (error.response) {
      log("checkUserExist - error.response", error.response);
      if (error.response.status === 404) {
        log("checkUserExist - error.response.status", error.response.status);
        put(push("/"));
        // create a new user if missing
        if (action.type === FETCH_USER) {
          log("This is fetch_user action type");
          yield put({ type: SET_LOADING, payload: false }); // only dismiss loading
        } else {
          yield put({ type: NEW_USER }); // create a new user
        }
      }
    } else {
      yield put({ type: API_CATCH, error });
      yield put({ type: USER_UPDATING, payload: false });
    }
  }
}

export function* registerUser(action) {
  log("registerUser", "run");
  log("registerUser - action", action);

  try {
    const response = yield call(User.create, { accepted_disclaimer: true });
    log("registerUser - user created", response);
    yield put({ type: USER_UPDATE, ...response.data });
  } catch (error) {
    yield put({ type: API_CATCH, error });
    yield put({ type: USER_UPDATING, payload: false });
  }
}

export function* handleUserDataUpdate(action) {
  log("handleUserDataUpdate", "run");
  log("handleUserDataUpdate - action", action);

  const {
    disclaimer,
    created_at,
    updated_at,
    id,
    wallet,
    updating,
    accepted_disclaimer,
    accepted_terms,
    ...userData
  } = yield select(getUser);
  const updatedData = {
    ...userData,
    accepted_terms: accepted_terms ? 1 : 0,
    birth_date: dateReducer(userData.birth_date)
  };

  log("handleUserDataUpdate - updatedData", updatedData);

  try {
    const response = yield call(User.update, updatedData);
    log("handleUserDataUpdate - user updated", response);
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }

  yield put({ type: USER_UPDATING, payload: false });
}

export function* fetchActivities(action) {
  log("fetchActivities - action", action);

  try {
    const response = yield call(User.getActivities, { orderBy: "desc" });
    const activities = response.data.data;
    log("fetchActivities - response", response);
    yield put({ type: SET_USER_ACTIVITIES, activities });
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// spawn tasks base certain actions
export default function* userSagas() {
  log("run", "userSagas");
  yield takeEvery(DISCLAIMER_OPTIN, handleDisclaimerOptin);
  yield takeLatest(DISCLAIMER_ACCEPTED, checkUserExist);
  yield takeLatest(NEW_USER, registerUser);
  yield takeLatest(USER_UPDATE, () => setLoading(false));
  yield takeLatest(FETCH_USER, checkUserExist);
  yield takeLatest(FETCH_ACTIVITIES, fetchActivities);
  yield takeLatest(USER_OBLIVION, handleUserOblivion);
  yield takeLatest(PUT_USER, handleUserDataUpdate);
}
