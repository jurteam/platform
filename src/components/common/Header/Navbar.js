import React, { Component } from "react";
import { Link } from "react-router-dom";

// i18n
import lang from "./../../../assets/i18n/en.json";

export class Navbar extends Component {
  render() {
    return (
      <ul className="jur--navbar">
        <li>
          <Link to="/contracts">{lang.contracts}</Link>
        </li>
        <li>
          <Link to="/disputes">{lang.disputes}</Link>
        </li>
      </ul>
    );
  }
}
