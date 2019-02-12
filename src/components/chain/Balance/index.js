import { drizzleConnect } from "drizzle-react";
import { Balance } from "./Balance";

const mapStateToProps = state => ({
  accounts: state.accounts,
  drizzleStatus: state.drizzleStatus,
  JURToken: state.contracts.JURToken
});

export default drizzleConnect(Balance, mapStateToProps);
