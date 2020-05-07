import React from "react";
import "./OathTakerStatusFilter.scss";

import Form from "JurCommon/Form";

const OPTIONS = ["Select All", "On Going", "Completed"].map(x => ({
  value: x,
  label: x
}));

const OathTakerStatusFilter = () => (
  <Form.Select name="status" id="status" options={OPTIONS} />
);

export default OathTakerStatusFilter;
