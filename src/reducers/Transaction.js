
import {
  TRANSACTION_ADDED,
  TRANSACTION_UPDATED,
  TRANSACTIONS_FETCHED,
} from "./types";

import { log } from "../utils/helpers";



const INITIAL_STATE = {
  lastBlockNumber: 0,
  waiting: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // case FETCH_CURRENT_TRANSACTIONS: // saga
    //   return { ...state, waiting: INITIAL_STATE.currentList };

    case TRANSACTIONS_FETCHED:
      log(TRANSACTIONS_FETCHED, action.payload);
      return { ...state, waiting: state.waiting.concat(action.payload.waiting), lastBlockNumber: action.payload.lastBlockNumber };

    case TRANSACTION_ADDED:
      const newWaiting = [...state.waiting]
      newWaiting.push(action.payload.data)

      return { ...state, waiting: newWaiting};

    case TRANSACTION_UPDATED:
      log(TRANSACTION_UPDATED, action.payload);
      log('TRANSACTION_UPDATED - state.waiting', state.waiting);
      
      const txUpdted = []

      state.waiting.map(tx => {
        if (tx.id !== action.payload.data.id) {
          txUpdted.push(tx)
        }
      })
      
      log('TRANSACTION_UPDATED - txUpdted', txUpdted);
      
      return { ...state, waiting: txUpdted};

    default:
      return state;
  }
};
