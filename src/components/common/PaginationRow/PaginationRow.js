import React from "react";
import "./PaginationRow.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { from, to } from "../../../utils/helpers";

const PaginationRow = ({ onPaginate, meta }) => {
  const { total, per_page, current_page } = meta;
  return (
    <Row className="jur-safe-margin">
      <Text>
        {from(current_page, per_page, total)} &mdash;{" "}
        {to(current_page, per_page, total)}{" "}
        <Text type="span" className="jur-text__mute">
          of {total}
        </Text>
      </Text>
      <Expand />
      <Pagination
        activePage={current_page}
        itemsCountPerPage={per_page}
        totalItemsCount={total}
        handlePageChange={onPaginate}
      />
    </Row>
  );
};

export default PaginationRow;
