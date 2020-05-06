import React from "react";
import "./OathTakersFooter.scss";

import Pagination from "JurCommon/Pagination";
import Row from "JurCommon/Row";
import Expand from "JurCommon/Expand";
import Text from "JurCommon/Text";
import { OATH_KEEPER_FETCH_OATH_TAKERS } from "../../../../reducers/types";

const OathTakersFooter = ({ onPaginate, total, perPage, offset }) => (
  <Row>
    <Text>
      {offset * perPage + 1} to {offset * perPage + perPage} of {total}
    </Text>
    <Expand />
    <Pagination
      activePage={offset + 1}
      itemsCountPerPage={perPage}
      totalItemsCount={total}
      handlePageChange={onPaginate}
    />
  </Row>
);

const mapStateToProps = state => ({
  total: Number(state.oathKeeper.oathTakersMeta.total),
  perPage: Number(state.oathKeeper.oathTakersMeta.limit),
  offset: Number(state.oathKeeper.oathTakersMeta.offset)
});

const onPaginate = pageNumber => {
  const offset = pageNumber - 1;
  return { type: OATH_KEEPER_FETCH_OATH_TAKERS, payload: { page: { offset } } };
};

const mapDispatchToProps = { onPaginate };

export default global.connection(
  OathTakersFooter,
  mapStateToProps,
  mapDispatchToProps
);
