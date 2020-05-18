import { withRouter } from "react-router-dom"

import { NewContract } from "./NewContract";

const mapStateToProps = (state) => ({ user: state.user });

export default global.connection(withRouter(NewContract), mapStateToProps);
