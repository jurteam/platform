import {
  FETCH_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED,
  FETCH_CURRENT_ORACLES,
  UPDATE_ORACLE_ORDER,
  SET_ORACLE_CURRENT_PAGE,
  SET_ORACLE_CURRENT_ORDER,
  CURRENT_ORACLES_LIVE,
  ORACLES_LIST_UPDATING
} from "./types";

import { log } from "../utils/helpers";

const INITIAL_STATE = {
  updatingList: true,
  list: [],
  currentList: [],
  // order: {
  //   wallet_part: null
  // },
  page: 1,
  order: [],
  pagination: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    // case FETCH_ORACLES: // saga
    //   return { ...state, list: INITIAL_STATE.list, pagination: INITIAL_STATE.pagination, updatingList: false };

    case FETCH_CURRENT_ORACLES: // saga
      return { ...state, currentList: INITIAL_STATE.currentList, updatingList: false };

    case SET_ORACLE_CURRENT_PAGE:
      return { ...state, page: action.payload };

    case SET_ORACLE_CURRENT_ORDER:

        let present = false;
        let updatedOrder = [];

        state.order.forEach((ord) => {
          if (ord.field === action.payload.field) {
            present = true;
            if (action.payload.type !== "") {
              updatedOrder.push(action.payload)
            }
          }
          else
          {
            updatedOrder.push(ord)
          }
        });

        if (!present) {
          updatedOrder.push(action.payload)
        }

        return {
          ...state,
          order: updatedOrder
        };


    // Updates
    case UPDATE_ORACLE_ORDER:
      let orderToUpdate = {};
      orderToUpdate[action.field] = action.value;
      return { ...state, order: { ...state.order, ...orderToUpdate } };

    case ORACLES_FETCHED:
      log(ORACLES_FETCHED, action.payload);
      return { ...state, list: action.payload.data, pagination: action.payload.meta.pagination, updatingList: false };

    case CURRENT_ORACLES_FETCHED:
      log(ORACLES_FETCHED, action.payload);
      return { ...state, currentList: action.payload.data, updatingList: false };

    case ORACLES_LIST_UPDATING:
      return { ...state, updatingList: action.payload };


    case CURRENT_ORACLES_LIVE:
      log('CURRENT_ORACLES_LIVE', action.payload.oracles);
    
      // // unshift new votes
      const newCurrentVotes = state.currentList;
      newCurrentVotes.unshift(...action.payload.oracles);
      // log('CURRENT_ORACLES_LIVE - newCurrentVotes', newCurrentVotes);
      
      return { 
        ...state, 
        currentList: newCurrentVotes,
        updatingList: false 
      };

    default:
      return state;
  }
};
