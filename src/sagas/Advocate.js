import { takeLatest, put, select, call } from "redux-saga/effects";
import {
  shareOn,
  advocates,
  available,
  yourActivities,
  rewards,
  updateBio
} from "../api/Advocate";
import { statusUrlOf } from "JurUtils/AdvocateHelpers";
import { RewardConnex } from "../api";
import {
  getSocialSharebles,
  getWallet,
  getAdvocateRewardsPagination,
  getAdvocateYourActivitiesPagination,
  getShareText
} from "./Selectors";
import {
  ADVOCATE_SHARE,
  ADVOCATE_FETCH_PROFILE,
  ADVOCATE_UPDATE_PROFILE,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_FETCH_ALL,
  LOOKUP_WALLET_BALANCE,
  ADVOCATE_FETCH_AVAILABLE,
  ADVOCATE_UPDATE_AVAILABLE,
  ADVOCATE_FETCH_YOUR_ACTIVITIES,
  ADVOCATE_UPDATE_YOUR_ACTIVITIES,
  ADVOCATE_FETCH_REWARDS,
  ADVOCATE_UPDATE_REWARDS,
  ADVOCATE_WITHDRAW,
  ADVOCATE_RESET_WITHDRAW,
  ADVOCATE_REWARD,
  HOUND_START_SMELLING,
  ADVOCATE_COMPLETE_SLOT,
  ADVOCATE_RESET_SLOT,
  ADVOCATE_MARK_SLOT,
  ADVOCATE_COPY,
  ADVOCATE_MESSAGE,
  ADVOCATE_UPDATE_BIO,
  API_CATCH,
  ADVOCATE_UPDATE_BIO_SUCCEEDED
} from "../reducers/types";
import { copyToClipboard } from "../utils/AdvocateHelpers";

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getSocialSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchAdvocate(action) {
  const wallet = yield select(getWallet);
  let address = action.payload && action.payload.address;

  if (!address) {
    address = wallet.address;
  }

  const res = yield advocates(address);

  const payload = {
    advocate: res.data.attributes,
    advocateMeta: res.meta,
    shareText: computeShareText(address, wallet, res)
  };

  yield put({ type: ADVOCATE_UPDATE_PROFILE, payload });
}

function computeShareText(address, wallet, res) {
  const prefix =
    address === wallet.address
      ? "I am"
      : (res.data.attributes.name || address) + " is";
  return (
    prefix +
    " an Advocate in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework"
  );
}

function* fetchAdvocates(action) {
  const res = yield advocates(null, action.payload);

  const payload = {
    advocates: res.data,
    advocatesMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_ALL, payload });
}

function* fetchAvailable(action) {
  const { address } = yield select(getWallet);
  const res = yield available(address, action.payload);

  const payload = {
    available: res.data,
    availableMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_AVAILABLE, payload });
}

function* fetchYourActivities(action) {
  const { address } = yield select(getWallet);
  const res = yield yourActivities(address, action.payload);

  const payload = {
    yourActivities: res.data,
    yourActivitiesMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_YOUR_ACTIVITIES, payload });
}

function* fetchRewards(action) {
  let address = action.payload && action.payload.address;

  if (!address) {
    const wallet = yield select(getWallet);
    address = wallet.address;
  }

  const res = yield rewards(address, action.payload);

  const payload = {
    rewards: res.data,
    rewardsMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_REWARDS, payload });
}

function* withdraw(action) {
  const { address } = yield select(getWallet);
  const pagination = yield select(getAdvocateRewardsPagination);
  const { activityScId, slotScId } = action.payload;

  try {
    const prey = yield new RewardConnex().withdrawReward(
      address,
      activityScId,
      slotScId
    );

    prey.onFound = () => {
      global.store.dispatch({
        type: ADVOCATE_REWARD,
        payload: { ...action.payload, rewardedOn: new Date().getTime() / 1000 }
      });

      global.store.dispatch({ type: LOOKUP_WALLET_BALANCE });
    };

    yield put({ type: HOUND_START_SMELLING, payload: prey });
  } catch (e) {
    console.error("Failed to withdraw a reward", action.payload, e);
    yield put({
      type: ADVOCATE_RESET_WITHDRAW,
      error: e,
      payload: {
        ...action.payload,
        message: e.message
      }
    });
  }
}

function* markComplete(action) {
  const { address } = yield select(getWallet);
  const pagination = yield select(getAdvocateYourActivitiesPagination);
  const { activityScId, slotScId } = action.payload;

  try {
    const prey = yield new RewardConnex().markSlotComplete(
      address,
      activityScId,
      slotScId
    );

    prey.onFound = () => {
      global.store.dispatch({
        type: ADVOCATE_COMPLETE_SLOT,
        payload: action.payload
      });

      global.store.dispatch({ type: LOOKUP_WALLET_BALANCE });
    };

    yield put({ type: HOUND_START_SMELLING, payload: prey });
  } catch (e) {
    console.error("Failed to mark a slot complete", action.payload, e);
    yield put({
      type: ADVOCATE_RESET_SLOT,
      error: e,
      payload: {
        ...action.payload,
        message: e.message
      }
    });
  }
}

function* copy() {
  const text = yield select(getShareText);
  copyToClipboard(text);
  yield put({ type: ADVOCATE_MESSAGE, payload: "Copied!" });
}

function* updateBioSaga(action) {
  try {
    const response = yield call(
      updateBio,
      action.payload.bio,
      action.payload.address
    );

    yield put({
      type: ADVOCATE_UPDATE_BIO_SUCCEEDED,
      payload: response
    });
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

export default function* Status() {
  yield takeLatest(ADVOCATE_SHARE, shareStatus);
  yield takeLatest(ADVOCATE_FETCH_PROFILE, fetchAdvocate);
  yield takeLatest(ADVOCATE_FETCH_ALL, fetchAdvocates);
  yield takeLatest(ADVOCATE_FETCH_AVAILABLE, fetchAvailable);
  yield takeLatest(ADVOCATE_FETCH_YOUR_ACTIVITIES, fetchYourActivities);
  yield takeLatest(ADVOCATE_FETCH_REWARDS, fetchRewards);
  yield takeLatest(ADVOCATE_WITHDRAW, withdraw);
  yield takeLatest(ADVOCATE_MARK_SLOT, markComplete);
  yield takeLatest(ADVOCATE_COPY, copy);
  yield takeLatest(ADVOCATE_UPDATE_BIO, updateBioSaga);
}
