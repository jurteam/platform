import React, { useState, useEffect, useContext } from "react";

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

import {
  FETCH_CONTRACTS,
  UPDATE_CONTRACT_FILTER,
  API_DELETE_CONTRACT,
  CONTRACT_PAGE_CHANGE,
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const Contracts = props => {
  const { labels, contractTableHeaders } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [showDataLostModal, setShowDataLostModal] = useState(false);
  const [contractToArchive, setContractToArchive] = useState(null);

  // // cDM
  // useEffect(() => {
  //   global.drizzle.store.dispatch({ type: FETCH_CONTRACTS });
  // }, []);

  const { contract } = props;
  log("Contracts - contract", contract);

  const { pagination } = contract;

  // filters
  const { disabled: filtersDisabled, ...filters } = contract.filters;
  const handleFilterChange = (type, value) => {
    global.drizzle.store.dispatch({
      type: UPDATE_CONTRACT_FILTER,
      field: type,
      value
    });
  };
  const handleFilterSubmit = () => {
    global.drizzle.store.dispatch({ type: FETCH_CONTRACTS });
  };

  const handleArchive = contractId => {
    console.log("Contracts", "handleArchive", contractId);

    setContractToArchive(contractId);
    setShowDataLostModal(true);
  };

  const archive = () => {
    setShowDataLostModal(false);

    global.drizzle.store.dispatch({
      type: API_DELETE_CONTRACT,
      id: contractToArchive
    });
    setContractToArchive(null);
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

  const onPageChange = page => {
    global.drizzle.store.dispatch({
      type: CONTRACT_PAGE_CHANGE,
      payload: page
    });
  };

  const breadcrumbs = [
    {
      label: labels.smartContracts,
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
            filters={filters}
            filtersDisabled={filtersDisabled}
            handleFilterChange={handleFilterChange}
            handleFilterSubmit={handleFilterSubmit}
            headers={contractTableHeaders}
            data={contract.list}
            handleArchive={handleArchive}
            newContract={newContract}
            initialPage={pagination.current_page}
            onPageChange={pageNo => onPageChange(pageNo)}
            contractsPerPage={pagination.per_page}
            totalContracts={pagination.total}
            loading={contract.updatingList}
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
