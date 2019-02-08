import { drizzleConnect } from "drizzle-react";
import { Balance } from "./Balance";

const mapStateToProps = state => ({
  accounts: state.accounts,
  drizzleStatus: state.drizzleStatus,
  TutorialToken: state.contracts.TutorialToken
});

export default drizzleConnect(Balance, mapStateToProps);
