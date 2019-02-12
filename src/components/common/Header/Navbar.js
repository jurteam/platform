import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <ul className="jur--navbar">
        <li>
          <Link to="/contracts">contracts</Link>
        </li>
        <li>
          <Link to="/disputes">disputes</Link>
        </li>
      </ul>
    );
  }
}
