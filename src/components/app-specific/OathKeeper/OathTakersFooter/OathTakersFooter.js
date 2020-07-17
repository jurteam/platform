import React from "react";
import "./OathTakersFooter.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { from, to } from "../../../../utils/helpers";
import { OATH_KEEPER_FETCH_OATH_TAKERS } from "../../../../reducers/types";
import { getOathTakersPagination } from "../../../../sagas/Selectors";

const OathTakersFooter = ({ onPaginate, total, perPage, page }) => (
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
  total: Number(getOathTakersPagination(state).total),
  perPage: Number(getOathTakersPagination(state).per_page),
  page: Number(getOathTakersPagination(state).current_page)
});

const onPaginate = page => {
  return { type: OATH_KEEPER_FETCH_OATH_TAKERS, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

export default global.connection(
  OathTakersFooter,
  mapStateToProps,
  mapDispatchToProps
);
