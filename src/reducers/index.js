import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import app from "./App";
import wallet from "./Wallet";

// Export root reducer
export default history =>
  combineReducers({
    router: connectRouter(history),
    wallet,
    app
  });
