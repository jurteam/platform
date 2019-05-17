import { drizzleConnect } from "drizzle-react";
import { ProposalForm } from "./ProposalForm";

import { updateProposal, updateProposalField } from "../../../actions/Contracts"; // actions

const mapDispatchToProps = { updateProposal, updateProposalField };
const mapStateToProps = (state) => ({ user: state.user });

export default drizzleConnect(ProposalForm, mapStateToProps, mapDispatchToProps);
