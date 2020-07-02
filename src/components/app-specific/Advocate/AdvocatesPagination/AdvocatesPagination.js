import React from "react";
import "./AdvocatesPagination.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { from, to } from "../../../../utils/helpers";
import { ADVOCATE_FETCH_ALL } from "../../../../reducers/types";
import { getAdvocatesPagination } from "../../../../sagas/Selectors";

const AdvocatesPagination = ({ onPaginate, total, perPage, page }) => (
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
  total: Number(getAdvocatesPagination(state).total),
  perPage: Number(getAdvocatesPagination(state).per_page),
  page: Number(getAdvocatesPagination(state).current_page)
});

const onPaginate = page => {
  return { type: ADVOCATE_FETCH_ALL, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

export default global.connection(
  AdvocatesPagination,
  mapStateToProps,
  mapDispatchToProps
);
