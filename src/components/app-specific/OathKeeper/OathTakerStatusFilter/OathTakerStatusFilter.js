import React from "react";
import "./OathTakerStatusFilter.scss";

import Form from "JurCommon/Form";
import { oathKeeperFilters } from "../../../../utils/helpers";

const options = Object.values(oathKeeperFilters.statuses).map(x => ({
  value: x,
  label: x
}));

const OathTakerStatusFilter = ({ onChange }) => (
  <Form.Select
    name="status"
    id="status"
    options={options}
    onChange={onChange}
    defaultValue={options[0]}
  />
);

export default OathTakerStatusFilter;
