import React from "react";
import "./HoldersPagination.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { from, to } from "../../../../utils/helpers";

const HoldersPagination = ({ onPaginate, total, perPage, page }) => (
  <Row className="jur-safe-margin">
    <Text>
      {from(page, perPage, total)} &mdash; {to(page, perPage, total)}{" "}
      <Text type="span" className="jur-text__mute">
        of {total}
      </Text>
    </Text>
    <Expand />
    <Pagination
      activePage={page}
      itemsCountPerPage={perPage}
      totalItemsCount={total}
      handlePageChange={onPaginate}
    />
  </Row>
);

export default HoldersPagination;
