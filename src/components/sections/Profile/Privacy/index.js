
import Privacy from "./Privacy";

import { deleteContracts, deleteDisputes, disclaimerAccept, disclaimerDecline } from "../../../../actions"; // actions

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = { deleteContracts, deleteDisputes, disclaimerAccept, disclaimerDecline };

export default global.connection(Privacy, mapStateToProps, mapDispatchToProps);
