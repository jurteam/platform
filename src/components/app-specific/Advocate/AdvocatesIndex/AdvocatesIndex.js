import React, { useEffect } from "react";
import "./AdvocatesIndex.scss";

import AdvocatesTable from "../AdvocatesTable";
import AdvocatesPagination from "../AdvocatesPagination";
import { getAdvocates } from "../../../../sagas/Selectors";
import { ADVOCATE_FETCH_ALL } from "../../../../reducers/types";

const AdvocatesIndex = ({ advocates, fetchAdvocates }) => {
  useEffect(() => {
    fetchAdvocates();
  }, []);

  return (
    <>
      <AdvocatesTable advocates={advocates} />
      <AdvocatesPagination />
    </>
  );
};

const fetchAdvocates = () => ({ type: ADVOCATE_FETCH_ALL });

const mapDispatchToProps = { fetchAdvocates };
const mapStateToProps = state => ({
  advocates: getAdvocates(state)
});

export default global.connection(
  AdvocatesIndex,
  mapStateToProps,
  mapDispatchToProps
);
