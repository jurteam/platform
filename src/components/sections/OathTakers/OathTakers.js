import React from "react";
import "./OathTakers.scss";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import OathTakersAnalytics from "../../app-specific/OathKeeper/OathTakersAnalytics";
import OathTakersIndex from "../../app-specific/OathKeeper/OathTakersIndex";

const OathTakers = () => (
  <PageLayout>
    <Main>
      <OathTakersAnalytics />
      <OathTakersIndex />
    </Main>
  </PageLayout>
);

export default OathTakers;
