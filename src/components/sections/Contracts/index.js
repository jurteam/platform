// import { connect } from "react-redux";
import { drizzleConnect } from "drizzle-react";
import { Contracts } from "./Contracts";

const mapStateToProps = (state) => ({ user: state.user });

export default drizzleConnect(Contracts, mapStateToProps);
