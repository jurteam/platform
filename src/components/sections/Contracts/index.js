import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { Contracts } from "./Contracts";

const mapStateToProps = (state) => ({ user: state.user, contract: state.contract });

export default drizzleConnect(withRouter(Contracts), mapStateToProps);
