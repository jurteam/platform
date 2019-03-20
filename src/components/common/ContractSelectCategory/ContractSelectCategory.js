import React from "react";
import PropTypes from "prop-types";
import categories from "../../../assets/categories.json";
import Form from "../Form";

import "./ContractSelectCategory.scss";

export const ContractSelectCategory = ({ onChange }) => (
  <div className="jur-contract-select-category">
    <div className="jur-contract-select-category__title">Category:</div>
    <Form.Select options={categories} onChange={ev => onChange(ev)} />
  </div>
);
