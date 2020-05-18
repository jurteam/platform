import { withRouter } from "react-router-dom"

import { Disputes } from "./Disputes";

const mapStateToProps = (state) => ({ user: state.user, dispute: state.dispute });

export default global.connection(withRouter(Disputes), mapStateToProps);
