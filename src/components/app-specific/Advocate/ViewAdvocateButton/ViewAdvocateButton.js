import React from "react";
import "./ViewStatusButton.scss";
import Button from "JurCommon/Button";
import { NavLink } from "react-router-dom";

const ViewStatusButton = ({ address }) => (
  <NavLink to={`/advocates/${address}`}>
    <Button>View Profile</Button>
  </NavLink>
);

export default ViewStatusButton;
