import React from "react";  // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";
import { Balance } from "./Balance";

const mapStateToProps = state => {
  console.log("balance state", state);

  return {
    accounts: state.accounts,
    contracts: state.contracts,
    drizzleStatus: state.drizzleStatus,
    JURToken: state.contracts.JURToken
  };
};

export default drizzleConnect(Balance, mapStateToProps);
