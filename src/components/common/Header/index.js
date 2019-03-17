import React from "react";
import { drizzleConnect } from "drizzle-react";
import { Header } from "./Header";
import Logo from "../Logo";

const mapStateToProps = state => ({ wallet: state.wallet, user: state.user, app: state.app });

export default drizzleConnect(Header, mapStateToProps);

export const FakeHeader = () => (
  <Header>
    <Logo />
  </Header>
);
