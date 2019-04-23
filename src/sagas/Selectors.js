// Network
export const getNetwork = state => state.web3

// Connector
export const getDrizzleStatus = state => state.drizzleStatus
export const getContracts = state => state.contracts
export const getJURToken = state => state.contracts.JURToken

// Wallet
export const getAccounts = state => state.accounts
export const getWallet = state => state.wallet

// Contract
export const getContractFilters = state => state.contract.filters
export const getNewContract = state => state.contract.new
export const getCurrentContract = state => state.contract.current
export const getContractListPage = state => state.contract.page
export const getCurrentContractActivities = state => state.contract.current.activities

// Drizzle Contract
export const getDrizzleStoredContracts = state => state.contracts

// Dispute
export const getDisputeFilters = state => state.dispute.filters
export const getCurrentDispute = state => state.dispute.current
export const getDisputeListPage = state => state.dispute.page

// User
export const getUser = state => state.user