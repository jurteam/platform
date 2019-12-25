import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";

import {
  // RESET_DISPUTE,
  // PUT_DISPUTE,
  API_GET_CONTRACT,
  DISPUTE_UPDATING,
  UPDATE_DISPUTE_FILTER,
  FETCH_DISPUTES,
  API_GET_DISPUTE,
  SET_DISPUTE,
  SET_DISPUTE_CURRENT_PAGE,
  SET_DISPUTE_CURRENT_ORDER,
  DISPUTE_LIST_UPDATING,
  API_DELETE_DISPUTE,
  DISPUTES_FETCHED,
  DISPUTE_DELETED,
  API_CATCH,
  // READ_NOTIFICATIONS,
  DISPUTE_SAVING,
  DISPUTE_MEDIA_DELETE,
  DISPUTE_MEDIA_DELETED,
  DISPUTE_PAGE_CHANGE,
  DISPUTE_ORDER_CHANGE,
  CHAIN_GET_DISPUTE,
  CHAIN_GET_CONTRACT,
  DELETE_ALL_DISPUTES,
  RESET_ALL_DISPUTES
} from "../reducers/types";

import { 
  log, 
  chainErrorHandler
} from "../utils/helpers"; // log helper

// Api layouts
import { Disputes, Arbitration } from "../api";

import {
  // getNewDispute,
  // getCurrentDispute,
  // getCurrentDisputeActivities,
  getDisputeListPage,
  getDisputeListOrder,
  getDisputeFilters,
  getUser,
  getOracleList,
  getDrizzleStoredContracts,
} from "./Selectors"; // selector

// Get
export function* getDispute(action) {
  const { id, onSuccess, onError } = action;
  yield put({ type: DISPUTE_UPDATING, payload: true });

  try {
    const response = yield call(Disputes.get, { id });
    let { data } = response.data;
    const { address } = data;
    log("getDispute", response);
    
    if (address) {
      yield put({ type: CHAIN_GET_CONTRACT, address });
      yield put({ type: CHAIN_GET_DISPUTE, address });
      
      // if dispute is closed, get the real winner from chain
      if (data.statusId === 39) {
        
        // yield put({ type: CHAIN_GET_CONTRACT, address });
        
        const arbitration = new Arbitration(address);
        let winner = yield arbitration.getWinner().catch(chainErrorHandler);
        log("getDispute - winner", winner);
        let hasWithdrawn = yield arbitration.hasWithdrawn().catch(chainErrorHandler);
        log("getDispute - hasWithdrawn", hasWithdrawn);
        const drizzleContracts = yield select(getDrizzleStoredContracts);
        const VOTE_LOCKUP = drizzleContracts[address].VOTE_LOCKUP['0x0'].value;
        log("getDispute - VOTE_LOCKUP", VOTE_LOCKUP);
        const disputeEnd = yield arbitration.disputeEnds().catch(chainErrorHandler);
        const lockupEnd = disputeEnd ? Number.parseInt(disputeEnd.toString()) + Number.parseInt(VOTE_LOCKUP) : 0
        log("getDispute - lockupEnd", lockupEnd);
        const now = new Date();
        const nowSecs = Math.floor(now.getTime()/1000)
        log("getDispute - nowSecs", nowSecs);
        
        // let allParties = yield arbitration.allParties().catch(chainErrorHandler);
        winner = winner === '0x0000000000000000000000000000000000000000' ? '0x0' : winner
        
        // log("getDispute - allParties", allParties);
        log("getDispute - data", data);
        
        data.winner = winner;
        let hasToWithdraw = false;
        
        if (winner) {
          
          // --- check if current user can do Payout
          
          const partA = data.counterparties[0];
          const partB = data.counterparties[1];
          const { wallet }  = yield select(getUser);
          const iPay = (data.whoPays === wallet )
          const oracles = yield select(getOracleList);
          let myAmount = 0;

          log('getDispute',{
            partA:partA,
            partB:partB,
            wallet: wallet,
            iPay:iPay,            
          })
    
          // if I am a Party 
          if (partA.wallet === wallet) {
            // i am party A

            if (winner === '0x0') {
              // reject win 

              // control my fund into contract
              if (iPay) {
                myAmount = Number.parseFloat(data.value) - Number.parseFloat(data.partAPenaltyFee);
              } else {
                myAmount = Number.parseFloat(data.partAPenaltyFee);
              }
              
            } else if (winner === partA.wallet) {
              myAmount = Number.parseFloat(data.proposalPartA.proposal.proposal_part_a);
            } else if (winner === partB.wallet) {
              myAmount = Number.parseFloat(data.proposalPartB.proposal.proposal_part_a);  
            }

            hasToWithdraw = myAmount > 0 && !hasWithdrawn;

          } else if (partB.wallet === wallet) {
            // i am party B  
          
            if (winner === '0x0') {
              // reject win 
    
              // control my fund into contract
              if (iPay) {
                myAmount = Number.parseFloat(data.value) - Number.parseFloat(data.partBPenaltyFee);
              } else {
                myAmount = Number.parseFloat(data.partBPenaltyFee);
              }
              
            } else if (winner === partA.wallet) {
              myAmount = Number.parseFloat(data.proposalPartA.proposal.proposal_part_b);
            } else if (winner === partB.wallet) {
              myAmount = Number.parseFloat(data.proposalPartB.proposal.proposal_part_b);  
            }

            hasToWithdraw = myAmount > 0 && !hasWithdrawn;
            
    
          } else {
            // loop all vote
    
            oracles.forEach(oracle => {
    
              if (oracle.oracle_wallet === wallet) {
                // I am a Voter
    
                if (oracle.wallet_part === winner) {
                  // i voted winnin party
    
                  // control if has passed 24 h from closing dispute
    
                  if (nowSecs >= lockupEnd) {
                    hasToWithdraw = true
                  }
                  // setShowWithdrawButton(true)
                }
              }
              
            })
            
          }

          
        }
        
        data.hasToWithdraw = hasToWithdraw;
        
      }
            
      yield put({ type: SET_DISPUTE, payload: data });
    }

    if (typeof onSuccess === "function") {onSuccess();} // exec onSuccess callback if present
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });

    if (error.response.status === 404 && error.response.config.headers.wallet !== null) {
      const { history } = action;
      history.push(`/disputes/`); // go to contracts list
    }

    if (typeof onError === "function") {onError(error);} // exec onError callback if present
  }
}

