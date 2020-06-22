import React, { useEffect, useContext } from "react";
// import "./StatusHolders.scss";

import { AppContext } from "../../../bootstrap/AppProvider";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import HoldersHeader from "../../app-specific/Status/HoldersHeader";
import HoldersIndex from "../../app-specific/Status/HoldersIndex";
import HoldersFooterBox from "../../app-specific/Status/HoldersFooterBox";
import { STATUS_RESET_SORTS } from "../../../reducers/types";

const StatusHolders = ({ resetSorts }) => {
  useEffect(() => resetSorts, []);
  const { labels } = useContext(AppContext);

  const b = [
    {
      label: labels.myStatus,
      to: "/status/my-status",
      exact: true
    },
    {
      label: labels.jurStatus,
      to: "/status/holders"
    }
  ];

  return (
    <PageLayout breadcrumbs={b}>
      <Main className="jur-safe-margin">
        <HoldersHeader />
        <HoldersIndex />
        <HoldersFooterBox />
      </Main>
    </PageLayout>
  );
};

const resetSorts = () => ({ type: STATUS_RESET_SORTS });

const mapDispatchToProps = { resetSorts };

export default global.connection(StatusHolders, null, mapDispatchToProps);
