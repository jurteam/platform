   import {
  NEW_CONTRACT,
  API_GET_CONTRACT,
  SET_CONTRACT,
  API_DELETE_CONTRACT,
  UPDATE_CONTRACT_FIELD,
  CONTRACT_DELETED,
  CONTRACTS_FETCHED,
  RESET_CONTRACT,
  RESET_CONTRACTS
} from "./types";

const INITIAL_STATE = {
  updating: false,
  current: {
    part_a_wallet: "",
    part_a_name: "",
    part_a_email: "",
    part_b_wallet: "",
    part_b_name: "",
    part_b_email: "",
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
    attachments: []
  },
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case SET_CONTRACT:
      return { ...state, current: action.payload };

    case CONTRACTS_FETCHED:
      console.log(CONTRACTS_FETCHED, action.payload);
      return { ...state, list: action.payload };

    // Updates
    case UPDATE_CONTRACT_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      console.log(UPDATE_CONTRACT_FIELD, toUpdate);
      return { ...state, current: { ...state.current, ...toUpdate } };

    // Reset
    case RESET_CONTRACT:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
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
    default:
      return state;
  }
};
