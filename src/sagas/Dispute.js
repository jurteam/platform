import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";

import moment from 'moment';

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
  RESET_ALL_DISPUTES,
  DISPUTE_PAYOUT_PARTY,
  DISPUTE_PAYOUT_VOTER,
  LOOKUP_WALLET_BALANCE,
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
      log("getDispute - row", 63);
      yield put({ type: CHAIN_GET_CONTRACT, address });
      log("getDispute - row", 65);
      yield put({ type: CHAIN_GET_DISPUTE, address });
      log("getDispute - row", 67);
      
      let hasWithdrawn = true;
      let hasToGetReward = 0;
      let sumToWithdraw = 0;
      let reward = 0;
      let voteLookup = '';
      
      // if dispute is closed, get the real winner from chain
      if (data.statusId === 39) {
        
        // yield put({ type: CHAIN_GET_CONTRACT, address });
        
        const arbitration = new Arbitration(address);
        let winner = yield arbitration.getWinner().catch(chainErrorHandler);
        log("getDispute - winner", winner);
        
        if (winner) {
          
          log("getDispute - arbitration", arbitration);
          // let canWithdraw = false;
          let canWithdraw = yield arbitration.canWithdraw().catch(chainErrorHandler);
          hasWithdrawn = canWithdraw[0];
          sumToWithdraw =  global.drizzle.web3.utils.fromWei(canWithdraw[1].toString(), 'ether');

          // log("getDispute - type canWithdraw", typeof canWithdraw);
          // log("getDispute - canWithdraw[0]", canWithdraw[0]);
          // log("getDispute - canWithdraw.r", canWithdraw.result);
          log("getDispute - hasWithdrawn", hasWithdrawn);
          log("getDispute - sumTowithdraw", sumToWithdraw);
          let canClaimReward = yield arbitration.canClaimReward().catch(chainErrorHandler);
          hasToGetReward = canClaimReward[0]

          reward = global.drizzle.web3.utils.fromWei(canClaimReward[1].toString(), 'ether');
          // log("getDispute - canClaimReward", canClaimReward);
          log("getDispute - hasToGetReward", hasToGetReward);
          log("getDispute - reward", reward);


          yield arbitration.gameTheory();
          const VOTE_LOCKUP = arbitration.VOTE_LOCKUP;

          voteLookup = moment.duration(Number.parseInt(VOTE_LOCKUP.toString()),'seconds').humanize()
          if (VOTE_LOCKUP)
            log("getDispute - VOTE_LOCKUP", VOTE_LOCKUP.toString());
            
          log("getDispute - voteLookup", voteLookup);
          const disputeEnd = yield arbitration.disputeEnds().catch(chainErrorHandler);
          const lockupEnd = disputeEnd ? Number.parseInt(disputeEnd.toString()) + Number.parseInt(VOTE_LOCKUP) : 0
          log("getDispute - lockupEnd", lockupEnd);
          const now = new Date();
          const nowSecs = Math.floor(now.getTime()/1000)
          log("getDispute - nowSecs", nowSecs);
          
          winner = winner === '0x0000000000000000000000000000000000000000' ? '0x0' : winner ? winner.toLowerCase() : ''
          data.winner = winner;

          
          // if (false) {
            
            // let allParties = yield arbitration.allParties().catch(chainErrorHandler);
            
            // log("getDispute - allParties", allParties);
            log("getDispute - data", data);
            
          
            
            // --- check if current user can do Payout
            
            const partA = data.counterparties[0] ? data.counterparties[0].wallet.toLowerCase() : '';
            const partB = data.counterparties[1] ? data.counterparties[1].wallet.toLowerCase() : '';
            const { wallet }  = yield select(getUser);
            const iPay = (data.whoPays === wallet )
            // const oracles = yield select(getOracleList);

            log('getDispute',{
              partA:partA,
              partB:partB,
              wallet: wallet,
              iPay:iPay,            
            })

            // check if i am not a part of the contract
            if (partA !== wallet && partB !== wallet ) {
              hasWithdrawn = true;
            }
      
            // if I am a Party 
            // if (partA === wallet) {
            //   // i am party A

            //   if (winner === '0x0') {
            //     // reject win 

            //     // control my fund into contract
            //     if (iPay) {
            //       myAmount = Number.parseFloat(data.value) - Number.parseFloat(data.partAPenaltyFee);
            //     } else {
            //       myAmount = Number.parseFloat(data.partAPenaltyFee);
            //     }
                
            //   } else if (winner === partA) {
            //     myAmount = Number.parseFloat(data.proposalPartA.proposal.proposal_part_a);
            //   } else if (winner === partB) {
            //     myAmount = Number.parseFloat(data.proposalPartB.proposal.proposal_part_a);  
            //   }

            //   hasToWithdraw = (myAmount > 0 && !canWithdraw);

            // } else if (partB === wallet) {
            //   // i am party B  
            
            //   if (winner === '0x0') {
            //     // reject win 
      
            //     // control my fund into contract
            //     if (iPay) {
            //       myAmount = Number.parseFloat(data.value) - Number.parseFloat(data.partBPenaltyFee);
            //     } else {
            //       myAmount = Number.parseFloat(data.partBPenaltyFee);
            //     }
                
            //   } else if (winner === partA) {
            //     myAmount = Number.parseFloat(data.proposalPartA.proposal.proposal_part_b);
            //   } else if (winner === partB) {
            //     myAmount = Number.parseFloat(data.proposalPartB.proposal.proposal_part_b);  
            //   }

            //   hasToWithdraw = (myAmount > 0 && !canWithdraw);
              
              
            // } 
            
            
            // check all vote   
            // oracles.forEach(oracle => {
    
            //   if (oracle.oracle_wallet === wallet) {
            //     // I am a Voter
    
            //     if (oracle.wallet_part === winner.toLowerCase()) {
            //       // i voted winnin party
    
            //       // control if has passed 24 h from closing dispute
    
            //       hasToGetReward = Number.parseInt(canClaimReward.toString());
            //       if (nowSecs >= lockupEnd) {
            //         hasToGetReward = hasToGetReward === 0 ? 1 : hasToGetReward
            //       }
            //       // setShowWithdrawButton(true)
            //     }
            //   }
              
            // })
            
          
          // }
          

        // check if vote_lookup is passed from dispute end
         hasToGetReward = Number.parseInt(hasToGetReward.toString());
         if (nowSecs >= lockupEnd) {
           hasToGetReward = hasToGetReward === 1 ? 2 : hasToGetReward;
         }

         
         data.hasWithdrawn = hasWithdrawn;
         data.hasToGetReward = hasToGetReward;
         data.voteLookup = lockupEnd;
         data.sumToWithdraw = Number.parseFloat(sumToWithdraw);
         data.reward = Number.parseFloat(reward);
               
         yield put({ type: SET_DISPUTE, payload: data });
          
        }
        
      } else {
              
        yield put({ type: SET_DISPUTE, payload: data });
      }
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

