import { withRouter } from "react-router-dom"

import { ContractDetail } from "./ContractDetail";

import { updateContractField, updateContract } from "../../../actions/Contracts"; // actions

const mapDispatchToProps = { updateContractField, updateContract };
const mapStateToProps = (state) => ({ contract: state.contract, user: state.user, wallet: state.wallet, contracts: state.contracts });

export default global.connection(withRouter(ContractDetail), mapStateToProps, mapDispatchToProps);
