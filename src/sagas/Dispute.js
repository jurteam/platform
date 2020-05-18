import { call, put, select, takeLatest, takeEvery, take } from "redux-saga/effects";
import moment from 'moment';

import configureStore from "../bootstrap/Store";


import {
  // RESET_DISPUTE,
  // PUT_DISPUTE,
  API_GET_CONTRACT,
  DISPUTE_UPDATING,
  UPDATE_DISPUTE_FILTER,
  FETCH_DISPUTES,
  API_GET_DISPUTE,
  SET_DISPUTE,
  RESET_DISPUTE,
  SET_DISPUTE_CURRENT_PAGE,
  SET_DISPUTE_CURRENT_ORDER,
  DISPUTE_LIST_UPDATING,
  API_DELETE_DISPUTE,
  DISPUTES_FETCHED,
  DISPUTES_UPDATED,
  DISPUTE_DELETED,
  API_CATCH,
  // READ_NOTIFICATIONS,
  DISPUTE_SAVING,
  DISPUTE_MEDIA_DELETE,
  DISPUTE_MEDIA_DELETED,
  DISPUTE_PAGE_CHANGE,
  API_GET_DISPUTE_STATUS_CHANGE,
  DISPUTE_ORDER_CHANGE,
  CHAIN_GET_DISPUTE,
  CHAIN_GET_CONTRACT,
  DELETE_ALL_DISPUTES,
  RESET_ALL_DISPUTES,
  DISPUTE_PAYOUT_PARTY,
  DISPUTE_PAYOUT_VOTER,
  LOOKUP_WALLET_BALANCE,
  UPDATE_LIVE_DISPUTES,
  API_GET_LIVE_VOTES,
  FETCH_ACTIVITIES,
} from "../reducers/types";

import {
  log,
  connector,
  chainErrorHandler,
  connexFromWei
} from "../utils/helpers"; // log helper

// Api layouts
import { Contracts, Disputes, Arbitration, connexArbitrationContract, Withdrawal } from "../api";

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
  getDisputeList,
  getDisputePageSize,
  getCurrentDispute,
} from "./Selectors"; // selector

