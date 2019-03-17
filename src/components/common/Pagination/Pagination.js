import React from "react";
import PropTypes from "prop-types";
import ReactPagination from "react-js-pagination";
import { CaretDownIcon } from "../Icons/CaretDownIcon";
import "./Pagination.scss";

export const Pagination = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  handlePageChange,
  getPageUrl,
  ...rest
}) => {
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
