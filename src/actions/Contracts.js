import {
  DELETE_ALL_CONTRACTS,
  DELETE_ALL_DISPUTES,
  UPDATE_CONTRACT_FIELD,
  UPDATE_PROPOSAL_FIELD,
  UPDATE_NEW_CONTRACT_FIELD,
  UPDATE_DISPUTE_VOTE_FIELD,
  NEW_CONTRACT,
  PUT_CONTRACT,
  PUT_PROPOSAL,
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
export const updateVoteField = (field, value) => ({
  type: UPDATE_DISPUTE_VOTE_FIELD,
  field,
  value
});

export const updateProposal = () => ({ type: PUT_PROPOSAL });
export const updateProposalField = (field, value) => ({
  type: UPDATE_PROPOSAL_FIELD,
  field,
  value
});

export const resetContract = () => ({ type: RESET_CONTRACT });
