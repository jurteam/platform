import React from "react";
import "./HoldersPagination.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { from, to } from "../../../../utils/helpers";
import { STATUS_FETCH_HOLDERS } from "../../../../reducers/types";
import { getHoldersPagination } from "../../../../sagas/Selectors";

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

const mapStateToProps = state => ({
  total: Number(getHoldersPagination(state).total),
  perPage: Number(getHoldersPagination(state).per_page),
  page: Number(getHoldersPagination(state).current_page)
});

const onPaginate = page => {
  return { type: STATUS_FETCH_HOLDERS, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

export default global.connection(
  HoldersPagination,
  mapStateToProps,
  mapDispatchToProps
);
