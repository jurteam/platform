import {
  ADVOCATE_CHANGE_SHARE_NETWORK,
  ADVOCATE_SHARE,
  ADVOCATE_CHANGE_SHARE_TEXT,
  ADVOCATE_UPDATE_PROFILE,
  ADVOCATE_RESET_PROFILE,
  ADVOCATE_FETCH_ALL,
  ADVOCATE_UPDATE_ALL,
  ADVOCATE_UPDATE_AVAILABLE,
  ADVOCATE_UPDATE_YOUR_ACTIVITIES,
  ADVOCATE_UPDATE_REWARDS,
  ADVOCATE_WITHDRAW,
  ADVOCATE_REWARD,
  ADVOCATE_RESET_WITHDRAW,
  ADVOCATE_MARK_SLOT,
  ADVOCATE_COMPLETE_SLOT,
  ADVOCATE_RESET_SLOT,
  ADVOCATE_TOGGLE_AVAILABLE,
  ADVOCATE_MESSAGE,
  ADVOCATE_FETCH_PROFILE,
  ADVOCATE_UPDATE_BIO_SUCCEEDED,
  ADVOCATE_HIDE_DISCLAIMER,
  ADVOCATE_SHOW_DISCLAIMER
} from "./types";
import {
  SOCIAL_NETWORK_OPTIONS,
  makeKey,
  setSlotState
} from "../utils/AdvocateHelpers";

const INITIAL_ADVOCATE_STATE = {
  isFetching: true,
  advocate: {
    rewardsBalance: "na",
    totalEarned: "na",
    totalAvailable: "na"
  },
  advocateMeta: { isAdvocate: false },
  rewards: [],
  rewardsMeta: { pagination: {} }
};

const INITIAL_STATE = {
  ...INITIAL_ADVOCATE_STATE,
  isAvailableShown: true,
  advocates: [],
  advocatesMeta: { pagination: {} },
  available: [],
  availableMeta: { pagination: {} },
  yourActivities: [],
  yourActivitiesMeta: { pagination: {} },
  withdraws: {},
  slotMarks: {},
  shareText:
    "I am an Advocate in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework",
  isSharing: false,
  shareNetwork: SOCIAL_NETWORK_OPTIONS[0],
  showDisclaimer: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADVOCATE_SHOW_DISCLAIMER:
      return { ...state, showDisclaimer: true, isFetching: false };
    case ADVOCATE_HIDE_DISCLAIMER:
      return { ...state, showDisclaimer: false };
    case ADVOCATE_TOGGLE_AVAILABLE:
      return { ...state, isAvailableShown: !state.isAvailableShown };
    case ADVOCATE_CHANGE_SHARE_NETWORK:
      return { ...state, shareNetwork: action.payload };
    case ADVOCATE_CHANGE_SHARE_TEXT:
      return { ...state, shareText: action.payload };
    case ADVOCATE_SHARE:
      return { ...state, isSharing: true };
    case ADVOCATE_MESSAGE:
      return { ...state, message: action.payload };
    case ADVOCATE_FETCH_PROFILE:
      return { ...state, isFetching: true };
    case ADVOCATE_UPDATE_PROFILE:
      return {
        ...state,
        isFetching: false,
        ...action.payload
      };
    case ADVOCATE_RESET_PROFILE:
      return { ...state, ...INITIAL_ADVOCATE_STATE };
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
    case ADVOCATE_WITHDRAW:
      return {
        ...state,
        withdraws: {
          ...state.withdraws,
          [makeKey(action.payload)]: true
        }
      };
    case ADVOCATE_REWARD:
      const rewardAmount = Number(action.payload.rewardAmount);
      const rewardsBalance = state.advocate.rewardsBalance - rewardAmount;
      const totalEarned = state.advocate.totalEarned + rewardAmount;

      return {
        ...state,
        rewards: setSlotState("Rewarded", action.payload, state.rewards),
        advocate: { ...state.advocate, rewardsBalance, totalEarned },
        withdraws: {
          ...state.withdraws,
          [makeKey(action.payload)]: false
        }
      };
    case ADVOCATE_RESET_WITHDRAW:
      return {
        ...state,
        withdraws: {
          ...state.withdraws,
          [makeKey(action.payload)]: false
        }
      };
    case ADVOCATE_MARK_SLOT:
      return {
        ...state,
        slotMarks: {
          ...state.slotMarks,
          [makeKey(action.payload)]: true
        }
      };
    case ADVOCATE_COMPLETE_SLOT:
      return {
        ...state,
        yourActivities: setSlotState(
          "Completed",
          action.payload,
          state.yourActivities
        ),
        slotMarks: {
          ...state.slotMarks,
          [makeKey(action.payload)]: false
        }
      };
    case ADVOCATE_RESET_SLOT:
      return {
        ...state,
        slotMarks: {
          ...state.slotMarks,
          [makeKey(action.payload)]: false
        }
      };
    case ADVOCATE_UPDATE_BIO_SUCCEEDED:
      return { ...state, advocate: { ...state.advocate, bio: action.payload } };
    default:
      return state;
  }
};
