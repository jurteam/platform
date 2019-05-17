import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../common/PageLayout";
import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";
import Aside from "../../common/Aside";
import Main from "../../common/Main";

import DisputeSidebar from "../../common/DisputeSidebar";

import ContractSummary from "../../common/ContractSummary";

import DisputeMainAccordions from "../../common/DisputeMainAccordions";
import DisputeResolutionProposal from "../../common/DisputeResolutionProposal";

import OraclesTable from "../../common/OraclesTable";

import Viewer from "../../common/Viewer";

import { SpinnerOnly } from "../../common/Spinner";
import Button from "../../common/Button";

import { log, humanToEth, ethToHuman } from "../../../utils/helpers"; // log helper

import {
  API_GET_DISPUTE,
  PUT_CONTRACT,
  NEW_ARBITRATION,
  CONTRACT_ISSUE,
  REJECT_ARBITRATION,
  ACCEPT_ARBITRATION,
  ACCEPT_ARBITRATION_AMENDMENT,
  PAY_ARBITRATION,
  EXPIRED_CONTRACT,
  SUCCESS_ARBITRATION,
  CONTRACT_MEDIA_DELETE,
  SEND_TO_COUNTERPARTY,
  DISCLAIMER_MUST_BE_ACCEPTED,
  FETCH_ORACLES,
  ORACLE_PAGE_CHANGE
} from "../../../reducers/types";

export const OracleDetail = ( props ) => {
  const { labels, oraclesFullTableHeaders } = useContext(AppContext);

  const {
    match: { params },
    wallet
  } = props;

  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [proposalAttachments, setProposalAttachments] = useState([]);

  const [openPreview, setOpenPreview] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const { dispute, user, oracle, contract, history } = props;
  const { updating } = dispute;

  const [userWallet, setUserWallet] = useState(wallet.address);

  // cDM
  useEffect(() => {

    const {
      match: {
        params: { id }
      }
    } = props;

    global.drizzle.store.dispatch({
      type: FETCH_ORACLES,
      id
    });

    return () => null; // do nothing on umount

  }, [wallet.address]);

  const onFileView = (file) => {
    setFilePath(file.url);
    setOpenPreview(true);
    console.log("onFileView", file);
  };

  const onRequestClose = () => {
    setFilePath(null);
    setOpenPreview(false);
  };

  const onFileError = ( e ) => {
    console.error("onFileError", e);
  };

  const onPageChange = (page) => {
    global.drizzle.store.dispatch({
      type: ORACLE_PAGE_CHANGE,
      payload: page
    });
  };

  const {
    match: {
      params: { id: disputeID }
    },
    oracle: {
      pagination
    }
  } = props;

  const breadcrumbs = [
    {
      label: labels.disputes,
      to: "/disputes",
      exact: true
    },
    {
      label: labels.disputeDetails,
      to: `/disputes/detail/${disputeID}`,
      exact: true
    },
    {
      label: labels.oraclesDetails,
      active: true,
      to: `/disputes/detail/${disputeID}/oracles`
    }
  ];

  console.log("Oracles - disputeID", disputeID);

  return typeof params.id !== "undefined" &&
    !(typeof disputeID === "undefined") ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      {!oracle.updatingList && oracle.list ? (
        <>
          <Main>
            <OraclesTable
              headers={oraclesFullTableHeaders}
              data={oracle.list || []}
              currentUserWallet={userWallet}
              onFileView={onFileView}
              initialPage={pagination.current_page}
              onPageChange={(pageNo) => onPageChange(pageNo)}
              contractsPerPage={pagination.per_page}
              totalContracts={pagination.total}
              loading={oracle.updatingList}
              dispute={{
                name: dispute.current.contractName,
                status: {
                  id: dispute.current.statusId,
                  label: dispute.current.statusLabel
                }
              }}
            />
          </Main>
        </>
      ) : (
        <Main>
          <SpinnerOnly loading={oracle.updatingList} />
        </Main>
      )}

      {filePath && (
        <Viewer
          isOpen={openPreview}
          filePath={filePath}
          onFileLoadingError={onFileError}
          onRequestClose={onRequestClose}
        />
      )}

      <ModalDiscliamer
        isOpen={showModal}
        onAccept={() => setShowModal(false)}
        onDecline={() => setShowModal(false)}
      />

      <Disclaimer />
    </PageLayout>
  ) : (
    <>
      {userWallet ? (
        <Redirect to="/disputes" />
      ) : (
        <SpinnerOnly loading={true} />
      )}
    </>
  );
};
