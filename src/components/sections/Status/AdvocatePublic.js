import React, { useEffect, useContext } from "react";
// import "./Advocates.scss";

import { AppContext } from "../../../bootstrap/AppProvider";

import PageLayout from "JurCommon/PageLayout";
import Main from "JurCommon/Main";
import AdvocateSection from "./AdvocateSection";
import { getAddressFromUrl } from "../../../utils/AdvocateHelpers";

const Advocates = () => {
  const { labels } = useContext(AppContext);
  const address = getAddressFromUrl();

  const b = [
    {
      label: labels.advocate,
      to: "/advocates/" + address,
      exact: true
    },
    {
      label: labels.advocates,
      to: "/advocates/"
    }
  ];

  return (
    <PageLayout breadcrumbs={b}>
      <Main className="jur-safe-margin">
        <AdvocateSection />
      </Main>
    </PageLayout>
  );
};

export default global.connection(Advocates, null, null);
