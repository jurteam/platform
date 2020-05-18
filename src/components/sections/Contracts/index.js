import { withRouter } from "react-router-dom"

import { Contracts } from "./Contracts";

const mapStateToProps = (state) => ({ user: state.user, contract: state.contract });

export default global.connection(withRouter(Contracts), mapStateToProps);
