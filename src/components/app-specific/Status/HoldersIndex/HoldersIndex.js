import React, { useEffect } from "react";
import "./HoldersIndex.scss";

import HoldersTable from "../HoldersTable";
import HoldersPagination from "../HoldersPagination";
import { getStautsHolders } from "../../../../sagas/Selectors";
import { STATUS_FETCH_HOLDERS } from "../../../../reducers/types";

const HoldersIndex = ({ holders, fetchHolders }) => {
  useEffect(() => {
    fetchHolders();
  }, []);

  return (
    <>
      <HoldersTable holders={holders} />
      <HoldersPagination />
    </>
  );
};

const fetchHolders = () => ({ type: STATUS_FETCH_HOLDERS });

const mapDispatchToProps = { fetchHolders };
const mapStateToProps = state => ({
  holders: getStautsHolders(state)
});

export default global.connection(
  HoldersIndex,
  mapStateToProps,
  mapDispatchToProps
);
