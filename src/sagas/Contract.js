import { call, put, select, takeLatest, takeEvery } from "redux-saga/effects";
import { getUser } from "./Selectors";
import {
  RESET_CONTRACT,
  NEW_CONTRACT,
  PUT_CONTRACT,
  CONTRACT_UPDATING,
  UPDATE_CONTRACT_FILTER,
  FETCH_CONTRACTS,
  API_GET_CONTRACT,
  SET_CONTRACT,
  SET_CONTRACT_ACTIVITIES,
  SET_CONTRACT_CURRENT_PAGE,
  SET_CONTRACT_CURRENT_ORDER,
  CONTRACT_LIST_UPDATING,
  CONTRACT_ISSUE,
  API_DELETE_CONTRACT,
  CONTRACTS_FETCHED,
  CONTRACT_DELETED,
  API_CATCH,
  READ_NOTIFICATIONS,
  CONTRACT_NOTIFICATIONS_LOADING,
  CONTRACT_READ_NOTIFICATIONS,
  CONTRACT_SAVING,
  CONTRACT_MEDIA_DELETE,
  CONTRACT_MEDIA_DELETED,
  CONTRACT_PAGE_CHANGE,
  CONTRACT_ORDER_CHANGE,
  UPDATE_NEW_CONTRACT_FIELD,
  CHAIN_GET_CONTRACT,
  SET_CONTRACT_STATUS,
  API_GET_DISPUTE,
  READ_ACTIVITY,
  SET_ACTIVITY_STATUS_READED,
  DELETE_ALL_CONTRACTS,
  RESET_ALL_CONTRACTS,
  DISPUTE_ARBITRATION,
  AMEND_DISPUTE_ARBITRATION
} from "../reducers/types";

import { log, arrayColumn } from "../utils/helpers"; // log helper

import contractStatuses from "../assets/i18n/en/status.json";

// Api layouts
import { Contracts } from "../api";

import {
  // getWallet,
  getNewContract,
  getCurrentContract,
  getContractListPage,
  getContractListOrder,
  getContractFilters,
  getCurrentProposal,
  getCurrentContractActivities
} from "./Selectors"; // selector

// Get
export function* getContract(action) {
  const { id, onSuccess, onError } = action;
  yield put({ type: CONTRACT_UPDATING, payload: true });

  try {
    const {
      data: {
        data,
        data: { details }
      }
    } = yield call(Contracts.get, { id }); // due missing data TODO: look at the attachments
    const { address } = data;

    // console.log('getContract ok',data);


    yield put({
      type: SET_CONTRACT,
      payload: { ...data, details: details.data }
    });
    if (address) {
      yield put({ type: CHAIN_GET_CONTRACT, address });
    }

    if (typeof onSuccess === "function") {
      onSuccess();
    } // exec onSuccess callback if present
  } catch (error) {

        // console.log('getContract - catch',error.response,error.response.status,action);


    yield put({ type: API_CATCH, error });

    if (error.response.status === 404 && error.response.config.headers.wallet !== null) {
      const { history } = action;
      history.push(`/contracts/`); // go to contracts list
    }

    if (typeof onError === "function") {
      onError(error);
    } // exec onError callback if present
  }
}

export function* getContractActivities(action) {
  let { type } = action;
  let id = null;

  console.log("getContractActivities", action);

  // retrieve correct id when SET_CONTRACT_STATUS or API_GET_DISPUTE action is dispatched
  if (type === SET_CONTRACT_STATUS || type === API_GET_DISPUTE) {
    id = action.id;
  } else {
    id = action.payload.id;
  }

  yield put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: true });

  if (id) {
    try {
      const response = yield call(Contracts.getActivities, { id });
      const { data } = response.data;
      log("getContract", response);
      yield put({ type: SET_CONTRACT_ACTIVITIES, payload: data });
    } catch (error) {
      // TODO: handle 404
      yield put({ type: API_CATCH, error });
      yield put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: false });
    }
  }
}

// Delete
export function* deleteContract(action) {
  yield put({ type: CONTRACT_UPDATING, payload: true });

  log("deleteContract - action", action);

  // proceed
  const { id } = action;
  try {
    const response = yield call(Contracts.delete, action);
    log("deleteContract - delete", response);
    yield put({ type: CONTRACT_DELETED, id });
  } catch (error) {
    log("deleteContract - error", error);
    yield put({ type: API_CATCH, error });
  }
}

