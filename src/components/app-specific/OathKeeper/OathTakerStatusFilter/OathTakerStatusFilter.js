import React from "react";
import "./OathTakerStatusFilter.scss";

import Dropdown from "JurCommon/Dropdown";

const OathTakerStatusFilter = () => (
  <Dropdown label="Select All">
    <Dropdown.Item>Select All</Dropdown.Item>
    <Dropdown.Item>On Going</Dropdown.Item>
    <Dropdown.Item>Completed</Dropdown.Item>
  </Dropdown>
);

export default OathTakerStatusFilter;
