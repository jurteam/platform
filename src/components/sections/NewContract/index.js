// import { connect } from "react-redux";
import { drizzleConnect } from "drizzle-react";
import { NewContract } from "./NewContract";

const mapStateToProps = (state) => ({ user: state.user });

export default drizzleConnect(NewContract, mapStateToProps);
