import React, { useState, useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../common/PageLayout";
import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";
import ContractsTable from "../../common/ContractsTable";

import { log } from "../../../utils/helpers"; // log helper

import {
  NEW_ARBITRATION,
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const Contracts = props => {
  const { labels } = useContext(AppContext);

  const [ showModal, setShowModal ] = useState(false);

  const handleArchive = () => {
    log("Contracts", "handleArchive");
  };

  const newArbitration = () => {
    log("newArbitration", "run");
    const { history } = props;
    history.push("/contracts/new");
    // const {
    //   user: { disclaimer }
    // } = props;
    // if (disclaimer.optin) {
    //   global.drizzle.store.dispatch({ type: NEW_ARBITRATION });
    // } else {
    //   setShowModal(true); // show disclaimer modal
    //   global.drizzle.store.dispatch({ type: DISCLAIMER_MUST_BE_ACCEPTED });
    // }
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

      <ModalDiscliamer isOpen={showModal} onAccept={() => setShowModal(false)} onDecline={() => setShowModal(false)}/>

      <Disclaimer />
    </PageLayout>
  );
};
