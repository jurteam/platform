import React, { useState, useEffect , useContext } from "react";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import Page from "../../common/Page";
import Header from "../../common/Header";
import SubHeader from "../../common/SubHeader";
import Breadcrumbs from "../../common/Breadcrumbs";
import Content from "../../common/Content";

import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";

import Main from "../../common/Main";

import DataLostModal from "../../common/DataLostModal";
import DisputesTable from "../../common/DisputesTable";

import { log } from "../../../utils/helpers"; // log helper

import {
  FETCH_DISPUTES,
  UPDATE_DISPUTE_FILTER,
  API_DELETE_DISPUTE,
  DISPUTE_PAGE_CHANGE,
  DISPUTE_ORDER_CHANGE,
  DISPUTES_LIST_PAGE
} from "../../../reducers/types";

export const Disputes = ( props ) => {
  const { labels, disputeTableHeaders } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [showDataLostModal, setShowDataLostModal] = useState(false);
  const [disputeToArchive, setDisputeToArchive] = useState(null);

  const [myDispute, setMyDispute] = useState(false);

  // cDM
  useEffect(() => {
    global.store.dispatch({ type: DISPUTES_LIST_PAGE, payload: true });
    return () => {
      global.store.dispatch({ type: DISPUTES_LIST_PAGE, payload: false });

    }
  }, []);

  const { dispute } = props;
  log("Disputes - dispute", dispute);

  const { pagination } = dispute;

  // filters
  const { disabled: filtersDisabled, ...filters } = dispute.filters;
  const handleFilterChange = (type, value) => {
    if (type === "mine") {
      log("Disputes - handleFilterChange", { type, value });
      setMyDispute(value);
    }

    global.store.dispatch({
      type: UPDATE_DISPUTE_FILTER,
      field: type,
      value
    });


    if (!(type === 'searchText' && value !== null && value.length < 3)) {
      log('handleFilterChange ', type)
      handleFilterSubmit()
    }

  };
  const handleFilterSubmit = () => {
    global.store.dispatch({ type: FETCH_DISPUTES });
  };

  const handleArchive = disputeId => {
    log("Disputes", "handleArchive", disputeId);

    setDisputeToArchive(disputeId);
    setShowDataLostModal(true);
  };

  const archive = () => {
    setShowDataLostModal(false);

    global.store.dispatch({
      type: API_DELETE_DISPUTE,
      id: disputeToArchive
    });
    setDisputeToArchive(null);
  };

  const onPageChange = (page) => {
    global.store.dispatch({
      type: DISPUTE_PAGE_CHANGE,
      payload: page
    });
  };

  const onSortChange = ( field, order ) => {
    global.store.dispatch({
      type: DISPUTE_ORDER_CHANGE,
      payload: { field: field, type: order }
    });
  };



  const breadcrumbs = [
    {
      label: labels.disputes,
      active: true,
      to: "/disputes"
    }
  ];

  return (
    <Page>
      <Header />
      <SubHeader>
        <Breadcrumbs crumbList={breadcrumbs} />
      </SubHeader>
      <Content>
        <Main>
          <DisputesTable
            filters={filters}
            filtersDisabled={filtersDisabled}
            handleFilterChange={handleFilterChange}
            handleFilterSubmit={handleFilterSubmit}
            headers={disputeTableHeaders}
            data={dispute.list}
            myDispute={myDispute}
            handleArchive={handleArchive}
            initialPage={pagination.current_page}
            onPageChange={(pageNo) => onPageChange(pageNo)}
            onSortChange={(field, order) => onSortChange(field, order)}
            disputesPerPage={pagination.per_page}
            totalDisputes={pagination.total}
            loading={dispute.updatingList}
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