export function* handlePayoutParty(args) {

  const { id, address } = args;

  const arbitration = new Arbitration(address);

  const hasWithdrawn = yield arbitration.hasWithdrawn().catch(chainErrorHandler);
  log(`handlePayoutParty - current user has hasWithdrawn?`, hasWithdrawn);

  if (!hasWithdrawn) {

    const withdrawTx = yield arbitration.payoutParty().catch(chainErrorHandler);
    log(`handlePayoutParty - current user has withdrawTx?`, withdrawTx);
    
    if (withdrawTx) { // only if there is a valid sign tx
      
      yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance
      
      log(`handlePayoutParty - LOOKUP_WALLET_BALANCE`);
      yield put({
        type: API_GET_DISPUTE,
        id,
      });
      log(`handlePayoutParty - API_GET_DISPUTE`);

    }
  }

}

export function* handlePayoutVoter(args) {

  const { id, address } = args;

  const arbitration = new Arbitration(address);

  const withdrawTx = yield arbitration.payoutVoter().catch(chainErrorHandler);
  log(`handlePayoutVoter - current user has withdrawTx?`, withdrawTx);

  const withdrawVoterPayout = yield arbitration.VoterPayout().catch(chainErrorHandler);
  log(`handlePayoutVoter - withdrawVoterPayout`, withdrawVoterPayout);

  if (withdrawTx) { // only if there is a valid sign tx

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    yield put({
      type: API_GET_DISPUTE,
      id,
    });

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
  yield takeLatest(DISPUTE_PAYOUT_PARTY, handlePayoutParty);
  yield takeLatest(DISPUTE_PAYOUT_VOTER, handlePayoutVoter);
}
