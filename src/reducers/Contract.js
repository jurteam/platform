import { NEW_CONTRACT, UPDATE_CONTRACT_FIELD, RESET_CONTRACT } from "./types";

const INITIAL_STATE = {
  updating: false,
  part_a_wallet: "",
  part_a_name: "",
  part_a_email: "",
  part_b_wallet: "",
  part_b_name: "",
  part_b_email: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Setters
    case NEW_CONTRACT:
      return { ...state, ...action.payload };

    // Updates
    case UPDATE_CONTRACT_FIELD:
      let toUpdate = {};
      toUpdate[action.field] = action.value;
      console.log(UPDATE_CONTRACT_FIELD, toUpdate);
      return { ...state, ...toUpdate };

    // Reset
    case RESET_CONTRACT:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