// Get
export function* getDispute(action) {
  log("getDispute",action);

  const { id, onSuccess, onError } = action;
  log("getDispute",70);
  const { history } = action;
  log("getDispute",72);

  yield put({ type: DISPUTE_UPDATING, payload: true });
  log("getDispute",75);
  // yield put({ type: RESET_DISPUTE });
  log("getDispute",77);

  try {
    const response = yield call(Disputes.get, { id });
    let { data } = response.data;
    const { address } = data;
    log("getDispute - response", response);

    log("getDispute - data.statusId", data.statusId);
    log("getDispute - data.id", data.id);
    // if this dispute is ongoing dispute redirect it to /contracts/detail/
    if ((data.statusId === 31 || data.statusId === 32) && history.location.pathname.startsWith('/disputes/detail'))
    {
      log("getDispute - history.location", history.location);
      log("getDispute - history.locations", history.location.pathname.startsWith('/disputes/detail'));
      history.push('/contracts/detail/'+data.id)
    }

    if (address) {
      log("getDispute - row --|-->", 63);
      yield put({ type: CHAIN_GET_CONTRACT, address });
      log("getDispute - row", 65);
      yield put({ type: CHAIN_GET_DISPUTE, address });
      log("getDispute - row", 67);


      // check connex or web3
      const connectorValue = connector()

      log("getDispute - data", data);
      const statusDate = moment(data.statusUpdatedAt).format('X');

      if (data.statusId === 37)
      {

        log("getDispute - data", data);
        // dispute is waiting

        if(connectorValue === 'connex')
        {


          const arbitration = new connexArbitrationContract(address);
          const disputeEnds = yield arbitration.disputeEnds();
          log("getDispute - disputeEnds", disputeEnds);


          log("getDispute - resolveDate - before");
          yield resolveDate(disputeEnds)
          log("getDispute - resolveDate - after");

          const calcDisputeEnds = yield arbitration.calcDisputeEnds();
          log("getDispute - calcDisputeEnds", calcDisputeEnds);

          if (disputeEnds === calcDisputeEnds)
          {
            // dispute will be closed
            log("getDispute - closing");

            let toUpdate = new FormData();
            toUpdate.append("code", 39);
            toUpdate.append("chain_updated_at", disputeEnds.toString());

            yield call(Contracts.statusChange, toUpdate, id);
            yield put({ type: FETCH_ACTIVITIES });
          }
          else if (disputeEnds !== calcDisputeEnds)
          {
            // dispute will be extended
            log("getDispute - extending");

            let toUpdate = new FormData();
            toUpdate.append("code", 36);
            toUpdate.append("chain_updated_at", statusDate.toString());
            // toUpdate.append("chain_updated_at", disputeEnds.toString());

            yield call(Contracts.statusChange, toUpdate, id);

            toUpdate = new FormData();
            toUpdate.append("code", 37);
            toUpdate.append("chain_updated_at", calcDisputeEnds.toString());

            yield call(Contracts.statusChange, toUpdate, id);

          }

        }
        yield put({ type: FETCH_ACTIVITIES });
        const response = yield call(Disputes.get, { id });
        let { data } = response.data;

        yield put({ type: SET_DISPUTE, payload: data });

      }
      else if (data.statusId === 39)
      {
        // if dispute is closed, get the real winner from chain

        let hasWithdrawn = true;
        let hasToGetReward = 0;
        let sumToWithdraw = 0;
        let reward = 0;
        let voteLookup = '';
        // yield put({ type: CHAIN_GET_CONTRACT, address });



        const { wallet }  = yield select(getUser);

        let winner, arbitration
        if(connectorValue === 'connex')
        {
          arbitration = new connexArbitrationContract(address);
          winner = yield arbitration.getWinner()
        }
        else if (connectorValue === 'web3')
        {
          arbitration = new Arbitration(address);
          winner = yield arbitration.getWinner().catch(chainErrorHandler);
        }
        log("getDispute - winner", winner);

        if (winner) {

          log("getDispute - arbitration", arbitration);
          // let canWithdraw = false;
          let canWithdraw,disputeEnd,VOTE_LOCKUP

          if(connectorValue === 'connex')
          {
            canWithdraw = yield arbitration.canWithdraw(wallet)


            log("getDispute - canWithdraw", canWithdraw);
            hasWithdrawn = canWithdraw[0];
            sumToWithdraw =  connexFromWei(canWithdraw[1].toString(), 'ether');

            log("getDispute - hasWithdrawn", hasWithdrawn);
            log("getDispute - sumTowithdraw", sumToWithdraw);
            let canClaimReward = yield arbitration.canClaimReward(wallet);

            log("getDispute - canClaimReward", canClaimReward);

            hasToGetReward = canClaimReward[0]
            log("getDispute - hasToGetReward", hasToGetReward);

            reward = connexFromWei(canClaimReward[1].toString(), 'ether');
            log("getDispute - reward", reward);


            // yield arbitration.gameTheory();
             VOTE_LOCKUP = yield arbitration.voteLookup();

             log("getDispute - VOTE_LOCKUP", VOTE_LOCKUP);

            voteLookup = moment.duration(Number.parseInt(VOTE_LOCKUP.toString()),'seconds').humanize()
            if (VOTE_LOCKUP)
              log("getDispute - VOTE_LOCKUP", VOTE_LOCKUP.toString());

            log("getDispute - voteLookup", voteLookup);
            disputeEnd = yield arbitration.disputeEnds();

          }
          else if (connectorValue === 'web3')
          {
            canWithdraw = yield arbitration.canWithdraw().catch(chainErrorHandler);


            log("getDispute - canWithdraw", canWithdraw);
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
             VOTE_LOCKUP = arbitration.VOTE_LOCKUP;

            voteLookup = moment.duration(Number.parseInt(VOTE_LOCKUP.toString()),'seconds').humanize()
            if (VOTE_LOCKUP)
              log("getDispute - VOTE_LOCKUP", VOTE_LOCKUP.toString());

            log("getDispute - voteLookup", voteLookup);
            disputeEnd = yield arbitration.disputeEnds().catch(chainErrorHandler);
          }

          log("getDispute - disputeEnd", disputeEnd);

          // ---------------------------------

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
      // const { history } = action;
      history.push(`/disputes/`); // go to disputes list
      // yield put(push('/disputes/'));
    }

    if (typeof onError === "function") {onError(error);} // exec onError callback if present
  }
}

async function resolveDate(disputeEnds)
{
  await new Promise(resolve => {

    let interval = setInterval(() => {

      let chainStatus = global.connex.thor.status;
        let timestamp = chainStatus.head.timestamp;
        log("getDispute - resolveDate - timestamp ::: ",timestamp);

        if(disputeEnds <= timestamp) {
          log("getDispute - resolveDate - ok ");

          clearInterval(interval)
          resolve(true)

        }

        log("getDispute - resolveDate - recall ");

    }, 2000);
  });

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

  const { id, address,
    history } = args;


  const user = yield select(getUser);

  const connectorValue = connector()

  let arbitration


  if(connectorValue === 'connex')
  {

    arbitration = new connexArbitrationContract(address);
    const hasWithdrawn = yield arbitration.hasWithdrawn(user.wallet);


    if (!hasWithdrawn)
    {

      const withdrawTx = yield arbitration.payoutParty(user.wallet,id);
      log(`handlePayoutParty - current user has withdrawTx?`, withdrawTx);

    }

  }
  else if (connectorValue === 'web3')
  {

    arbitration = new Arbitration(address);

    const hasWithdrawn = yield arbitration.hasWithdrawn().catch(chainErrorHandler);
    log(`handlePayoutParty - current user has hasWithdrawn?`, hasWithdrawn);

    if (!hasWithdrawn) {

      const withdrawTx = yield arbitration.payoutParty().catch(chainErrorHandler);
      log(`handlePayoutParty - current user has withdrawTx?`, withdrawTx);

      if (withdrawTx) { // only if there is a valid sign tx

        yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

        // call rest api to save withdraw
        let withdrawalData = new FormData();

        const currContr = yield select(getCurrentDispute);

        withdrawalData.append("amount", currContr.sumToWithdraw);
        withdrawalData.append("type", "withdraw");

        let response = yield call(Withdrawal.store, withdrawalData, id);

        log(`handlePayoutParty - response`, response);




        log(`handlePayoutParty - LOOKUP_WALLET_BALANCE`);
        yield put({
          type: API_GET_DISPUTE,
          id,
          history
        });
        log(`handlePayoutParty - API_GET_DISPUTE`);

      }
    }

  }

}

export function* handlePayoutVoter(args) {

  const { id, address, history } = args;

  const user = yield select(getUser);

  const connectorValue = connector()

  let arbitration

  if(connectorValue === 'connex')
  {

    arbitration = new connexArbitrationContract(address);
    const withdrawTx = yield arbitration.payoutVoter(user.wallet, id);


  }
  else if (connectorValue === 'web3')
  {

    arbitration = new Arbitration(address);

    const withdrawTx = yield arbitration.payoutVoter().catch(chainErrorHandler);
    log(`handlePayoutVoter - current user has withdrawTx?`, withdrawTx);

    const withdrawVoterPayout = yield arbitration.VoterPayout().catch(chainErrorHandler);
    log(`handlePayoutVoter - withdrawVoterPayout`, withdrawVoterPayout);

    if (withdrawTx) { // only if there is a valid sign tx

      yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

        // call rest api to save payout
        let withdrawalData = new FormData();

        const currContr = yield select(getCurrentDispute);

        withdrawalData.append("amount", currContr.reward);
        withdrawalData.append("type", "payout");

        let response = yield call(Withdrawal.store, withdrawalData, id);

        log(`handlePayoutParty - response`, response);


      yield put({
        type: API_GET_DISPUTE,
        id,
        history
      });

    }

  }

}

export function* handleUpdateLiveDisputes() {
  // const currVotes = yield select(getDisputesCurrentList);
  const currDisputes = yield select(getDisputeList);



  const response = yield call(Disputes.list, {
    page: 1,
    show: "all",
  });



  let newDisputes = response.data.data;


  let different = false

  // compare with old results
  newDisputes.forEach((nContr,i) => {

  let presentOrEqual = false;

  currDisputes.forEach((cContr) => {

    if (cContr.id === nContr.id
        && cContr.statusUpdatedAt === nContr.statusUpdatedAt
        && cContr.statusId === nContr.statusId
        && cContr.statusLabel === nContr.statusLabel
        ) {
        presentOrEqual = true;
      }
    })

    if (!presentOrEqual) {
      newDisputes[i].new = (currDisputes[i].new === 1 ? 2 : 1)
      different = true
    }

  })


  if (different) {
    yield put({ type: DISPUTES_UPDATED,
      payload: newDisputes,
      pagination: response.data.meta.pagination
    });
  }

}

export function* getDisputeStatus(action) {

  // log("getDisputeStatus - action", action );
  const currContr = yield select(getCurrentDispute);

  const response = yield call(Contracts.getStatusChange, { id: currContr.id });


  log("getDisputeStatus - response", response.data.status );

  if (typeof response.data.status === "undefined") {
    // control if status is different from actual status
    log("getDisputeStatus - response no status", response.data );

    if (currContr.statusId !== response.data.data.statusId || currContr.statusWillEndAt !== response.data.data.statusWillEndAt) {
      // fetch contract without loading
      log("getDisputeStatus - response - status diff "+ currContr.statusId, response.data.data.statusId );

      global.store.dispatch({
        type: API_GET_DISPUTE,
        id: currContr.id,
        // silent: true,
        // onSuccess: pageLoaded,
        // onError: pageLoaded,
        // history
      });

    }
    else
    {

      yield put({ type: API_GET_LIVE_VOTES });
      yield put({ type: FETCH_ACTIVITIES });
    }

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
  yield takeLatest(UPDATE_LIVE_DISPUTES, handleUpdateLiveDisputes);
  yield takeLatest(API_GET_DISPUTE_STATUS_CHANGE, getDisputeStatus);
}

