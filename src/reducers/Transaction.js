import {
  TRANSACTION_ADDED,
  TRANSACTION_UPDATED,
  TRANSACTIONS_FETCHED,
  LOCK_TRANSACTION,
  REMOVE_TRANSACTION,
} from "./types";

import {
  log
} from "../utils/helpers";



const INITIAL_STATE = {
  waiting: [],
  locked: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // case FETCH_CURRENT_TRANSACTIONS: // saga
    //   return { ...state, waiting: INITIAL_STATE.currentList };

    case TRANSACTIONS_FETCHED:
      log(TRANSACTIONS_FETCHED, action.payload);
      return {
        ...state, waiting: state.waiting.concat(action.payload.data)
      };

    case TRANSACTION_ADDED:
      const newWaiting = [...state.waiting]
      newWaiting.push(action.payload.data)

      return {
        ...state, waiting: newWaiting
      };

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

      return {
        ...state, waiting: txUpdted
      };

    case LOCK_TRANSACTION:
      log(LOCK_TRANSACTION, action);

      const txUpdtedLocked = []

      state.waiting.map(tx => {
        if (tx.id === action.id) {
          const ntx = {
            ...tx,
            locked: true
          }
          txUpdtedLocked.push(ntx)
        } else {
          txUpdtedLocked.push(tx)
        }

      })

      log('LOCK_TRANSACTION - txUpdtedLocked', txUpdtedLocked);

      return {
        ...state, locked: {
          ...state.locked,
          [action.id]: true
        }
      };

    case REMOVE_TRANSACTION:
      log(REMOVE_TRANSACTION, action);

      const txRemoved = []

      state.waiting.map(tx => {
        if (tx.id !== action.id) {
          txRemoved.push(tx)
        }
      })

      log('REMOVE_TRANSACTION - txRemoved', txRemoved);

      return {
        ...state, waiting: txRemoved
      };

    default:
      return state;
  }
};
