import React from "react";
import "./RewardsPagination.scss";
import PaginationRow from "JurCommon/PaginationRow";
import { getAdvocateRewardsPagination } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_REWARDS } from "../../../../reducers/types";

const RewardsPagination = ({ onPaginate, meta }) => (
  <PaginationRow onPaginate={onPaginate} meta={meta} />
);

const onPaginate = page => {
  return { type: ADVOCATE_FETCH_REWARDS, payload: { page } };
};

const mapDispatchToProps = { onPaginate };

const mapStateToProps = state => ({
  meta: getAdvocateRewardsPagination(state)
});

export default global.connection(
  RewardsPagination,
  mapStateToProps,
  mapDispatchToProps
);
