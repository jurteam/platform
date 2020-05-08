import {
  OATH_KEEPER_OPEN,
  OATH_KEEPER_CLOSE,
  OATH_KEEPER_UPDATE_AMOUNT,
  OATH_KEEPER_UPDATE_LOCK_IN_PERIOD,
  OATH_KEEPER_UPDATE_TNC,
  OATH_KEEPER_TAKE_OATH,
  OATH_KEEPER_TOOK_OATH,
  OATH_KEEPER_FETCH_MY_OATHS,
  OATH_KEEPER_UPDATE_MY_OATHS,
  OATH_KEEPER_FETCH_RANK,
  OATH_KEEPER_UPDATE_RANK,
  OATH_KEEPER_FETCH_OATH_TAKERS,
  OATH_KEEPER_UPDATE_OATH_TAKERS,
  OATH_KEEPER_FETCH_ANALYTICS,
  OATH_KEEPER_UPDATE_ANALYTICS,
  OATH_KEEPER_WITHDREW_OATH,
  OATH_KEEPER_WITHDRAW_OATH
} from "./types";

import {
  oathKeeperAnalytics,
  oathState,
  oathKeeperFilters
} from "../utils/helpers";

const INITIAL_STATE = {
  amount: 0,
  lockInPeriod: "",
  acceptTnC: false,
  isModalOpen: false,
  isTakingOath: false,
  isFetchingMyOaths: false,
  isFetchingOathTakers: false,
  oathTakers: [],
  oathTakersMeta: {},
  oathTakersFilters: {
    status: oathKeeperFilters.statuses.SHOW_ALL
  },
  myRank: "na",
  myBalance: "na",
  myOaths: [],
  withdrawingOaths: new Set(),
  isFetchingAnalytics: false,
  analytics: {},
  analyticsMeta: initializeAnalyticsMeta()
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OATH_KEEPER_OPEN:
      return { ...state, isModalOpen: true };
    case OATH_KEEPER_CLOSE:
      return { ...state, isModalOpen: false };
    case OATH_KEEPER_UPDATE_AMOUNT:
      return { ...state, amount: action.payload };
    case OATH_KEEPER_UPDATE_LOCK_IN_PERIOD:
      return { ...state, lockInPeriod: action.payload };
    case OATH_KEEPER_UPDATE_TNC:
      return { ...state, acceptTnC: !state.acceptTnC };
    case OATH_KEEPER_TAKE_OATH:
      return { ...state, isTakingOath: true };
    case OATH_KEEPER_TOOK_OATH:
      return { ...state, isTakingOath: false };
    case OATH_KEEPER_WITHDRAW_OATH:
      return {
        ...state,
        withdrawingOaths: new Set(...state.withdrawingOaths.add(action.payload))
      };
    case OATH_KEEPER_WITHDREW_OATH:
      const withdrawingOaths = new Set(...state.withdrawingOaths);
      withdrawingOaths.delete(action.payload);
      return { ...state, withdrawingOaths };
    case OATH_KEEPER_FETCH_MY_OATHS:
      return { ...state, isFetchingMyOaths: true };
    case OATH_KEEPER_UPDATE_MY_OATHS:
      return {
        ...state,
        isFetchingMyOaths: false,
        myOaths: action.payload,
        myBalance: balanceFromOaths(action.payload)
      };
    case OATH_KEEPER_FETCH_RANK:
      return { ...state };
    case OATH_KEEPER_UPDATE_RANK:
      return { ...state, myRank: action.payload };
    case OATH_KEEPER_FETCH_OATH_TAKERS:
      return {
        ...state,
        isFetchingOathTakers: true,
        oathTakersFilters: computeFilters(state.oathTakersFilters, action)
      };
    case OATH_KEEPER_UPDATE_OATH_TAKERS:
      return {
        ...state,
        isFetchingOathTakers: false,
        oathTakers: action.payload.data,
        oathTakersMeta: action.payload.meta
      };
    case OATH_KEEPER_FETCH_ANALYTICS:
      return {
        ...state,
        isFetchingAnalytics: true,
        analyticsMeta: computeAnalyticsMeta(state.analyticsMeta, action)
      };
    case OATH_KEEPER_UPDATE_ANALYTICS:
      return {
        ...state,
        isFetchingAnalytics: false,
        analytics: computeAnalytics(state.analytics, action)
      };
    default:
      return state;
  }
};

function balanceFromOaths(oaths) {
  return oaths.reduce(
    (balance, oath) =>
      oathState(oath).isActive() ? balance + Number(oath.amount) : balance,
    0
  );
}

function computeFilters(state, action) {
  if (action.payload && action.payload.filter) {
    return {
      ...state,
      ...action.payload.filter
    };
  }
  return state;
}

function computeAnalyticsMeta(state, action) {
  if (action.card)
    return {
      ...state,
      [action.card]: {
        ...state[action.card],
        duration: action.payload.duration
      }
    };

  return { ...state };
}

function computeAnalytics(state, action) {
  if (action.card) return { ...state, [action.card]: action.payload.data };

  return listToMap(action.payload.data, "id");
}

function listToMap(list, key) {
  return list.reduce((map, item) => {
    map[item[key]] = item;
    return map;
  }, {});
}

function initializeAnalyticsMeta() {
  return Object.values(oathKeeperAnalytics.cards).reduce((state, cardName) => {
    state[cardName] = { duration: oathKeeperAnalytics.durations.LAST_MONTH };
    return state;
  }, {});
}
