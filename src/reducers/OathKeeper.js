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
  OATH_KEEPER_WITHDRAW_OATH,
  OATH_KEEPER_RESET_FILTERS,
  OATH_KEEPER_SELECT_ROW,
  OATH_KEEPER_UNSELECT_ROW,
  OATH_KEEPER_UPDATE_OATHS_OF,
  OATH_KEEPER_REJECT_OATH,
  OATH_KEEPER_REJECT_WITHDRAW
} from "./types";

import {
  oathKeeperAnalytics,
  oathState,
  oathKeeperFilters,
  ethToHuman
} from "../utils/helpers";
import { getNewOath } from "../sagas/Selectors";
import { MIN_TOKEN_AMOUNT } from "../api/connex/OathKeeper";

const INITIAL_FILTERS_STATE = {
  oathTakers: [],
  oathTakersMeta: {
    pagination: {
      total: 0,
      per_page: 10,
      current_page: 1
    }
  },
  oathTakersFilters: {
    status: oathKeeperFilters.statuses.SHOW_ALL,
    sortBy: "Rank",
    query: undefined,
    startsAt: undefined,
    endsAt: undefined,
    minAmount: undefined,
    maxAmount: undefined
  }
};

const INITIAL_NEW_OATH_STATE = {
  amount: "0",
  lockInPeriod: "1",
  acceptTnC: false,
  isModalOpen: false,
  isTakingOath: false,
  newOathMessage: ""
};

const INITIAL_STATE = {
  isFetchingMyOaths: false,
  isFetchingOathTakers: false,
  myRank: "na",
  myBalance: "na",
  myOaths: [],
  isFetchingAnalytics: false,
  analytics: {},
  analyticsMeta: initializeAnalyticsMeta(),
  selectedRow: null,
  ...INITIAL_FILTERS_STATE,
  ...INITIAL_NEW_OATH_STATE
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OATH_KEEPER_OPEN:
      return { ...state, isModalOpen: true };
    case OATH_KEEPER_CLOSE:
      return { ...state, ...INITIAL_NEW_OATH_STATE };
    case OATH_KEEPER_UPDATE_AMOUNT:
      return { ...state, amount: safeUpdateAmount(action.payload) };
    case OATH_KEEPER_UPDATE_LOCK_IN_PERIOD:
      return { ...state, lockInPeriod: action.payload };
    case OATH_KEEPER_UPDATE_TNC:
      return { ...state, acceptTnC: !state.acceptTnC };
    case OATH_KEEPER_TAKE_OATH:
      const newOath = getNewOath({ oathKeeper: state });
      if (!newOath.acceptTnC) return { ...state };
      newOath.oathIndex = state.myOaths.length + 1;
      newOath.fronendOnly = true;
      return {
        ...state,
        isTakingOath: true,
        myOaths: [newOath, ...state.myOaths]
      };
    case OATH_KEEPER_TOOK_OATH:
      return { ...state, ...INITIAL_NEW_OATH_STATE };
    case OATH_KEEPER_REJECT_OATH:
      return {
        ...state,
        isTakingOath: false,
        newOathMessage: action.payload.message,
        myOaths: state.myOaths.filter(
          o => o.oathIndex !== action.payload.oathIndex
        )
      };
    case OATH_KEEPER_WITHDRAW_OATH:
      return {
        ...state,
        myOaths: [
          ...setOathStatus(state.myOaths, action.payload, "withdrawing")
        ]
      };
    case OATH_KEEPER_WITHDREW_OATH:
      return { ...state };
    case OATH_KEEPER_REJECT_WITHDRAW:
      return {
        ...state,
        myOaths: [
          ...setOathStatus(
            state.myOaths,
            action.payload.oathIndex,
            oathState.COMPLETED
          )
        ]
      };
    case OATH_KEEPER_FETCH_MY_OATHS:
      return { ...state, isFetchingMyOaths: true };
    case OATH_KEEPER_UPDATE_MY_OATHS:
      return {
        ...state,
        isFetchingMyOaths: false,
        myOaths: action.payload,
        myBalance: balanceFromOaths(action.payload)
      };
    case OATH_KEEPER_UPDATE_OATHS_OF:
      return {
        ...state,
        oathTakers: updateOathsOf(state.oathTakers, action.payload)
      };
    case OATH_KEEPER_FETCH_RANK:
      return { ...state };
    case OATH_KEEPER_UPDATE_RANK:
      return { ...state, myRank: action.payload };
    case OATH_KEEPER_FETCH_OATH_TAKERS:
      return {
        ...state,
        isFetchingOathTakers: true,
        oathTakersFilters: {
          ...state.oathTakersFilters,
          ...(action.payload || {})
        }
      };
    case OATH_KEEPER_UPDATE_OATH_TAKERS:
      return {
        ...state,
        isFetchingOathTakers: false,
        selectedRow: null,
        oathTakers: action.payload.data,
        oathTakersMeta: action.payload.meta
      };
    case OATH_KEEPER_RESET_FILTERS:
      return {
        ...state,
        ...INITIAL_FILTERS_STATE,
        selectedRow: null
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
    case OATH_KEEPER_SELECT_ROW:
      return {
        ...state,
        selectedRow: action.payload
      };
    case OATH_KEEPER_UNSELECT_ROW:
      return {
        ...state,
        selectedRow: null
      };
    default:
      return state;
  }
};

function safeUpdateAmount(amount) {
  return Number(amount) > MIN_TOKEN_AMOUNT ? amount : MIN_TOKEN_AMOUNT;
}

function setOathStatus(oaths, oathIndex, status) {
  return oaths.map(o => {
    if (o.oathIndex === oathIndex) {
      return { ...o, customStatus: status };
    }
    return o;
  });
}

function updateOathsOf(oathTakers, { address, oaths }) {
  return oathTakers.map(o => {
    if (o.attributes.address === address) {
      return {
        ...o,
        oaths
      };
    }

    return o;
  });
}

function balanceFromOaths(oaths) {
  return ethToHuman(
    oaths.reduce(
      (balance, oath) =>
        oathState(oath).isActive() ? balance + Number(oath.amount) : balance,
      0
    )
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
