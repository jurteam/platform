import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { Contracts } from "./Contracts";

const mapStateToProps = (state) => ({ user: state.user });

export default drizzleConnect(withRouter(Contracts), mapStateToProps);
