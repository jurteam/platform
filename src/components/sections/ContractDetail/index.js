import { withRouter } from 'react-router-dom'
import { drizzleConnect } from "drizzle-react";
import { ContractDetail } from "./ContractDetail";

const mapStateToProps = (state) => ({ contract: state.contract, user: state.user });

export default drizzleConnect(withRouter(ContractDetail), mapStateToProps);
