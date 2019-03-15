import {
  NEW_CONTRACT,
  UPDATE_CONTRACT_FIELD,
  RESET_CONTRACT,
  RESET_CONTRACTS
} from "./types";

const INITIAL_STATE = {
  updating: false,
  new: {
    part_a_wallet: "",
    part_a_public_name: "",
    part_a_email: "",
    part_b_wallet: "",
    part_b_public_name: "",
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
    in_case_of_dispute: "open"
  },
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    // case NEW_CONTRACT:
    //   return { ...state, new: { ...action.payload } };

    // Updates
    case UPDATE_CONTRACT_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      console.log(UPDATE_CONTRACT_FIELD, toUpdate);
      return { ...state, new: { ...state.new, ...toUpdate } };

    // Reset
    case RESET_CONTRACT:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        new: { ...INITIAL_STATE.new }
      };

    case RESET_CONTRACTS:
      return {
        ...state,
        updating: INITIAL_STATE.updating,
        list: { ...INITIAL_STATE.list }
      };

    default:
      return state;
  }
};
