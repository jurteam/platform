import {
  FETCH_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED
} from "./types";

const INITIAL_STATE = {
  updatingList: true,
  list: [],
  currentList: [],
  page: 1,
  pagination: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case ORACLES_FETCHED:
      console.log(ORACLES_FETCHED, action.payload);
      return { ...state, list: action.payload.data, pagination: action.payload.meta.pagination, updatingList: false };

    case CURRENT_ORACLES_FETCHED:
      console.log(ORACLES_FETCHED, action.payload);
      return { ...state, currentList: action.payload.data, updatingList: false };

    case FETCH_ORACLES: // saga
    default:
      return state;
  }
};
