import React, { useEffect } from "react";
import "./OathTakers.scss";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import OathTakersAnalytics from "../../app-specific/OathKeeper/OathTakersAnalytics";
import OathTakersIndex from "../../app-specific/OathKeeper/OathTakersIndex";
import { OATH_KEEPER_RESET_FILTERS } from "../../../reducers/types";

const OathTakers = ({ resetFilters }) => {
  useEffect(() => resetFilters, []);

  return (
    <PageLayout>
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
