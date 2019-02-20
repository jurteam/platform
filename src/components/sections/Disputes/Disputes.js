import React, { useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../../components/common/PageLayout";
import Main from "../../../components/common/Main";
import Aside from "../../../components/common/Aside";

export const Disputes = () => {
  const { labels } = useContext(AppContext);

  const breadcrumbs = [
    {
      label: labels.disputes,
      active: true
    }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Main>Disputes Section</Main>
      <Aside>Disputes Aside</Aside>
    </PageLayout>
  );
};
