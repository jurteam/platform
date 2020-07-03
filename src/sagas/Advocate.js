import { takeLatest, put, select } from "redux-saga/effects";
import { shareOn, advocates } from "../api/Advocate";
import { statusUrlOf } from "JurUtils/AdvocateHelpers";
import { getSocialSharebles, getWallet } from "./Selectors";
import {
  ADVOCATE_SHARE,
  ADVOCATE_FETCH_MINE,
  ADVOCATE_UPDATE_MINE,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_FETCH_ALL
} from "../reducers/types";

function* shareStatus() {
  const { shareNetwork, shareText, address } = yield select(getSocialSharebles);
  yield shareOn(shareNetwork.value, shareText, statusUrlOf(address));
}

function* fetchMyAdvocasy() {
  const { address } = yield select(getWallet);
  // const payload = yield advocates(address);
  const payload = {
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
  yield put({ type: ADVOCATE_UPDATE_MINE, payload });
}

function* fetchAdvocates() {
  const { data, meta } = yield advocates();
  // const payload = {
  //   advocates: data,
  //   advocatesMeta: meta
  // };
  const payload = {
    advocatesMeta: {
      pagination: {
        // Everything is optional in `pagination` except `total`
        total: 100,
        count: 100,
        per_page: 10, // DEFAULT: 5
        current_page: 1,
        total_pages: 10
      }
    },
    advocates: [
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
  yield put({ type: ADVOCATE_UPDATE_ALL, payload });
}

export default function* Status() {
  yield takeLatest(ADVOCATE_SHARE, shareStatus);
  yield takeLatest(ADVOCATE_FETCH_MINE, fetchMyAdvocasy);
  yield takeLatest(ADVOCATE_FETCH_ALL, fetchAdvocates);
}
