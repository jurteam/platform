import React, { useContext } from "react";
import PropTypes from "prop-types";
import categories from "../../../assets/i18n/en/contractCategories.json"; // TODO: i18n
import Form from "../Form";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractSelectCategory.scss";

export const ContractSelectCategory = props => {
  const { onChange, category, ...params } = props;
  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-select-category">
      <div className="jur-contract-select-category__title">{`${
        labels.category
      }:`}</div>
      <Form.Select
        options={categories}
        error={params.hasError("category")}
        onChange={input => onChange("category", input)}
        value={categories.filter(option => option.value === category)}
        {...params}
      />
    </div>
  );
};
