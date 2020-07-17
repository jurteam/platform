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
  CONTRACT_ORDER_CHANGE,
  DISCLAIMER_MUST_BE_ACCEPTED,
  CONTRACTS_LIST_PAGE
} from "../../../reducers/types";

export const Contracts = ( props ) => {
  const { labels, contractTableHeaders } = useContext(AppContext);

  const [searching, setSearching] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showDataLostModal, setShowDataLostModal] = useState(false);
  const [contractToArchive, setContractToArchive] = useState(null);

  // cDM
  useEffect(() => {
    log("Contracts - cDM", "");
    global.store.dispatch({ type: CONTRACTS_LIST_PAGE, payload: true });
    return () => {
      
      global.store.dispatch({ type: CONTRACTS_LIST_PAGE, payload: false });
    }
  }, []);




  const { user, contract } = props;
  log("Contracts - contract", contract);

  const { pagination } = contract;


  // filters
  const { disabled: filtersDisabled, ...filters } = contract.filters;
  const handleFilterChange = (type, value) => {
    global.store.dispatch({
      type: UPDATE_CONTRACT_FILTER,
      field: type,
      value
    });

    if (!(type === 'searchText' && value !== null && value.length < 3)) {
      handleFilterSubmit()
    }
  };
  useEffect(() => {
    if (
      filters.status === null &&
      filters.fromDate === null &&
      filters.toDate === null &&
      filters.searchText === null
    ) {
      setSearching(false);
    } else {
      setSearching(true);
    };
  },[filters]);
  
  const handleFilterSubmit = () => {    
    global.store.dispatch({ type: FETCH_CONTRACTS });
  };

  const handleArchive = (contractId) => {
    log("Contracts", "handleArchive", contractId);

    setContractToArchive(contractId);
    setShowDataLostModal(true);
  };

  const archive = () => {
    setShowDataLostModal(false);

    global.store.dispatch({
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
      global.store.dispatch({ type: DISCLAIMER_MUST_BE_ACCEPTED });
    }
  };

  const onPageChange = (page) => {
    global.store.dispatch({
      type: CONTRACT_PAGE_CHANGE,
      payload: page
    });
  };

  const onSortChange = ( field, order ) => {
    global.store.dispatch({
      type: CONTRACT_ORDER_CHANGE,
      payload: { field: field, type: order }
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
        <Button color="info" variant="contained" onClick={newContract}>
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
            searching={searching}
            data={contract.list}
            handleArchive={handleArchive}
            newContract={newContract}
            initialPage={pagination.current_page}
            onPageChange={(pageNo) => onPageChange(pageNo)}
            onSortChange={(field, order) => onSortChange(field, order)}
            contractsPerPage={pagination.per_page}
            totalContracts={pagination.total}
            loading={contract.updatingList}
            user={user}
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
