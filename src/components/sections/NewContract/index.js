import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { NewContract } from "./NewContract";

const mapStateToProps = (state) => ({ user: state.user });

export default drizzleConnect(withRouter(NewContract), mapStateToProps);
