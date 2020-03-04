/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import PageLayout from "../../common/PageLayout";
import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";
import Aside from "../../common/Aside";
import Main from "../../common/Main";

import ContractSidebar from "../../common/ContractSidebar";

import ContractSummary from "../../common/ContractSummary";
import InsertContractDetails from "../../common/InsertContractDetails";

import ContractDetailsPreview from "../../common/ContractDetailsPreview";
import FileList from "../../common/FileList";
import File from "../../common/File";

import ContractModal from "../../common/ContractModal";
import PaymentModal from "../../common/PaymentModal";

import Viewer from "../../common/Viewer";

import { SpinnerOnly } from "../../common/Spinner";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { ethToHuman, log } from "../../../utils/helpers"; // log helper

import {
  // NEW_CONTRACT,
  API_GET_CONTRACT,
  PUT_CONTRACT,
  // NEW_ARBITRATION,
  CONTRACT_ISSUE,
  REJECT_ARBITRATION,
  ACCEPT_ARBITRATION,
  ACCEPT_ARBITRATION_AMENDMENT,
  PAY_ARBITRATION,
  WITHDRAW_ARBITRATION,
  EXPIRED_CONTRACT,
  SUCCESS_ARBITRATION,
  CONTRACT_MEDIA_DELETE,
  // DISCLAIMER_MUST_BE_ACCEPTED
  SEND_TO_COUNTERPARTY
} from "../../../reducers/types";
import ActionsBar from "../../chain/ActionsBar";

