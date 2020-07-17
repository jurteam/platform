import React from "react";
import "./AvailablePagination.scss";
import PaginationRow from "JurCommon/PaginationRow";
import { getAdvocateAvailablePagination } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_AVAILABLE } from "../../../../reducers/types";

const AvailablePagination = ({ onPaginate, meta }) => (
  <PaginationRow onPaginate={onPaginate} meta={meta} />
);

const onPaginate = page => {
  return { type: ADVOCATE_FETCH_AVAILABLE, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

const mapStateToProps = state => ({
  meta: getAdvocateAvailablePagination(state)
});

export default global.connection(
  AvailablePagination,
  mapStateToProps,
  mapDispatchToProps
);
