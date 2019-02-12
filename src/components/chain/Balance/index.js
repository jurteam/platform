import { drizzleConnect } from "drizzle-react";
import { Balance } from "./Balance";

const mapStateToProps = state => {
  console.log("balance state", state);

  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    JURToken: state.contracts.JURToken
  };
};

export default drizzleConnect(Balance, mapStateToProps);
