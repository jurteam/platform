import {
  NEW_CONTRACT,
  API_GET_CONTRACT,
  SET_CONTRACT,
  SET_CONTRACT_STATUS,
  SET_CONTRACT_ACTIVITIES,
  SET_CONTRACT_CURRENT_PAGE,
  API_DELETE_CONTRACT,
  UPDATE_CONTRACT_FILTER,
  UPDATE_CONTRACT_FIELD,
  UPDATE_PROPOSAL_FIELD,
  UPDATE_NEW_CONTRACT_FIELD,
  CONTRACT_DELETED,
  CONTRACTS_FETCHED,
  CONTRACT_SAVING,
  CONTRACT_PAYING,
  CONTRACT_UPDATING,
  CONTRACT_LIST_UPDATING,
  CONTRACT_NOTIFICATIONS_LOADING,
  CONTRACT_MEDIA_DELETE,
  CONTRACT_MEDIA_DELETED,
  RESET_CONTRACT,
  RESET_CONTRACTS
} from "./types";

const INITIAL_STATE = {
  saving: false,
  updating: false,
  paying: false,
  notificationLoading: false,
  updatingList: true,
  new: {
    part_a_wallet: "",
    part_a_name: "",
    part_a_email: "",
    part_b_wallet: "",
    part_b_name: "",
    part_b_email: "",
    statusId: 0,
    statusLabel: "Draft",
    kpi: "",
    resolution_proof: ""
  },
  current: {
    statusId: 0,
    statusLabel: "Draft",
    contractName: "",
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
    status: null,
    fromDate: null,
    toDate: null,
    searchText: null,
    disabled: false
  },
  list: [],
  page: 1,
  pagination: [],
  currentProposal: {
    message: null,
    proposal_part_a: null,
    proposal_part_b: null,
    payed_at: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_CONTRACT:
      return { ...state, current: action.payload };

    case CONTRACTS_FETCHED:
      console.log(CONTRACTS_FETCHED, action.payload);
      return { ...state, list: action.payload.data, pagination: action.payload.meta.pagination, updatingList: false };

    case SET_CONTRACT_CURRENT_PAGE:
      return { ...state, page: action.payload };

    case SET_CONTRACT_STATUS:
      console.log(SET_CONTRACT_STATUS, action);
      return { ...state, current: { ...state.current, statusId : action.statusId, statusLabel : action.statusLabel, statusUpdatedAt : action.statusUpdatedAt } };

    case SET_CONTRACT_ACTIVITIES:
      return { ...state, current: { ...state.current, activities : action.payload } };

    // Updates
    case UPDATE_CONTRACT_FILTER:
      let filtersToUpdate = {};
      filtersToUpdate[action.field] = action.value;
      return { ...state, filters: { ...state.filters, ...filtersToUpdate } };

    case UPDATE_NEW_CONTRACT_FIELD:
      let newToUpdate = {};
      newToUpdate[action.field] = action.value;
      return { ...state, new: { ...state.new, ...newToUpdate } };

    case UPDATE_PROPOSAL_FIELD:
      let proposalToUpdate = {};
      proposalToUpdate[action.field] = action.value;
      return { ...state, currentProposal: { ...state.currentProposal, ...proposalToUpdate } };

    case UPDATE_CONTRACT_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      return { ...state, current: { ...state.current, ...toUpdate } };

    case CONTRACT_UPDATING:
      return { ...state, updating: action.payload };

    case CONTRACT_PAYING:
      return { ...state, paying: action.payload };

    case CONTRACT_SAVING:
      return { ...state, saving: action.payload };

    case CONTRACT_NOTIFICATIONS_LOADING:
      return { ...state, notificationLoading: action.payload };

    case CONTRACT_LIST_UPDATING:
      return { ...state, updatingList: action.payload };

    case CONTRACT_MEDIA_DELETED:
      const updatedAttachments = state.current.attachments.data.filter(item => item.id !== action.id)
      return { ...state, current: { ...state.current, attachments: { data: updatedAttachments } } };

    // Reset
    case RESET_CONTRACT:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        new: { ...INITIAL_STATE.new },
        current: { ...INITIAL_STATE.current }
      };

    case RESET_CONTRACTS:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        list: { ...INITIAL_STATE.list }
      };

    case NEW_CONTRACT: // saga
    case API_GET_CONTRACT: // saga
    case API_DELETE_CONTRACT: // saga
    case CONTRACT_DELETED: // saga
    case CONTRACT_MEDIA_DELETE: // saga
    default:
      return state;
  }
};
