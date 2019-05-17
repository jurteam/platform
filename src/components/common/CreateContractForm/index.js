import { drizzleConnect } from "drizzle-react";
import { CreateContractForm } from "./CreateContractForm";

import { updateNewContractField, createContract, resetContract } from "../../../actions/Contracts"; // actions

const mapDispatchToProps = { updateNewContractField, createContract, resetContract };
const mapStateToProps = (state) => ({ contract: state.contract, user: state.user });

export default drizzleConnect(CreateContractForm, mapStateToProps, mapDispatchToProps);
