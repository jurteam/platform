import { drizzleConnect } from "drizzle-react";
import { CreateContractForm } from "./CreateContractForm";

import {
  updateContractField,
  createContract,
  resetContract
} from "../../../actions/Contracts"; // actions

const mapDispatchToProps = {
  updateContractField,
  createContract,
  resetContract
};
const mapStateToProps = state => ({
  contract: state.contract,
  user: state.user
});

export default drizzleConnect(
  CreateContractForm,
  mapStateToProps,
  mapDispatchToProps
);
