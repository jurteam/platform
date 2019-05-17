import React from "react";

import ReactPagination from "react-js-pagination";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import "./Pagination.scss";

export const Pagination = ( props ) => {
  const {
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    handlePageChange,
    getPageUrl,
    ...rest
  } = props;
  return (
    <div className="jur-pagination">
      <ReactPagination
        hideFirstLastPages
        pageRangeDisplayed={4}
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        onChange={handlePageChange}
        getPageUrl={getPageUrl}
        nextPageText={<CaretDownIcon />}
        prevPageText={<CaretDownIcon />}
        {...rest}
      />
    </div>
  );
};
