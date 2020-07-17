import React from "react";
import "./AdvocatesSearchInput.scss";
import Form from "JurCommon/Form";
import { ADVOCATE_FETCH_ALL } from "../../../../reducers/types";

const AdvocatesSearchInput = ({ onChange }) => (
  <Form.Search className="jur-advocates-search-input" onChange={onChange} />
);

const onChange = query => ({
  type: ADVOCATE_FETCH_ALL,
  payload: { query }
});

const mapDispatchToProps = { onChange };

export default global.connection(
  AdvocatesSearchInput,
  null,
  mapDispatchToProps
);
