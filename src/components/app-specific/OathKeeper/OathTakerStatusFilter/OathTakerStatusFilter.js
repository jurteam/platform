import React from "react";
import "./OathTakerStatusFilter.scss";

import Form from "JurCommon/Form";
import { oathKeeperFilters } from "../../../../utils/helpers";

const OathTakerStatusFilter = ({ onChange }) => (
  <Form.Select
    isClearable={false}
    name="status"
    id="status"
    options={oathKeeperFilters.statuses}
    onChange={onChange}
    defaultValue={oathKeeperFilters.statuses[0]}
  />
);

export default OathTakerStatusFilter;
