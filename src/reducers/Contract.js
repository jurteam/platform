import {
  NEW_CONTRACT,
  UPDATE_CONTRACT_FIELD,
  RESET_CONTRACT,
  RESET_CONTRACTS
} from "./types";

const INITIAL_STATE = {
  updating: false,
  current: {
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
    in_case_of_dispute: "open",
    attachments: []
  },
  list: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters

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

    case NEW_CONTRACT:
    default:
      return state;
  }
};
