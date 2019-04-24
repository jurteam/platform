import {
  API_GET_DISPUTE,
  SET_DISPUTE,
  SET_DISPUTE_STATUS,
  SET_DISPUTE_CURRENT_PAGE,
  API_DELETE_DISPUTE,
  UPDATE_DISPUTE_FILTER,
  UPDATE_DISPUTE_FIELD,
  DISPUTE_DELETED,
  DISPUTES_FETCHED,
  DISPUTE_SAVING,
  DISPUTE_UPDATING,
  DISPUTE_LIST_UPDATING,
  DISPUTE_MEDIA_DELETE,
  DISPUTE_MEDIA_DELETED,
  RESET_DISPUTE,
  RESET_DISPUTES
} from "./types";

const INITIAL_STATE = {
  saving: false,
  updating: false,
  updatingList: true,
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
  list: [],
  page: 1,
  pagination: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_DISPUTE:
      return { ...state, current: action.payload };

    case DISPUTES_FETCHED:
      console.log(DISPUTES_FETCHED, action.payload);
      return { ...state, list: action.payload.data, pagination: action.payload.meta.pagination, updatingList: false };

    case SET_DISPUTE_CURRENT_PAGE:
      return { ...state, page: action.payload };

    case SET_DISPUTE_STATUS:
      console.log(SET_DISPUTE_STATUS, action);
      return { ...state, current: { ...state.current, statusId : action.statusId, statusLabel : action.statusLabel, statusUpdatedAt : action.statusUpdatedAt } };

    // Updates
    case UPDATE_DISPUTE_FILTER:
      let filtersToUpdate = {};
      filtersToUpdate[action.field] = action.value;
      return { ...state, filters: { ...state.filters, ...filtersToUpdate } };

    case UPDATE_DISPUTE_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      return { ...state, current: { ...state.current, ...toUpdate } };

    case DISPUTE_UPDATING:
      return { ...state, updating: action.payload };

    case DISPUTE_SAVING:
      return { ...state, saving: action.payload };

    case DISPUTE_LIST_UPDATING:
      return { ...state, updatingList: action.payload };

    case DISPUTE_MEDIA_DELETED:
      const updatedAttachments = state.current.attachments.data.filter(item => item.id !== action.id)
      return { ...state, current: { ...state.current, attachments: { data: updatedAttachments } } };

    // Reset
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

    case API_GET_DISPUTE: // saga
    case API_DELETE_DISPUTE: // saga
    case DISPUTE_DELETED: // saga
    case DISPUTE_MEDIA_DELETE: // saga
    default:
      return state;
  }
};
