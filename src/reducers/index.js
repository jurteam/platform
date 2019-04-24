import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { drizzleReducers } from 'drizzle'
import app from "./App";
import user from "./User";
import wallet from "./Wallet";
import contract from "./Contract";
import dispute from "./Dispute";
import oracle from "./Oracle";

// Export root reducer
export default history =>
  combineReducers({
    router: connectRouter(history),
    app,
    user,
    wallet,
    contract,
    dispute,
    oracle,
    ...drizzleReducers
  });