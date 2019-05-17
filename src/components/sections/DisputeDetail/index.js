import { withRouter } from "react-router-dom"
import { drizzleConnect } from "drizzle-react";
import { DisputeDetail } from "./DisputeDetail";

import { updateVoteField } from "../../../actions/Contracts"; // actions

const mapDispatchToProps = { updateVoteField };
const mapStateToProps = (state) => ({ dispute: state.dispute, contract: state.contract, oracle: state.oracle, user: state.user, wallet: state.wallet });

export default drizzleConnect(withRouter(DisputeDetail), mapStateToProps, mapDispatchToProps);
