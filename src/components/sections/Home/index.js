import React from "react";  // eslint-disable-line no-unused-vars
import { connect } from "react-redux";

// Components
import { Home } from "./Home";

// Actions
import { setTutorialViewed } from "../../../actions/App";

const mapStateToProps = state => {
  const { app, wallet } = state;
  return { app, wallet };
};

const mapDispatchToProps = () => ({ setTutorialViewed });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
