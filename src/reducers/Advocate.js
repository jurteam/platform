import {
  ADVOCATE_CHANGE_SHARE_NETWORK,
  ADVOCATE_SHARE,
  ADVOCATE_CHANGE_SHARE_TEXT,
  ADVOCATE_FETCH_MINE,
  ADVOCATE_UPDATE_MINE,
  ADVOCATE_FETCH_ALL,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_UPDATE_AVAILABLE,
  ADVOCATE_UPDATE_YOUR_ACTIVITIES,
  ADVOCATE_UPDATE_REWARDS
} from "./types";
import { SOCIAL_NETWORK_OPTIONS } from "../utils/AdvocateHelpers";

const INITIAL_STATE = {
  advocate: {
    rewardsBalance: "na",
    totalEarned: "na",
    totalAvailable: "na"
  },
  advocateMeta: { isAdvocate: true },
  advocates: [],
  advocatesMeta: { pagination: {} },
  available: [],
  availableMeta: { pagination: {} },
  yourActivities: [],
  yourActivitiesMeta: { pagination: {} },
  rewards: [],
  rewardsMeta: { pagination: {} },
  isFetching: true,
  shareText:
    "I am an Advocate in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework",
  isSharing: false,
  shareNetwork: SOCIAL_NETWORK_OPTIONS[0]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADVOCATE_CHANGE_SHARE_NETWORK:
      return { ...state, shareNetwork: action.payload };
    case ADVOCATE_CHANGE_SHARE_TEXT:
      return { ...state, shareText: action.payload };
    case ADVOCATE_SHARE:
      return { ...state, isSharing: true };
    case ADVOCATE_FETCH_MINE:
      return { ...state, isFetching: true };
    case ADVOCATE_UPDATE_MINE:
      return { ...state, isFetching: false, ...action.payload };
    case ADVOCATE_FETCH_ALL:
      return { ...state, isFetchingadvocates: true };
    case ADVOCATE_UPDATE_ALL:
      return { ...state, isFetchingadvocates: false, ...action.payload };
    case ADVOCATE_UPDATE_AVAILABLE:
      return { ...state, ...action.payload };
    case ADVOCATE_UPDATE_YOUR_ACTIVITIES:
      return { ...state, ...action.payload };
    case ADVOCATE_UPDATE_REWARDS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