export function* readActivities(action) {
  let activities = [];
  const { type } = action;
  console.log("readActivities - run", action);

  if (type === READ_NOTIFICATIONS) {
    // whole notifications
  } else {
    // contract activities only
    activities = yield select(getCurrentContractActivities);
  }

  console.log("readActivities - activities", activities);

  const filteredAcivities = activities.reduce(
    (acc, activity) => {
      activity.readed ? acc.old.push(activity) : acc.new.push(activity);
      return acc;
    },
    { old: [], new: [] }
  );

  console.log("readActivities - activities", filteredAcivities.new);
  // loop filtered activities new
}

export function* fetchContracts() {
  yield put({ type: CONTRACT_LIST_UPDATING, payload: true });
  yield put({ type: UPDATE_CONTRACT_FILTER, disabled: true });
  const { status, fromDate, toDate, searchText } = yield select(
    getContractFilters
  );
  const page = yield select(getContractListPage);

  const order = yield select(getContractListOrder);

  let orderby = {};
  order.forEach((ord) => {
    let fieldname = `orderBy[${ord.field}]`
    orderby[fieldname] = ord.type
  });

  log("contracts - filters", {
    status: status && typeof status.value !== "undefined" ? status.value : null,
    from: fromDate,
    to: toDate,
    q: searchText,
    page,
    ...orderby
  });
  try {
    const response = yield call(Contracts.list, {
      status:
        status && typeof status.value !== "undefined" ? status.value : null,
      from: fromDate,
      to: toDate,
      q: searchText,
      page,
      ...orderby
    });
    log("contracts - fetch", response);
    yield put({ type: CONTRACTS_FETCHED, payload: response.data });
    yield put({ type: UPDATE_CONTRACT_FILTER, disabled: false });
  } catch (error) {
    // TODO: handle 404
    yield put({ type: API_CATCH, error });
  }
}

