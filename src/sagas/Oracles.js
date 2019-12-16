import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import {
  FETCH_ORACLES,
  FETCH_CURRENT_ORACLES,
  ORACLES_FETCHED,
  CURRENT_ORACLES_FETCHED,
  API_CATCH,
  API_GET_DISPUTE,
  ORACLE_PAGE_CHANGE,
  ORACLE_ORDER_CHANGE,
  SET_ORACLE_CURRENT_PAGE,
  SET_ORACLE_CURRENT_ORDER,
  DISPUTE_UPDATING,
  RESET_VOTE,
  PUT_VOTE,
  SET_DISPUTE,
  LOOKUP_WALLET_BALANCE,
  // SET_CONTRACT_STATUS
  FETCH_CONTRACTS,
  DISPUTE_SAVING,
  API_GET_LIVE_VOTES,
  CURRENT_ORACLES_LIVE,
  UPDATE_DISPUTE_LIVE,
  ORACLES_LIST_UPDATING,
} from "../reducers/types";
import moment from 'moment';

import { log, chainErrorHandler } from "../utils/helpers"; // log helper

// import contractStatuses from "../assets/i18n/en/status.json";

// Api layouts
import { Oracles, Disputes, JURToken /*, Arbitration, Contracts*/ } from "../api";

import { /* getOracleOrder, */ getOracleCurrentList, getCurrentDispute, getOracleListPage, getOracleListOrder } from "./Selectors"; // selector

