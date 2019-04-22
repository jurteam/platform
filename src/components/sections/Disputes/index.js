import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { Disputes } from "./Disputes";

const mapStateToProps = (state) => ({ user: state.user, dispute: state.dispute });

export default drizzleConnect(withRouter(Disputes), mapStateToProps);
