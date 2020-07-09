import { takeLatest, put, select } from "redux-saga/effects";
import {
  shareOn,
  advocates,
  available,
  yourActivities,
  rewards
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
  ADVOCATE_MESSAGE
} from "../reducers/types";
import { copyToClipboard } from "../utils/AdvocateHelpers";

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getSocialSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchAdvocate(action) {
  let address = action.payload && action.payload.address;

  if (!address) {
    alert("From Wallet " + address);
    const wallet = yield select(getWallet);
    address = wallet.address;
  }
  const res = yield advocates(address);

  const payload = {
    advocate: res.data.attributes,
    advocateMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_PROFILE, payload });
}

function* fetchAdvocates() {
  const res = yield advocates();

  const payload = {
    advocates: res.data,
    advocatesMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_ALL, payload });
}

function* fetchAvailable() {
  const { address } = yield select(getWallet);
  const res = yield available(address);

  const payload = {
    available: res.data,
    availableMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_AVAILABLE, payload });
}

function* fetchYourActivities() {
  const { address } = yield select(getWallet);
  const res = yield yourActivities(address);

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

  const res = yield rewards(address);

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
        payload: action.payload
      });

      global.store.dispatch({
        type: ADVOCATE_FETCH_REWARDS,
        payload: { page: pagination.current_page || 1 }
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

      global.store.dispatch({
        type: ADVOCATE_FETCH_YOUR_ACTIVITIES,
        payload: { page: pagination.current_page || 1 }
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
}