// Get
export function* fetchOracles(action) {
  const { id } = action;

  // if dispute detail is empty, get dispute detail

  const currentDispute = yield select(getCurrentDispute);
  if (!currentDispute.id) {
    log('fetchOracles - currentdispute not present', currentDispute.id);
    
    const response = yield call(Disputes.get, { id });
    let { data } = response.data;
    yield put({ type: SET_DISPUTE, payload: data });
  //   yield put({
  //     type: API_GET_DISPUTE,
  //     id,
  //   });
  }
  
  // const { wallet_part } = yield select(getOracleOrder);
  const page = yield select(getOracleListPage);


  const order = yield select(getOracleListOrder);

  let orderby = {};
  order.forEach((ord) => {
    let fieldname = `orderBy[${ord.field}]`
    orderby[fieldname] = ord.type
  });





  try {
    const response = yield call(Oracles.list, {
      id,
      include: "attachments",
      // "order[wallet_part]": wallet_part,
      page,
      ...orderby
    });
    log("oracles - fetch", response);
    yield put({ type: ORACLES_FETCHED, payload: response.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

export function* fetchCurrentOracles(action) {
  const { id } = action;
  try {
    const response = yield call(Oracles.get, {
      id
    });
    log("oracles - fetch", response);
    yield put({ type: CURRENT_ORACLES_FETCHED, payload: response.data });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

export function* onOraclePageChange(action) {
  yield put({ type: SET_ORACLE_CURRENT_PAGE, payload: action.payload });
  yield put({ type: ORACLES_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_ORACLES, id: action.id });
}

export function* onOracleOrderChange(action) {
  yield put({ type: SET_ORACLE_CURRENT_ORDER, payload: action.payload });
  yield put({ type: ORACLES_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_ORACLES, id: action.id });
}

export function* onVote(action) {
  log("onVote - run");
  yield put({ type: DISPUTE_UPDATING, payload: true });
  let {
    vote: { wallet_part }
  } = action;
  const {
    vote: { contract_id, message, hash, oracle_wallet, reject },
    attachments,
    callback
  } = action;
  let {
    vote: { amount }
  } = action;

  // const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const voteData = new FormData();
  // voteData.append('_method', 'PUT');
  if (contract_id) voteData.append("contract_id", contract_id);
  voteData.append("hash", hash || "0x0");
  if (wallet_part) {
    voteData.append("wallet_part", wallet_part);
    if (reject) wallet_part = "0x0000000000000000000000000000000000000000"; // set wallet_part properly for chain action
  }
  if (oracle_wallet) voteData.append("oracle_wallet", oracle_wallet);
  voteData.append("message", message ? message : ''); // empty string
  voteData.append(
    "amount",
    Number(amount).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
  ); // always

  for (let i = 0; i < attachments.length; i++) {
    // iteate over any file sent over appending the files to the form data.
    let file = attachments[i];

    voteData.append("attachments[" + i + "]", file);
  }
  // voteData.append("attachments[]", attachments);

  log("onVote - action", action);
  log("onVote - voteData", voteData);

  // single step with approve and call
  const currentContract = yield select(getCurrentDispute);
  log("onVote - currentContract", currentContract);
  const { address: contractAddress } = currentContract;

  const token = new JURToken();
  // const arbitration = new Arbitration(contractAddress);

  // fix amount decimals
  amount = amount * 10**18;

  // fix strings
  amount = amount.toString();

  const voteTx = yield token
    .approveAndCall(contractAddress, amount, 'vote', [oracle_wallet, wallet_part, amount])
    .catch((err) => {
      log("onVote – err", err);
      put({ type: DISPUTE_UPDATING, payload: false });
      put({ type: DISPUTE_SAVING, payload: false });
      chainErrorHandler(err);
    });

  log("onVote – voteTx", voteTx);

  if (voteTx) { // only if there is a valid sign tx

    yield put({ type: LOOKUP_WALLET_BALANCE }); // update wallet balance

    voteData.append("hash", voteTx.tx); // chain transaction

    try {
      const response = yield call(Disputes.vote, voteData);
      log("onVote - vote created", response);

      yield put({ type: DISPUTE_UPDATING, payload: false });
      yield put({ type: RESET_VOTE });
      // TODO: fetch new votes

      yield put({ type: FETCH_CONTRACTS });

      if (typeof callback === "function") callback();

      // const { history } = action;
      // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
    } catch (error) {
      yield put({ type: API_CATCH, error });
      yield put({ type: DISPUTE_UPDATING, payload: false });
    }
  } else {
    if (typeof callback === "function") callback();
    yield put({ type: DISPUTE_UPDATING, payload: false });
    yield put({ type: DISPUTE_SAVING, payload: false });
  }

  // try {
  //   const response = yield call(Disputes.vote, voteData);
  //   log("onVote - vote created", response);

  //   yield put({ type: DISPUTE_UPDATING, payload: false });
  //   yield put({ type: RESET_VOTE });
  //   // TODO: fetch new votes

  //   if (typeof action.callback === "function") {
  //     action.callback();
  //   } // invoke callback if needed
  // } catch (error) {
  //   yield put({ type: DISPUTE_UPDATING, payload: false });

  //   yield put({ type: API_CATCH, error });
  //   if (typeof action.callback === "function") {
  //     action.callback();
  //   } // invoke callback if needed
  // }
}


export function* getOraclesLive() {

  const currDisp = yield select(getCurrentDispute);
  const currVotes = yield select(getOracleCurrentList);

  log("getOraclesLive - currDisp", currDisp);
  let createdAt = currDisp.statusUpdatedAt;
  
  if (currVotes.length > 0) {
    createdAt = currVotes[0].voted_at;
  }
  
  log("getOraclesLive - createdAt", createdAt);

  let dateStart = moment.unix(Math.floor(createdAt/1000)).utc().format("YYYY-MM-DD HH:mm:ss");
  
  log("getOraclesLive - dateStart", dateStart);
  // log("getOraclesLive - dateStart.toString()", dateStart.toString());
  

  const response = yield call(Oracles.live, { 
    id: currDisp.id, 
    live: dateStart.toString(),
    "orderBy[created_at]": 'desc'
   });


  log("getOraclesLive - response", response);
  // log("getOraclesLive - response", response.data.status );

  let newOracles = response.data.data.data;

  if (newOracles.length > 0) {

    if (currVotes.length > 0) {

      log('CURRENT_ORACLES_LIVE - newOracles1', newOracles);
      
      newOracles = newOracles.filter((nVote) => {
        let votePresent = false;
        currVotes.forEach((vote) => {
          if (vote.id === nVote.id) {
            // return false;
            votePresent = true;
            // log('CURRENT_ORACLES_LIVE - nVote.id', nVote.id);
          }
        });
        log('CURRENT_ORACLES_LIVE - votePresent', votePresent);
        return !votePresent;
      });

      log('CURRENT_ORACLES_LIVE - newOracles2', newOracles);

      if (newOracles.length > 0) {
        yield put({ type: CURRENT_ORACLES_LIVE, payload: {
          oracles: newOracles
        } });

        const newPerc = {
          percentagePartA: response.data.percentagePartA,
          percentagePartB: response.data.percentagePartB,
          totalTokens: response.data.totalTokens,
          totalTokensPartA: response.data.totalTokensPartA,
          totalTokensPartB: response.data.totalTokensPartB,
          totalTokensReject: response.data.totalTokensReject,
        };

        yield put({ type: UPDATE_DISPUTE_LIVE, payload: newPerc });
      } 
    } 
    
  }
  
}



// spawn tasks base certain actions
export default function* oracleSagas() {
  log("run", "oracleSagas");
  yield takeEvery(PUT_VOTE, onVote);
  yield takeEvery(FETCH_ORACLES, fetchOracles);
  yield takeEvery(FETCH_CURRENT_ORACLES, fetchCurrentOracles);
  yield takeEvery(API_GET_DISPUTE, fetchCurrentOracles);
  yield takeLatest(ORACLE_PAGE_CHANGE, onOraclePageChange);
  yield takeLatest(ORACLE_ORDER_CHANGE, onOracleOrderChange);

  yield takeEvery(API_GET_LIVE_VOTES, getOraclesLive);
}
