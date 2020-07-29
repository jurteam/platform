import React from "react";
import "./ViewStatusButton.scss";
import Button from "JurCommon/Button";
import { NavLink } from "react-router-dom";
import { mapLabelsToProps } from "../../../../utils/helpers";

const ViewStatusButton = ({ address, labels }) => (
  <NavLink to={`/advocates/${address}`}>
    <Button>{labels.viewProfile}</Button>
  </NavLink>
);

export default global.connection(ViewStatusButton, mapLabelsToProps);
