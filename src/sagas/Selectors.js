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
export const getCurrentContract = state => state.contract.current

// User
export const getUser = state => state.user