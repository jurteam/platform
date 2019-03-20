import {
  DELETE_ALL_CONTRACTS,
  DELETE_ALL_DISPUTES,
  UPDATE_CONTRACT_FIELD,
  UPDATE_NEW_CONTRACT_FIELD,
  NEW_CONTRACT,
  PUT_CONTRACT,
  RESET_CONTRACT
} from "../reducers/types"; // get action types

export const deleteContracts = () => ({ type: DELETE_ALL_CONTRACTS });
export const deleteDisputes = () => ({ type: DELETE_ALL_DISPUTES });

export const createContract = () => ({ type: NEW_CONTRACT });

export const updateContract = () => ({ type: PUT_CONTRACT });
export const updateContractField = (field, value) => ({
  type: UPDATE_CONTRACT_FIELD,
  field,
  value
});
export const updateNewContractField = (field, value) => ({
  type: UPDATE_NEW_CONTRACT_FIELD,
  field,
  value
});

export const resetContract = () => ({ type: RESET_CONTRACT });