// Delete
export function* deleteDispute(action) {
  yield put({ type: DISPUTE_UPDATING, payload: true });

  log("deleteDispute - action", action);

  // proceed
  const { id } = action;
  try {
    const response = yield call(Disputes.delete, action);
    log("deleteDispute - delete", response);
    yield put({ type: DISPUTE_DELETED, id });
  } catch (error) {
    log("deleteDispute - error", error);
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchDisputes() {
  yield put({ type: DISPUTE_LIST_UPDATING, payload: true });
  yield put({ type: UPDATE_DISPUTE_FILTER, disabled: true });
  const { status, fromDate, toDate, searchText, category, mine } = yield select(
    getDisputeFilters
  );
  const page = yield select(getDisputeListPage);

  const order = yield select(getDisputeListOrder);

  let orderby = {};
  order.forEach((ord) => {
    let fieldname = `orderBy[${ord.field}]`
    orderby[fieldname] = ord.type
  });
  


  log("Disputes - filters", {
    status: status && typeof status.value !== "undefined" ? status.value : null,
    from: fromDate,
    to: toDate,
    query: searchText
  });
  try {
    const response = yield call(Disputes.list, {
      status:
        status && typeof status.value !== "undefined" ? status.value : null,
      from: fromDate,
      to: toDate,
      category:
        category && typeof category.value !== "undefined"
          ? category.value
          : null,
      query: searchText,
      show: mine ? "my" : "all",
      page,
      ...orderby
    });
    log("Disputes - fetch", response);
    yield put({ type: DISPUTES_FETCHED, payload: response.data });
    yield put({ type: UPDATE_DISPUTE_FILTER, disabled: false });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Delete media
export function* deleteDisputeMedia(action) {
  log("deleteDisputeMedia - run", action);

  const { type, ...params } = action;

  try {
    const response = yield call(Disputes.deleteMedia, params);
    log("deleteDisputeMedia - media deleted", response);
    yield put({ type: DISPUTE_MEDIA_DELETED, ...params });

    // const { history } = action;
    // history.push(`/Disputes/detail/${id}`); // go to Dispute detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// Reset
export function* onDisputeDelete() {
  yield put({ type: FETCH_DISPUTES });
  yield put({ type: SET_DISPUTE_CURRENT_PAGE, payload: 1 });
}

export function* onDisputePageChange(action) {
  yield put({ type: SET_DISPUTE_CURRENT_PAGE, payload: action.payload });
  yield put({ type: DISPUTE_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_DISPUTES });
}

export function* onDisputeOrderChange(action) {
  yield put({ type: SET_DISPUTE_CURRENT_ORDER, payload: action.payload });
  yield put({ type: DISPUTE_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_DISPUTES });
}

export function* resetUpdating() {
  yield put({ type: DISPUTE_SAVING, payload: false });
  yield put({ type: DISPUTE_UPDATING, payload: false });
}

export function* onDeleteAllDisputes() {
  try {
    yield call(Disputes.deleteAll);
    yield put({ type: DISPUTE_DELETED });
    yield put({ type: RESET_ALL_DISPUTES });
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// spawn tasks base certain actions
export default function* disputeSagas() {
  log("run", "DisputeSagas");
  yield takeEvery(API_GET_DISPUTE, getDispute);
  yield takeLatest(API_DELETE_DISPUTE, deleteDispute);
  yield takeLatest(FETCH_DISPUTES, fetchDisputes);
  yield takeLatest(DISPUTE_DELETED, onDisputeDelete);
  yield takeLatest(API_CATCH, resetUpdating);
  yield takeLatest(SET_DISPUTE, resetUpdating);
  yield takeLatest(DISPUTE_MEDIA_DELETE, deleteDisputeMedia);
  yield takeLatest(DISPUTE_PAGE_CHANGE, onDisputePageChange);
  yield takeLatest(DISPUTE_ORDER_CHANGE, onDisputeOrderChange);
  yield takeLatest(DELETE_ALL_DISPUTES, onDeleteAllDisputes);
}