export const ContractDetail = ( props ) => {
  const { labels } = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);

  const [showModalSend, setShowModalSend] = useState(false);

  const [showModalAccept, setShowModalAccept] = useState(false);
  const [showModalAcceptAmendment, setShowModalAcceptAmendment] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [showModalRejectPay, setShowModalRejectPay] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [proposalAttachments, setProposalAttachments] = useState([]);

  const [openPreview, setOpenPreview] = useState(false);
  const [filePath, setFilePath] = useState(null);


  const { contract, updateContractField, history, contracts } = props;
  const { updating } = contract;

  const {
    match: { params },
    wallet,
    user: { disclaimer }
  } = props;

  // validation setup
  const [isValid, errors, validateForm, setFormData] = useFormValidation(
    contract.current,
    validationSchema
  );

  const [userWallet] = useState(wallet.address);

  const pageLoaded = () => {
    if (wallet.address) {
      validateForm(); // first validation
      setLoaded(true)
    } else {
      // wait for wallet to load
    }
  };

  // cDM
  useEffect(() => {
    const {
      match: {
        params: { id }
      },
      history
    } = props;

    global.store.dispatch({
      type: API_GET_CONTRACT,
      id,
      onSuccess: pageLoaded,
      onError: pageLoaded,
      history
    });

  }, [wallet.address]);

  useEffect(() => {
    setFormData(contract.current);
    validateForm();
  }, [contract.current]);

  const changeInput = (name, value) => {
    if (!formUpdated) setFormUpdated(true);
    setFormData({ ...contract.current, [name]: value });
    updateContractField(name, value); // dispatch action
  };

  const onInputChange = (ev) => {
    const target = ev.target;
    if (target) {
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      changeInput(name, value);
    }
  };

  const onChangeSelect = (name, input) => {
    const value =
      typeof input !== "undefined" &&
      input !== null &&
      typeof input.value !== "undefined"
        ? input.value
        : null;

    changeInput(name, value);
  };

  const onProposalFileAdded = selectedFiles => {
    setProposalAttachments(selectedFiles);
  };

  const onFileAdded = selectedFiles => {
    setAttachments(selectedFiles);
    setFormUpdated(true);
  };

  const onFileView = (file) => {
    setFilePath(file.url);
    setOpenPreview(true);
    log("onFileView", file);
  };

  const onRequestClose = () => {
    setFilePath(null);
    setOpenPreview(false);
  };

  const onFileError = ( e ) => {
    log("onFileError", e,-1);
  };

  const onSubmitProposal = (issue, setShowProposalForm, setActivitiesOpen, message) => {
    const { statusId, id, value, address } = contract.current;

    if (typeof message === 'undefined') message = ''; // handle nil

    global.store.dispatch({
      type: CONTRACT_ISSUE,
      issue: statusId > 21 ? "disputes" : issue,
      proposalAttachments,
      value,
      message,
      address,
      statusId,
      id,
      callback: () => {
        setShowProposalForm(false); // sidebar only
        setActivitiesOpen(true); // sidebar only
        setFormUpdated(false);
      } // reset form
    });
  };

  const onPay = () => {

    const {
      wallet
    } = props;

    const {
      id,
      address,
      value,
      counterparties,
      partAPenaltyFee,
      partBPenaltyFee,
      whoPays
    } = contract.current;

    let amount = 0;

    if (wallet.address.toLowerCase() === counterparties[1].wallet.toLowerCase()) { // is part b

      if (typeof partBPenaltyFee !== 'undefined' && partBPenaltyFee) amount = amount + Number(partBPenaltyFee)
      if (whoPays.toLowerCase() === counterparties[1].wallet.toLowerCase()) {
        amount = amount + Number(value);
      }

    } else {

      if (typeof partAPenaltyFee !== 'undefined' && partAPenaltyFee) amount = amount + Number(partAPenaltyFee)
      if (whoPays.toLowerCase() === counterparties[0].wallet.toLowerCase()) {
        amount = amount + Number(value);
      }

    }

    let totalValue = Number(value) + Number(partAPenaltyFee) + Number(partBPenaltyFee);
    if (typeof partAPenaltyFee !== 'undefined' && partAPenaltyFee) totalValue = totalValue + Number(partAPenaltyFee);
    if (typeof partBPenaltyFee !== 'undefined' && partBPenaltyFee) totalValue = totalValue + Number(partBPenaltyFee);

    global.store.dispatch({
      type: PAY_ARBITRATION,
      id,
      address,
      amount,
      totalValue,
      onFail: () => setShowModalRejectPay(true)
    });
  };

  const onWithdraw = () => {

    const {
      id,
      address
    } = contract.current;

    global.store.dispatch({
      type: WITHDRAW_ARBITRATION,
      id,
      address
    });
  };

  const onAccept = () => {
    const {
      id,
      address,
      value
    } = contract.current;

    global.store.dispatch({
      type: ACCEPT_ARBITRATION,
      id,
      address,
      value
    });
  };

  const onAcceptAmendment = () => {
    const {
      id,
      address
    } = contract.current;

    global.store.dispatch({
      type: ACCEPT_ARBITRATION_AMENDMENT,
      id,
      address
    });
  };

  const onReject = () => {
    const {
      id,
      address
    } = contract.current;

    global.store.dispatch({
      type: REJECT_ARBITRATION,
      id,
      address
    });
  };

  const onSuccess = () => {
    const {
      id,
      address
    } = contract.current;

    global.store.dispatch({
      type: SUCCESS_ARBITRATION,
      id,
      address
    });
  };

  const onExpire = () => {
    const {
      id
    } = contract.current;

    global.store.dispatch({
      type: EXPIRED_CONTRACT,
      id
    });
  };

  const onSend = () => {
    log("onSend", "run");

    global.store.dispatch({
      type: SEND_TO_COUNTERPARTY
    });
  };

  const onProgress = (percentage) => {
    // log(percentage);
  };

  const onFileDelete = (file) => {
    log("file delete", file);

    global.store.dispatch({
      type: CONTRACT_MEDIA_DELETE,
      ...file
    });
  };

  // form error handling
  const hasError = (field) =>
    typeof errors[field] !== "undefined" &&
    errors[field].length > 0 &&
    formUpdated; // show error only when form is update at least one time

  // disable update
  const submitDisabled =
    formUpdated === false ||
    updating === true ||
    contract.saving === true ||
    !isValid();

  const onSubmit = () => {

    if (!submitDisabled) {
      global.store.dispatch({
        type: PUT_CONTRACT,
        attachments,
        callback: () => setFormUpdated(false) // reset form
      });
    }
  };

  const breadcrumbs = [
    {
      label: labels.contracts,
      to: "/contracts",
      exact: true
    },
    {
      label: labels.contractDetails,
      active: true,
      to: "/contracts/detail"
    }
  ];

  const {
    id,
    statusId,
    statusLabel,
    statusFrom,
    statusUpdatedAt,
    kpi,
    resolutionProof,
    value,
    whoPays,
    contractName,
    category,
    counterparties,
    attachments: contractAttachments,
    duration,
    lastPartInvolved,
    hasPenaltyFee,
    partAPenaltyFee,
    partBPenaltyFee,
    details: issues,
    address
  } = contract.current;

  const chainContract = contracts[address]

  log("ContractDetail - contract", {
    isValid: isValid(),
    errors,
    validateForm,
    setFormData
  });

  let currentPart = null;
  let partAPays = true;
  if (
    typeof counterparties !== "undefined" &&
    typeof counterparties[1] !== "undefined"
  ) {
    currentPart =
      wallet.address.toLowerCase() === counterparties[1].wallet.toLowerCase()
        ? "b"
        : "a";
    partAPays = whoPays === wallet.address.toLowerCase()
  }

  const contractValue = Number(value);
  let feeToPay = partAPays ? contractValue : 0;
  if (hasPenaltyFee && currentPart) {
    if (partAPays) {
      feeToPay = contractValue + Number(partAPenaltyFee);
    } else {
      feeToPay = Number(partAPenaltyFee);
    }
  }

  const currentUserCanPay = feeToPay <= Number(ethToHuman(wallet.balance));

  const part_a = {
    isDebtor:
      whoPays &&
      whoPays.toLowerCase() === counterparties[0].wallet.toLowerCase()
  };

  const part_b = {
    isDebtor:
      whoPays &&
      whoPays.toLowerCase() === counterparties[1].wallet.toLowerCase()
  };

  const penaltyFee =
    hasPenaltyFee && hasPenaltyFee !== "0"
      ? {
          partA:
            Number(partAPenaltyFee) <= Number(value) ? partAPenaltyFee : value,
          partB:
            Number(partBPenaltyFee) <= Number(value) ? partBPenaltyFee : value
        }
      : null;

  // Cotract data
  let contractData = {};
  if (typeof params.id !== "undefined" && counterparties) {
    contractData = {
      contractID: id,
      statusId,
      statusLabel,
      statusUpdatedAt,
      from: {
        label: "partA",
        debtor: !part_a.isDebtor && !part_b.isDebtor ? true : part_a.isDebtor,
        ...counterparties[0]
      },
      to: {
        label: "partB",
        debtor: part_b.isDebtor,
        ...counterparties[1]
      },
      details: [
        {
          label: labels.kpi,
          message: kpi
        },
        {
          label: labels.resolutionProof,
          message: resolutionProof
        }
      ],
      penaltyFee,
      contractName,
      amount: value,
      whoPays,
      category,
      status: {
        id: statusId,
        label: statusLabel,
        updatedDate: statusUpdatedAt
      }, // ???
      // inCaseOfDispute: "open", // default
      duration: {
        ...duration,
        expireAlertFrom: process.env.REACT_APP_CONTRACT_EXPIRE_ALERT
      },
      inCaseOfDispute: { id: "open", label: labels.open },
      issues,
      onContractNameChange: onInputChange,
      onProgress,
      onExpire
    };
  }

  const uploadedFiles = contractAttachments ? contractAttachments.data : [];

  return typeof params.id !== "undefined" &&
    !(loaded === true && typeof contract.current.id === "undefined") ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      {!contract.updating && counterparties ? (
        <>
          <Main>
            <ActionsBar />
            <ContractSummary
              data={{
                ...contractData,
                category: { label: contractData.category }
              }}
            />

            {statusId === 0 && (
              <InsertContractDetails
                disabled={contract.saving}
                kpiInitialValue={kpi || ""}
                kpiPlaceholder={labels.kpiPlaceholder}
                resolutionProofInitialValue={resolutionProof || ""}
                resolutionProofPlaceholder={labels.resolutionProofPlaceholder}
                onKpiChange={onInputChange}
                onResolutionProofChange={onInputChange}
                onFileAdded={onFileAdded}
                uploadedFiles={uploadedFiles}
                onView={onFileView}
                hasError={hasError}
                onDelete={(e) => onFileDelete(e)}
                key={`contract-info-${
                  contractAttachments ? contractAttachments.data.length : 0
                }`}
              />
            )}

            {statusId !== 0 && (
              <>
                <div className="jur-insert-contract-details">
                  <ContractDetailsPreview contract={contractData} />

                  <div className="jur-insert-contract-details__files">
                    {uploadedFiles.length > 0 && (
                      <FileList>
                        {uploadedFiles.map((file, index) => (
                          <File
                            key={index.toString()}
                            name={file.fileName}
                            file={file}
                            onView={onFileView}
                            disabled={contract.saving}
                            large
                          />
                        ))}
                      </FileList>
                    )}
                  </div>
                </div>
              </>
            )}
          </Main>
          <Aside>
            <ContractSidebar
              disabled={contract.saving || !disclaimer.optin}
              submitDisabled={submitDisabled}
              currentWallet={wallet}
              contractAddress={contract.current.address}
              currentPart={currentPart}
              notificationLoading={contract.notificationLoading}
              currentProposal={contract.currentProposal}
              contract={contractData}
              activities={contract.current.activities}
              formUpdated={formUpdated}
              currentUserCanPay={currentUserCanPay}
              feeToPay={feeToPay}
              statusFrom={statusFrom}
              chainContract={chainContract}
              isValid={isValid()}
              hasError={hasError}
              lastPartInvolved={lastPartInvolved}
              history={history}
              cases={[
                {
                  label: labels.open,
                  description: labels.openText,
                  id: "open",
                  open: true
                },
                {
                  label: labels.hubs,
                  description: labels.hubsText,
                  id: "hubs",
                  disabled: true
                }
              ]}
              selectedOptionId={"open"}
              onSubmit={onSubmit}
              onPay={onPay}
              onSend={() => setShowModalSend(true)}
              onReject={() => setShowModalReject(true)}
              onAccept={() => setShowModalAccept(true)}
              onAcceptAmendment={() => setShowModalAcceptAmendment(true)}
              onSuccess={() => setShowModalSuccess(true)}
              onWithdraw={onWithdraw}
              currentHasWithdrawn={contract.current.hasWithdrawn}
              onChange={onInputChange}
              onView={onFileView}
              onChangeSelect={onChangeSelect}
              onChangeValue={changeInput}
              onSubmitProposal={onSubmitProposal}
              onProposalFileAdded={onProposalFileAdded}
            />
          </Aside>
        </>
      ) : (
        <Main>
          <SpinnerOnly loading={contract.updating} />
        </Main>
      )}

      {filePath && (
        <Viewer
          isOpen={openPreview}
          filePath={filePath}
          fullWidthViewer={true}
          onFileLoadingError={onFileError}
          onRequestClose={onRequestClose}
        />
      )}

      <ContractModal
        isOpen={showModalSend}
        title={labels.sendToCounterparty}
        content={labels.sendToCounterpartyText}
        onAccept={() => {
          onSend();
          setShowModalSend(false);
        }}
        onDecline={() => setShowModalSend(false)}
      />

      <ContractModal
        isOpen={showModalAccept}
        title={labels.acceptSmartContract}
        content={labels.acceptSmartContractText}
        onAccept={() => {
          onAccept();
          setShowModalAccept(false);}}
        onDecline={() => setShowModalAccept(false)}
      />

      <ContractModal
        isOpen={showModalAcceptAmendment}
        title={labels.acceptSmartContractAmendment}
        content={labels.acceptSmartContractAmendmentText}
        onAccept={() => {
          onAcceptAmendment();
          setShowModalAcceptAmendment(false);}}
        onDecline={() => setShowModalAcceptAmendment(false)}
      />

      <ContractModal
        isOpen={showModalReject}
        title={labels.rejectSmartContract}
        content={labels.rejectSmartContractText}
        onAccept={() => {
          onReject();
          setShowModalReject(false)
        }}
        onDecline={() => setShowModalReject(false)}
      />

      <ContractModal
        isOpen={showModalSuccess}
        title={labels.successSmartContract}
        content={labels.successSmartContractText}
        onAccept={() => {
          onSuccess();
          setShowModalSuccess(false);
        }}
        onDecline={() => setShowModalSuccess(false)}
      />

      <PaymentModal
        isOpen={showModalRejectPay}
        title={labels.rejectPayment}
        content={labels.rejectPaymentText}
        onAccept={() => setShowModalRejectPay(false)}
      />

      <ModalDiscliamer
        isOpen={showModal}
        onAccept={() => setShowModal(false)}
        onDecline={() => setShowModal(false)}
      />

      <Disclaimer />
    </PageLayout>
  ) : (
    <>{userWallet ? <Redirect to="/contracts" /> : <SpinnerOnly loading={true} />}</>
  );
};
