import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { DisputeDetail } from "./DisputeDetail";

const mapStateToProps = (state) => ({ dispute: state.dispute, contract: state.contract, oracle: state.oracle, user: state.user, wallet: state.wallet });

export default drizzleConnect(withRouter(DisputeDetail), mapStateToProps);
