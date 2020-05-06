// Network
export const getNetwork = state => state.web3;

// Connector
export const getDrizzleStatus = state => state.drizzleStatus;
export const getContracts = state => state.contracts;
export const getJURToken = state => state.contracts.JURToken;

// Wallet
export const getAccounts = state => state.accounts;
export const getWallet = state => state.wallet;

// Contract
export const getContractFilters = state => state.contract.filters;
export const getNewContract = state => state.contract.new;
export const getCurrentContract = state => state.contract.current;
export const getCurrentProposal = state => state.contract.currentProposal;
export const getContractListPage = state => state.contract.page;
export const getContractdetailPage = state => state.contract.detailPage;
export const getContractIsListPage = state => state.contract.listPage;
export const getContractList = state => state.contract.list;
export const getContractListOrder = state => state.contract.order;
export const getContractPageSize = state => state.contract.pagination.per_page;
export const getCurrentContractActivities = state =>
  state.contract.current.activities;

// Drizzle Contract
export const getDrizzleStoredContracts = state => state.contracts;

// Dispute
export const getDisputeFilters = state => state.dispute.filters;
export const getCurrentDispute = state => state.dispute.current;
export const getDisputeListPage = state => state.dispute.page;
export const getDisputeList = state => state.dispute.list;
export const getDisputedetailPage = state => state.dispute.detailPage;
export const getDisputeIsListPage = state => state.dispute.listPage;
export const getDisputePageSize = state => state.dispute.pagination.per_page;
export const getDisputeListOrder = state => state.dispute.order;

// Oracle
export const getOracleOrder = state => state.oracle.order;
export const getOracleListPage = state => state.oracle.page;
export const getOracleListOrder = state => state.oracle.order;
export const getOracleCurrentList = state => state.oracle.currentList;
export const getOracleList = state => state.oracle.list;
export const getOracleIsListPage = state => state.oracle.listPage;

// Transactions
export const getTransactionsList = state => state.transaction.waiting;
export const getTransactionsLastBlock = state =>
  state.transaction.lastBlockNumber;

// User
export const getUser = state => state.user;

// Oath Keeper
export const getNewOath = state => ({
  amount: state.oathKeeper.amount,
  lockInPeriod: state.oathKeeper.lockInPeriod,
  acceptTnC: state.user.acceptTnC
});

export const getMyOaths = state => state.oathKeeper.myOaths;

export const getAnalytics = (state, card) =>
  (state.oathKeeper.analytics[card] || {}).attributes || {};

export const getAnalyticsMeta = (state, card) =>
  state.oathKeeper.analyticsMeta[card];

export const getGraphAnalytics = (state, card, chart = "line") => {
  const analytics = getAnalytics(state, card);
  const graphData = analytics.graph;
  if (!graphData) return undefined;

  if (chart === "pie")
    return graphData.map(point => ({
      id: point[0],
      label: point[0],
      value: point[1]
    }));

  if (chart === "line")
    return [
      {
        id: card,
        color: analytics.delta < 0 ? "red" : "green",
        data: graphData.map(point => ({ x: point[0], y: point[1] }))
      }
    ];
};
