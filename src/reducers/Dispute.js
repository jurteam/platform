import {
  API_GET_DISPUTE,
  SET_DISPUTE,
  SET_DISPUTE_STATUS,
  SET_DISPUTE_CURRENT_PAGE,
  SET_DISPUTE_CURRENT_ORDER,
  API_DELETE_DISPUTE,
  UPDATE_DISPUTE_FILTER,
  UPDATE_DISPUTE_VOTE_FIELD,
  DISPUTE_DELETED,
  DISPUTES_FETCHED,
  DISPUTE_SAVING,
  DISPUTE_UPDATING,
  DISPUTE_LIST_UPDATING,
  DISPUTE_MEDIA_DELETE,
  DISPUTE_MEDIA_DELETED,
  RESET_DISPUTE,
  RESET_DISPUTES,
  RESET_ALL_DISPUTES,
  DISPUTE_DETAIL_PAGE,
  RESET_VOTE,
  DISPUTES_LIST_PAGE
} from "./types";

import { log } from "../utils/helpers";

const INITIAL_STATE = {
  saving: false,
  updating: false,
  updatingList: true,
  detailPage: false,
  listPage: false,
  current: {
    statusId: 0,
    statusLabel: "Draft",
    disputeName: "",
    duration: {
      days: "",
      hours: "",
      minutes: ""
    },
    // counterparties: [
    //   {
    //     wallet: "",
    //     name: "",
    //     email: ""
    //   },
    //   {
    //     wallet: "",
    //     name: "",
    //     email: ""
    //   }
    // ],
    kpi: "",
    resolution_proof: "",
    value: "",
    whoPays: null,
    in_case_of_dispute: "open",
    attachments: {
      data: []
    },
    activities: []
  },
  filters: {
    mine: false,
    status: null,
    fromDate: null,
    category: null,
    toDate: null,
    searchText: null,
    disabled: false
  },
  vote: {
    contract_id: null,
    message: null,
    oracle_wallet: null,
    wallet_part: null,
    amount: 0
  },
  list: [],
  page: 1,
  order: [],
  pagination: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_DISPUTE:
      return { ...state, current: action.payload, vote: INITIAL_STATE.vote };

    case DISPUTES_FETCHED:
      log(DISPUTES_FETCHED, action.payload);
      return {
        ...state,
        list: action.payload.data,
        pagination: action.payload.meta.pagination,
        updatingList: false
      };

    case DISPUTE_DETAIL_PAGE:
      log(DISPUTE_DETAIL_PAGE, action);
      return { 
        ...state, 
        detailPage: action.payload 
      };

    case DISPUTES_LIST_PAGE:
      log(DISPUTES_LIST_PAGE, action);
      return { 
        ...state, 
        listPage: action.payload 
      };

    case SET_DISPUTE_CURRENT_PAGE:
      return { ...state, page: action.payload };

    case SET_DISPUTE_CURRENT_ORDER:

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
  
    case SET_DISPUTE_STATUS:
      log(SET_DISPUTE_STATUS, action);
      return {
        ...state,
        current: {
          ...state.current,
          statusId: action.statusId,
          statusLabel: action.statusLabel,
          statusUpdatedAt: action.statusUpdatedAt
        },
        vote: INITIAL_STATE.vote
      };

    // Updates
    case UPDATE_DISPUTE_FILTER:
      let filtersToUpdate = {};
      filtersToUpdate[action.field] = action.value;
      return { ...state, filters: { ...state.filters, ...filtersToUpdate } };

    case UPDATE_DISPUTE_VOTE_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      return { ...state, vote: { ...state.vote, ...toUpdate } };

    case DISPUTE_UPDATING:
      return { ...state, updating: action.payload };

    case DISPUTE_SAVING:
      return { ...state, saving: action.payload };

    case DISPUTE_LIST_UPDATING:
      return { ...state, updatingList: action.payload };

    case DISPUTE_MEDIA_DELETED:
      const updatedAttachments = state.current.attachments.data.filter(
        item => item.id !== action.id
      );
      return {
        ...state,
        current: { ...state.current, attachments: { data: updatedAttachments } }
      };

    // Reset
    case RESET_VOTE:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        vote: { ...INITIAL_STATE.vote }
      };

    case RESET_DISPUTE:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        new: { ...INITIAL_STATE.new },
        current: { ...INITIAL_STATE.current }
      };

    case RESET_DISPUTES:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        list: { ...INITIAL_STATE.list }
      };

    case RESET_ALL_DISPUTES:
      return { ...INITIAL_STATE };

    case API_GET_DISPUTE: // saga
    case API_DELETE_DISPUTE: // saga
    case DISPUTE_DELETED: // saga
    case DISPUTE_MEDIA_DELETE: // saga
    default:
      return state;
  }
};
