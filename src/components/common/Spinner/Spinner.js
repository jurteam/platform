/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import src from "../../../assets/loading.gif";
import "./Spinner.scss"; // load scss properly

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;

    this.handleChange = this.handleChange.bind(this);

    this.unsubscribe = this.store.subscribe(this.handleChange);

    this.state = {
      loading: true
    };
  }

  componentWillUnmount() {
    this.unsubscribe(); // unsubscribe from store changes
  }

  handleChange() {
    const {
      app: { loading }
    } = this.store.getState();
    if (this.state.loading !== loading) this.setState({ loading });
  }

  render() {
    const { loading } = this.state;

    return (
      <div className={`jur--spinner${loading ? "" : " off"}`}>
        <img src={src} alt="Loading..." />
      </div>
    );
  }
}

export default Spinner;
