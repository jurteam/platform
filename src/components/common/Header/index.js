import React from "react";  // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";
import { Header } from "./Header";

const mapStateToProps = state => ({ app: state.app, drizzleStatus: state.drizzleStatus })

export default drizzleConnect(Header, mapStateToProps);
