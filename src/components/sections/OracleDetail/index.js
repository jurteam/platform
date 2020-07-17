import { withRouter } from "react-router-dom"

import { OracleDetail } from "./OracleDetail";

const mapStateToProps = (state) => ({ dispute: state.dispute, contract: state.contract, oracle: state.oracle, user: state.user, wallet: state.wallet });

export default global.connection(withRouter(OracleDetail), mapStateToProps);
