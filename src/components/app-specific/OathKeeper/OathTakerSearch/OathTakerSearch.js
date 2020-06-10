import React from "react";
import "./OathTakerSearch.scss";

import Form from "JurCommon/Form";

const OathTakerSearch = ({ onChange }) => (
  <Form.Search className="jur-oath-taker-search" onChange={onChange} />
);
export default OathTakerSearch;
