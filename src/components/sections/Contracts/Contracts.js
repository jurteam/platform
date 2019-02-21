import React, { useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../../components/common/PageLayout";
import Main from "../../../components/common/Main";
import Aside from "../../../components/common/Aside";
import ContractsTable from "../../../components/common/ContractsTable";

import { log } from "../../../utils/helpers";
import { NEW_ARBITRATION } from "../../../reducers/types";

export const Contracts = () => {
  const { labels } = useContext(AppContext);

  const handleArchive = () => {
    log("Contracts", "handleArchive");
  };

  const newArbitration = () => {
    log("newArbitration", "run");
    global.drizzle.store.dispatch({ type: NEW_ARBITRATION });
  };

  const breadcrumbs = [
    {
      label: labels.contracts,
      active: true,
      to: "/contracts"
    }
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <ContractsTable
        headers={[
          { label: "Status", sortable: false },
          { label: "Contract Name", sortable: false },
          { label: "Duration", sortable: false }
        ]}
        data={[]}
        handleArchive={handleArchive}
        newContract={newArbitration}
      />
    </PageLayout>
  );
};
