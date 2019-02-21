import { DELETE_ALL_CONTRACTS, DELETE_ALL_DISPUTES } from "../reducers/types"; // get action types

export const deleteContracts = () => ({ type: DELETE_ALL_CONTRACTS });
export const deleteDisputes = () => ({ type: DELETE_ALL_DISPUTES });
