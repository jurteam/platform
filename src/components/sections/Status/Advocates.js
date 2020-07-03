import React, { useEffect, useContext } from "react";
// import "./Advocates.scss";

import { AppContext } from "../../../bootstrap/AppProvider";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import AdvocatesHeader from "../../app-specific/Advocate/AdvocatesHeader";
import AdvocatesIndex from "../../app-specific/Advocate/AdvocatesIndex";
import AdvocatesFooterBox from "../../app-specific/Advocate/AdvocatesFooterBox";
import { ADVOCATE_RESET_SORTS } from "../../../reducers/types";

const Advocates = ({ resetSorts }) => {
  useEffect(() => resetSorts, []);
  const { labels } = useContext(AppContext);

  const b = [
    {
      label: labels.advocate,
      to: "/advocates/my-advocasy",
      exact: true
    },
    {
      label: labels.list,
      to: "/advocates/"
    }
  ];

  return (
    <PageLayout breadcrumbs={b}>
      <Main className="jur-safe-margin">
        <AdvocatesHeader />
        <AdvocatesIndex />
        <AdvocatesFooterBox />
      </Main>
    </PageLayout>
  );
};

const resetSorts = () => ({ type: ADVOCATE_RESET_SORTS });

const mapDispatchToProps = { resetSorts };

export default global.connection(Advocates, null, mapDispatchToProps);
