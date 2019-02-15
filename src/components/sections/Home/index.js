import React from "react";  // eslint-disable-line no-unused-vars
import { drizzleConnect } from "drizzle-react";

// Components
import { Home } from "./Home";

// Actions
import { setTutorialViewed } from "../../../actions/App";

const mapStateToProps = state => {
  const { app, wallet } = state;
  return { app, wallet };
};

const mapDispatchToProps = () => ({ setTutorialViewed });

export default drizzleConnect(Home,
  mapStateToProps,
  mapDispatchToProps);