// Create
export function* createContract(action) {
  log("createContract - run");
  const contractStoredData = yield select(getNewContract);
  const {
    statusId,
    statusLabel,
    kpi,
    resolution_proof,
    ...contractData
  } = contractStoredData;

  log("createContract - contractData", contractData);

  try {
    const response = yield call(Contracts.create, contractData);
    log("createContract - contract created", response);
    yield put({ type: SET_CONTRACT, payload: response.data.data });
    yield put({ type: FETCH_CONTRACTS });

    const { id } = response.data.data;
    const { history } = action;
    history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// Update
export function* updateContract(action) {
  log("updateContract - run");
  yield put({ type: CONTRACT_SAVING, payload: true });
  const {
    id,
    contractName,
    kpi,
    resolutionProof,
    category,
    value,
    whoPays,
    duration,
    hasPenaltyFee,
    partAPenaltyFee,
    partBPenaltyFee
  } = yield select(getCurrentContract);

  const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  const toUpdate = new FormData();
  // toUpdate.append('_method', 'PUT');
  if (contractName) {
    toUpdate.append("name", contractName);
  }
  if (kpi) {
    toUpdate.append("kpi", kpi);
  }
  if (resolutionProof) {
    toUpdate.append("resolution_proof", resolutionProof);
  }
  if (category) {
    toUpdate.append("category", category);
  }
  if (whoPays) {
    toUpdate.append("who_pays", whoPays);
  }
  toUpdate.append(
    "value",
    Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
  ); // always
  if (duration && duration.days) {
    toUpdate.append("duration_days", duration.days);
  }
  if (duration && duration.hours) {
    toUpdate.append("duration_hours", duration.hours);
  }
  if (duration && duration.minutes) {
    toUpdate.append("duration_minutes", duration.minutes);
  }
  toUpdate.append("has_penalty_fee", hasPenaltyFee ? 1 : 0); // always
  if (hasPenaltyFee) {
    if (partAPenaltyFee) {
      toUpdate.append(
        "part_a_penalty_fee",
        hasPenaltyFee && Number(partAPenaltyFee) <= Number(value)
          ? Number(partAPenaltyFee).toFixed(
              process.env.REACT_APP_TOKEN_DECIMALS
            )
          : Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
      ); // handle maximum value possibile
    }
    if (partBPenaltyFee) {
      toUpdate.append(
        "part_b_penalty_fee",
        hasPenaltyFee && Number(partBPenaltyFee) <= Number(value)
          ? Number(partBPenaltyFee).toFixed(
              process.env.REACT_APP_TOKEN_DECIMALS
            )
          : Number(value).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
      ); // handle maximum value possibile
    }
  } else {
    // reset penalty fees
    toUpdate.append("part_a_penalty_fee", zero);
    toUpdate.append("part_b_penalty_fee", zero);
  }
  toUpdate.append("in_case_of_dispute", "open"); // default

  for (let i = 0; i < action.attachments.length; i++) {
    // iteate over any file sent over appending the files to the form data.
    let file = action.attachments[i];

    toUpdate.append("attachments[" + i + "]", file);
  }
  // toUpdate.append("attachments[]", action.attachments);

  log("updateContract - contractData", toUpdate);

  try {
    const response = yield call(Contracts.update, toUpdate, id);
    log("updateContract - contract created", response);
    yield put({ type: SET_CONTRACT, payload: response.data.data });
    yield put({ type: FETCH_CONTRACTS });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations

    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  } catch (error) {
    yield put({ type: API_CATCH, error });
    if (typeof action.callback === "function") action.callback(); // invoke callback if needed
  }
}

// Delete media
export function* deleteContractMedia(action) {
  log("deleteContractMedia - run", action);

  const { type, ...params } = action;

  try {
    const response = yield call(Contracts.deleteMedia, params);
    log("deleteContractMedia - media deleted", response);
    yield put({ type: CONTRACT_MEDIA_DELETED, ...params });

    // const { history } = action;
    // history.push(`/contracts/detail/${id}`); // go to contract detail for furter operations
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// Reset
export function* onContractReset() {
  const user = yield select(getUser);
  yield put({
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_wallet",
    value: user.wallet
  });
  yield put({
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_name",
    value: user.show_fullname ? user.name : ""
  });
  yield put({
    type: UPDATE_NEW_CONTRACT_FIELD,
    field: "part_a_email",
    value: user.email
  });
}

export function* onContractDelete() {
  yield put({ type: FETCH_CONTRACTS });
  yield put({ type: SET_CONTRACT_CURRENT_PAGE, payload: 1 });
}

export function* onContractPageChange(action) {
  yield put({ type: SET_CONTRACT_CURRENT_PAGE, payload: action.payload });
  yield put({ type: CONTRACT_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_CONTRACTS });
}

export function* onContractSortChange(action) {
  yield put({ type: SET_CONTRACT_CURRENT_ORDER, payload: action.payload });
  yield put({ type: CONTRACT_LIST_UPDATING, payload: true });
  yield put({ type: FETCH_CONTRACTS });
}

export function* resetUpdating() {
  yield put({ type: CONTRACT_SAVING, payload: false });
  yield put({ type: CONTRACT_UPDATING, payload: false });
}

export function* handleContractIssues(action) {
  log("handleContractIssues - run", action);

  yield put({ type: CONTRACT_SAVING, payload: true });
  const proposal = yield select(getCurrentProposal);

  const { proposal_part_a, proposal_part_b, payed_at } = proposal;
  let { message } = proposal;
  const { issue, statusId, proposalAttachments, id } = action;

  log("handleContractIssues - proposal", proposal);

  let code = 21; // open friendly
  if (issue === "disputes") {
    code = statusId === 31 || statusId === 32 ? 32 : 31; // Open Dispute Dispersal vs Open Dispute
  }
  log("handleContractIssues – contractStatuses", contractStatuses);

  const nextStatus = contractStatuses.find(
    status => Number(status.value) === Number(code)
  );
  log("handleContractIssues – nextStatus", nextStatus);

  const { label: statusLabel } = nextStatus;
  log("handleContractIssues – NEXT statusLabel", statusLabel);

  const zero = Number(0).toFixed(process.env.REACT_APP_TOKEN_DECIMALS);

  let dispersal = [0, 0]; // define new dispersal
  let fee;

  const toSend = new FormData();
  // toSend.append('_method', 'PUT');

  // message filter
  if (typeof message === 'undefined' || message === null) message = '';

  if (message && message !== null) toSend.append("message", message);
  if (proposal_part_a) {
    fee = Number(proposal_part_a).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
    toSend.append(
      "proposal_part_a",
      fee
    );
    dispersal[0] = proposal_part_a
  } else {
    toSend.append("proposal_part_a", zero);
  }
  if (proposal_part_b) {
    fee = Number(proposal_part_b).toFixed(process.env.REACT_APP_TOKEN_DECIMALS)
    toSend.append(
      "proposal_part_b",
      fee
    );
    dispersal[1] = proposal_part_b
  } else {
    toSend.append("proposal_part_b", zero);
  }
  if (payed_at) {toSend.append("payed_at", payed_at);};
  if (code) {toSend.append("code", code);};

  if (proposalAttachments.files && proposalAttachments.files.length) {
    for (let i = 0; i < proposalAttachments.files.length; i++) {
      // iteate over any file sent over appending the files to the form data.
      let file = proposalAttachments.files[i];

      log("handleContractIssues - for each file", file);

      toSend.append("attachments[" + i + "]", file);
    }
    // toSend.append("attachments[]", proposalAttachments.files);
  }

  const callback = () => {
    if (typeof action.callback === "function") {
      action.callback();
    }
  } // invoke callback if needed

  // contract value + 1%
  log("handleContractIssues", "prompt issue",code);
  let resolve;
  if (code === 31) {
    resolve = yield put({ type: DISPUTE_ARBITRATION, id, dispersal, statusId, code, message, proposalAttachments, callback });
  } else {
    resolve = yield put({ type: AMEND_DISPUTE_ARBITRATION, id, dispersal, statusId, code, message, proposalAttachments, callback }); // new status still remain 31
  }
  log("handleContractIssues – issue resolved", resolve);
}

export function* onContractActivitiesSet(action) {
  yield put({ type: CONTRACT_NOTIFICATIONS_LOADING, payload: false }); // loading off

  console.log("onContractActivitiesSet - action", action);

  // set newactivities as read
  let { type } = action;
  let ids = [];
  const toRead = new FormData();

  if (type === READ_ACTIVITY) {
    const { activityId } = action;
    ids = [activityId];
  } else {
    ids = yield select(getCurrentContractActivities);
    ids = ids.filter((activity) => {
      return activity.readed === 0 || activity.readed === false;
    }); // gets only unreaded activities
    ids = arrayColumn(ids, "id");
  }

  console.log("onContractActivitiesSet - ids", ids);
  if (typeof ids !== "undefined" && ids.length > 0) {
    // only if needed

    ids.forEach((id) => toRead.append("ids[]", id));

    console.log("onContractActivitiesSet - toRead", toRead);

    try {
      const response = yield call(Contracts.readActivities, toRead);
      const { data } = response.data;
      log("onContractActivitiesSet - response", response);
      log("onContractActivitiesSet - response", ids);
      log("onContractActivitiesSet - response data", data);

      yield put({ type: SET_ACTIVITY_STATUS_READED, ids });
    } catch (error) {
      yield put({ type: API_CATCH, error });
    }
  }
}

export function* onDeleteAllContracts() {
  try {
    yield call(Contracts.deleteAll);
    yield put({ type: CONTRACT_DELETED });
    yield put({ type: RESET_ALL_CONTRACTS });
  } catch (error) {
    yield put({ type: API_CATCH, error });
  }
}

// spawn tasks base certain actions
export default function* contractSagas() {
  log("run", "contractSagas");
  yield takeLatest(NEW_CONTRACT, createContract);
  yield takeEvery(PUT_CONTRACT, updateContract);
  yield takeEvery(API_GET_CONTRACT, getContract);
  yield takeLatest(API_DELETE_CONTRACT, deleteContract);
  yield takeEvery(FETCH_CONTRACTS, fetchContracts);
  yield takeEvery(CONTRACT_ISSUE, handleContractIssues);
  yield takeLatest(CONTRACT_DELETED, onContractDelete);
  yield takeLatest(RESET_CONTRACT, onContractReset);
  yield takeLatest(API_CATCH, resetUpdating);
  yield takeLatest(SET_CONTRACT, resetUpdating);
  yield takeEvery(API_GET_DISPUTE, getContractActivities);
  yield takeEvery(SET_CONTRACT, getContractActivities);
  yield takeEvery(SET_CONTRACT_STATUS, getContractActivities);
  yield takeLatest(SET_CONTRACT_ACTIVITIES, onContractActivitiesSet);
  yield takeLatest(READ_ACTIVITY, onContractActivitiesSet);
  yield takeLatest(READ_NOTIFICATIONS, readActivities);
  yield takeLatest(CONTRACT_READ_NOTIFICATIONS, readActivities);
  yield takeLatest(CONTRACT_MEDIA_DELETE, deleteContractMedia);
  yield takeLatest(CONTRACT_PAGE_CHANGE, onContractPageChange);
  yield takeLatest(CONTRACT_ORDER_CHANGE, onContractSortChange);
  yield takeLatest(DELETE_ALL_CONTRACTS, onDeleteAllContracts);
}
