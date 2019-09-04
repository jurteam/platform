/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import SpinnerDOM from "./SpinnerDOM";

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;

    this.handleChange = this.handleChange.bind(this);

    this.unsubscribe = typeof this.store !== 'undefined' ? this.store.subscribe(this.handleChange) : null;

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

    return <SpinnerDOM loading={loading} />;
  }
}

export default Spinner;
