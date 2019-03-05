import React from 'react';
import PropTypes from 'prop-types';
import BlockTile from '../BlockTitle';

import './ContractCategory.scss';

export const ContractCategory = ({selectedCategories, categoryDescription}) => (
  <div className="jur-contract-category">
    <BlockTile title="Category" description={categoryDescription} />
    { selectedCategories &&
      <div className="jur-contract-category__value">{selectedCategories.label}</div>
    }
  </div>
);
