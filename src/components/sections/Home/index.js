import React from "react"; // eslint-disable-line no-unused-vars


// Components
import { Home } from "./Home";

// Actions
import { setTutorialViewed } from "../../../sagas/App";

const mapStateToProps = (state) => ({
  app: state.app,
  wallet: state.wallet,
  drizzleStatus: state.drizzleStatus
});

const mapDispatchToProps = { setTutorialViewed };

export default global.connection(Home, mapStateToProps, mapDispatchToProps);
