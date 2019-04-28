import React from "react";
import PropTypes from "prop-types";
import BlockTile from "../BlockTitle";

import "./ContractCategory.scss";

export const ContractCategory = props => (
  <div className="jur-contract-category">
    <BlockTile title="Category" description={props.categoryDescription} />
    {props.selectedCategories && (
      <div className="jur-contract-category__value">
        {props.selectedCategories.label}
      </div>
    )}
  </div>
);
