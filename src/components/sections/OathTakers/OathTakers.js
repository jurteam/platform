import React, { useEffect, useContext } from "react";
import "./OathTakers.scss";

import { AppContext } from "../../../bootstrap/AppProvider";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import OathTakersAnalytics from "../../app-specific/OathKeeper/OathTakersAnalytics";
import OathTakersIndex from "../../app-specific/OathKeeper/OathTakersIndex";
import { OATH_KEEPER_RESET_FILTERS } from "../../../reducers/types";

const OathTakers = ({ resetFilters }) => {
  useEffect(() => resetFilters, []);
  const { labels } = useContext(AppContext);

  const b = [
    {
      label: labels.myOaths,
      to: "/oath-keeper/my-oaths",
      exact: true
    },
    {
      label: labels.oathKeepingRank,
      to: "/oath-keeper/oath-takers"
    }
  ];

  return (
    <PageLayout breadcrumbs={b}>
      <Main>
        <OathTakersAnalytics />
        <OathTakersIndex />
      </Main>
    </PageLayout>
  );
};

const resetFilters = () => ({ type: OATH_KEEPER_RESET_FILTERS });

const mapDispatchToProps = { resetFilters };

export default global.connection(OathTakers, null, mapDispatchToProps);
