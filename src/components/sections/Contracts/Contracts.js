import React, { useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../../components/common/PageLayout";
import Main from "../../../components/common/Main";
import Aside from "../../../components/common/Aside";

export const Contracts = () => {
  const { labels } = useContext(AppContext);

  const breadcrumbs = [
    {
      label: labels.contracts,
      active: true
    }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Main>Contracts Section</Main>
      <Aside>Contracts Aside</Aside>
    </PageLayout>
  );
};
