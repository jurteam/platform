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
      to: "/profile/my-advocacy",
      exact: true
    },
    {
      label: labels.list,
      to: "/advocates/",
      exact: true
    },
    {
      label: "Details " + address,
      to: "/advocates/" + address
    }
  ];

  return (
    <PageLayout breadcrumbs={b}>
      <Main>
        <div className="jur-safe-margin">
          <AdvocateSection address={address} />
        </div>
      </Main>
    </PageLayout>
  );
};

export default global.connection(Advocates, null, null);
