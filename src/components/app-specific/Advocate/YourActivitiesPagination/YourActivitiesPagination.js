import React from "react";
import "./YourActivitiesPagination.scss";

import PaginationRow from "JurCommon/PaginationRow";

import { ADVOCATE_FETCH_YOUR_ACTIVITIES } from "../../../../reducers/types";
import { getAdvocateYourActivitiesPagination } from "../../../../sagas/Selectors";

const YourActivitiesPagination = ({ onPaginate, meta }) => (
  <PaginationRow onPaginate={onPaginate} meta={meta} />
);

const onPaginate = page => {
  return { type: ADVOCATE_FETCH_YOUR_ACTIVITIES, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

const mapStateToProps = state => ({
  meta: getAdvocateYourActivitiesPagination(state)
});

export default global.connection(
  YourActivitiesPagination,
  mapStateToProps,
  mapDispatchToProps
);
