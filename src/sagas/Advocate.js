import { takeLatest, put, select } from "redux-saga/effects";
import { shareOn, advocates, available } from "../api/Advocate";
import { statusUrlOf } from "JurUtils/AdvocateHelpers";
import { getSocialSharebles, getWallet } from "./Selectors";
import {
  ADVOCATE_SHARE,
  ADVOCATE_FETCH_MINE,
  ADVOCATE_UPDATE_MINE,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_FETCH_ALL,
  ADVOCATE_FETCH_AVAILABLE,
  ADVOCATE_UPDATE_AVAILABLE,
  ADVOCATE_FETCH_YOUR_ACTIVITIES,
  ADVOCATE_UPDATE_YOUR_ACTIVITIES,
  ADVOCATE_FETCH_REWARDS,
  ADVOCATE_UPDATE_REWARDS
} from "../reducers/types";

const PaginationJson = {
  // Everything is optional in `pagination` except `total`
  total: 100,
  count: 100,
  per_page: 10, // DEFAULT: 5
  current_page: 1,
  total_pages: 10
};

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getSocialSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchMyAdvocasy() {
  const { address } = yield select(getWallet);
  // const res = yield advocates(address);

  const res = {
    meta: {
      isAdvocate: true
    },
    data: {
      id: address,
      type: "advocates", // OR "users" in case not advocate
      attributes: {
        address: address,
        statusType: "Normal",
        activationTime: new Date().getTime(), // OR skip/null in case not holder
        country: "IN", // OPTIONAL
        linkedIn: "http://linkedin.com", // OPTIONAL,
        url: "http://about.me", // OPTIONAL,
        bio: "I'm a mock data. Not coming from server",
        rewardsBalance: 123,
        totalEarned: 243,
        totalAvailable: 1092 // PRIVATE
      }
    }
  };

  const payload = {
    advocate: res.data.attributes,
    advocateMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_MINE, payload });
}

function* fetchAdvocates() {
  // const res = yield advocates();
  const res = {
    meta: {
      pagination: PaginationJson
    },
    data: [
      {
        id: "0xdF1517295e5Ea4A2f6eCA4E74F339be0207Fe031",
        type: "advocates",
        attributes: {
          address: "0xdF1517295e5Ea4A2f6eCA4E74F339be0207Fe031",
          statusType: "Normal",
          totalEarned: 16
        }
      },
      {
        id: "0xE3DF6d92821d0911b59F2c4F0FaF09A7F7cB54dD",
        type: "advocates",
        attributes: {
          address: "0xE3DF6d92821d0911b59F2c4F0FaF09A7F7cB54dD",
          statusType: "Normal",
          totalEarned: 123
        }
      }
    ]
  };

  const payload = {
    advocates: res.data,
    advocatesMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_ALL, payload });
}

function* fetchAvailable() {
  const { address } = yield select(getWallet);
  // const res = yield available(address);
  const res = {
    meta: {
      pagination: PaginationJson
    },
    data: [
      {
        id: 12,
        type: "activities",
        attributes: {
          name: "Mock Activity",
          rewardAmount: 123,
          slotAssigned: 2,
          slotTotal: 5
        }
      },
      {
        id: 13,
        type: "activities",
        attributes: {
          name: "Mock Activity 2",
          rewardAmount: 13,
          slotAssigned: 1,
          slotTotal: 5
        }
      }
    ]
  };

  const payload = {
    available: res.data,
    availableMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_AVAILABLE, payload });
}

function* fetchYourActivities() {
  const { address } = yield select(getWallet);
  // const res = yield available(address);
  const res = {
    meta: {
      pagination: PaginationJson
    },
    data: [
      {
        id: 12,
        type: "activities",
        attributes: {
          name: "Mock Your Activity",
          rewardAmount: 676,
          dueDate: new Date().getTime(),
          state: "Cancelled"
        }
      },
      {
        id: 13,
        type: "activities",
        attributes: {
          name: "Mock Your Activity 2",
          rewardAmount: 13,
          dueDate: new Date().getTime(),
          state: "Completed"
        }
      }
    ]
  };

  const payload = {
    yourActivities: res.data,
    yourActivitiesMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_YOUR_ACTIVITIES, payload });
}

function* fetchRewards() {
  const { address } = yield select(getWallet);
  // const res = yield available(address);
  const res = {
    meta: {
      pagination: PaginationJson
    },
    data: [
      {
        id: 12,
        type: "rewards",
        attributes: {
          name: "Mock Your Activity",
          rewardAmount: 6,
          dueDate: new Date().getTime(),
          rewardedOn: new Date().getTime()
        }
      },
      {
        id: 13,
        type: "rewards",
        attributes: {
          name: "Mock Your Activity 2",
          rewardAmount: 1003,
          dueDate: new Date().getTime(),
          rewardedOn: new Date().getTime()
        }
      }
    ]
  };

  const payload = {
    rewards: res.data,
    rewardsMeta: res.meta
  };

  yield put({ type: ADVOCATE_UPDATE_REWARDS, payload });
}

export default function* Status() {
  yield takeLatest(ADVOCATE_SHARE, shareStatus);
  yield takeLatest(ADVOCATE_FETCH_MINE, fetchMyAdvocasy);
  yield takeLatest(ADVOCATE_FETCH_ALL, fetchAdvocates);
  yield takeLatest(ADVOCATE_FETCH_AVAILABLE, fetchAvailable);
  yield takeLatest(ADVOCATE_FETCH_YOUR_ACTIVITIES, fetchYourActivities);
  yield takeLatest(ADVOCATE_FETCH_REWARDS, fetchRewards);
}
