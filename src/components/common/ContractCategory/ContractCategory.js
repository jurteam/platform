import React, { useContext } from "react";

import BlockTile from "../BlockTitle";

import "./ContractCategory.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractCategory = ( props ) => {
  const { selectedCategories } = props;
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
