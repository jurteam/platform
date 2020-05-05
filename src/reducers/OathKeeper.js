import {
  OATH_KEEPER_OPEN,
  OATH_KEEPER_CLOSE,
  OATH_KEEPER_UPDATE_AMOUNT,
  OATH_KEEPER_UPDATE_LOCK_IN_PERIOD,
  OATH_KEEPER_UPDATE_TNC,
  OATH_KEEPER_START_TAKING_OATH,
  OATH_KEEPER_DONE_TAKING_OATH,
  OATH_KEEPER_FETCH_MY_OATHS,
  OATH_KEEPER_FETCHED_MY_OATHS
} from "./types";

import { oathKeeperCards } from "../utils/helpers";

const INITIAL_STATE = {
  amount: 0,
  lockInPeriod: "",
  acceptTnC: false,
  isModalOpen: false,
  isTakingOath: false,
  isFetchingMyOaths: false,
  myOaths: [],
  averageAmountCard: {
    selectedDuration: oathKeeperCards.LAST_MONTH,
    value: 12345,
    delta: 5.1
  },
  amountStakedCard: {
    selectedDuration: oathKeeperCards.LAST_MONTH,
    value: 10000
  },
  activeAmountCard: {
    selectedDuration: oathKeeperCards.LAST_MONTH,
    value: 12345,
    delta: 5.1
  },
  activeOathKeepersCard: {
    selectedDuration: oathKeeperCards.LAST_MONTH,
    value: 143,
    delta: -3
  }
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
    case OATH_KEEPER_START_TAKING_OATH:
      return { ...state, isTakingOath: true };
    case OATH_KEEPER_DONE_TAKING_OATH:
      return { ...state, isTakingOath: false };
    case OATH_KEEPER_FETCH_MY_OATHS:
      return { ...state, isFetchingMyOaths: true };
    case OATH_KEEPER_FETCHED_MY_OATHS:
      return { ...state, isFetchingMyOaths: false, myOaths: action.payload };
    default:
      return state;
  }
};
