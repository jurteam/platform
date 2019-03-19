import React, { useState, useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import Page from "../../common/Page";
import Header from "../../common/Header";
import SubHeader from "../../common/SubHeader";
import Breadcrumbs from "../../common/Breadcrumbs";
import Content from "../../common/Content";
import Button from "../../common/Button";

import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";

import Main from "../../common/Main";

import DataLostModal from "../../common/DataLostModal";
import ContractsTable from "../../common/ContractsTable";

import { log } from "../../../utils/helpers"; // log helper

import { DISCLAIMER_MUST_BE_ACCEPTED } from "../../../reducers/types";

export const Contracts = props => {
  const { labels, contractTableHeaders } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [showDataLostModal, setShowDataLostModal] = useState(false);

  const { contract } = props;
  log("Contracts - contract", contract);

  const handleArchive = () => {
    log("Contracts", "handleArchive");
  };

  const newContract = () => {
    const {
      user: { disclaimer }
    } = props;
    if (disclaimer.optin) {
      const { history } = props;
      history.push("/contracts/new");
    } else {
      setShowModal(true); // show disclaimer modal
      global.drizzle.store.dispatch({ type: DISCLAIMER_MUST_BE_ACCEPTED });
    }
  };

  const breadcrumbs = [
    {
      label: labels.contracts,
      active: true,
      to: "/contracts"
    }
  ];

  return (
    <Page>
      <Header />
      <SubHeader>
        <Breadcrumbs crumbList={breadcrumbs} />
        <Button variant="contained" onClick={newContract}>
          {labels.newContract}
        </Button>
      </SubHeader>
      <Content>
        <Main>
          <ContractsTable
            headers={contractTableHeaders}
            data={contract.list}
            handleArchive={handleArchive}
            newContract={newContract}
          />
        </Main>

        <DataLostModal
          isOpen={showDataLostModal}
          onAccept={archive}
          onDecline={() => setShowDataLostModal(false)}
        />

        <ModalDiscliamer
          isOpen={showModal}
          onAccept={() => setShowModal(false)}
          onDecline={() => setShowModal(false)}
        />

        <Disclaimer />
      </Content>
    </Page>
  );
};
