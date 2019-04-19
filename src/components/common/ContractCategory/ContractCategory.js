import React, { useContext } from "react";
import PropTypes from "prop-types";
import BlockTile from "../BlockTitle";

import "./ContractCategory.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractCategory = ({ selectedCategories }) => {
  const { labels } = useContext(AppContext);
  return (
    <div className="jur-contract-category">
      <BlockTile
        title={labels.category}
        description={labels.categoryDescription}
      />
      {selectedCategories && (
        <div className="jur-contract-category__value">
          {selectedCategories.label}
        </div>
      )}
    </div>
  );
};
