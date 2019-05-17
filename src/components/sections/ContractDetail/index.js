import { withRouter } from "react-router-dom"
import { drizzleConnect } from "drizzle-react";
import { ContractDetail } from "./ContractDetail";

import { updateContractField, updateContract } from "../../../actions/Contracts"; // actions

const mapDispatchToProps = { updateContractField, updateContract };
const mapStateToProps = (state) => ({ contract: state.contract, user: state.user, wallet: state.wallet });

export default drizzleConnect(withRouter(ContractDetail), mapStateToProps, mapDispatchToProps);
