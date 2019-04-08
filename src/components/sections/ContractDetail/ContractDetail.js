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

import Viewer from "../../common/Viewer";

import { SpinnerOnly } from "../../common/Spinner";
import Button from "../../common/Button";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { log, humanToEth, ethToHuman } from "../../../utils/helpers"; // log helper

import {
  NEW_CONTRACT,
  API_GET_CONTRACT,
  PUT_CONTRACT,
  NEW_ARBITRATION,
  CONTRACT_MEDIA_DELETE,
  SEND_TO_COUNTERPARTY,
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const ContractDetail = props => {
  const { labels } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [openPreview, setOpenPreview] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const { contract, user, updateContractField } = props;
  const { updating } = contract;

  const {
    match: { params },
    wallet
  } = props;

  // cDM
  useEffect(() => {
    const {
      match: {
        params: { id }
      }
    } = props;
    console.log("Contract Details - contract id", id);

    global.drizzle.store.dispatch({ type: API_GET_CONTRACT, id });
  }, []);

  // validation setup
  const [isValid, errors, validateForm, setFormData] = useFormValidation(
    contract.current,
    validationSchema
  );

  const changeInput = (name, value) => {
    setFormUpdated(true);
    setFormData({ ...contract.current, [name]: value });
    updateContractField(name, value); // dispatch action
  };

  const onInputChange = ev => {
    console.log('onInputChange', ev);
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

  const onFileAdded = selectedFiles => {
    console.log("upload", selectedFiles);
    setAttachments(selectedFiles);
  };

  const onFileView = file => {
    setFilePath(file.url);
    setOpenPreview(true);
    console.log("onFileView", file);
  }

  const onRequestClose = () => {
    setFilePath(null);
    setOpenPreview(false);
  }

  const onFileError = e => {
    console.error("onFileError", e)
  }

  const onSubmit = () => {
    console.log("upload", "run");

    global.drizzle.store.dispatch({
      type: PUT_CONTRACT,
      attachments,
      // callback: () => {

      // }
    });
  };

  const onSend = () => {
    console.log("onSend", "run");

    global.drizzle.store.dispatch({
      type: NEW_ARBITRATION
    });
  };

  const onFileDelete = (file) => {
    console.log("file delete", file);

    global.drizzle.store.dispatch({
      type: CONTRACT_MEDIA_DELETE,
      ...file
    });
  };

  // form error handling
  const hasError = field =>
    typeof errors[field] !== "undefined" &&
    errors[field].length > 0 &&
    formUpdated; // show error only when form is update at least one time

  // disable update
  const submitDisabled =
    formUpdated === false || updating === true || !isValid();

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
    kpi,
    resolutionProof,
    value,
    whoPays,
    contractName,
    category,
    counterparties,
    attachments: contractAttachments,
    duration,
    hasPenaltyFee,
    partAPenaltyFee,
    partBPenaltyFee
  } = contract.current;
  console.log("ContractDetail - contract", contract);

  const part_a = {
    isDebtor: whoPays && whoPays === counterparties[0].wallet
  };

  const part_b = {
    isDebtor: whoPays && whoPays === counterparties[1].wallet
  };

  const penaltyFee = hasPenaltyFee && hasPenaltyFee != "0" ? {
    partA: Number(partAPenaltyFee) <= Number(value) ? partAPenaltyFee : value,
    partB: Number(partBPenaltyFee) <= Number(value) ? partBPenaltyFee : value
  } : null;

  console.log("penaltyFee", penaltyFee);

  return typeof params.id !== "undefined" ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      {!contract.updating && counterparties ? (
        <>
          <Main>
            <ContractSummary
              data={{
                contractID: id,
                from: {
                  label: "partA",
                  debtor:
                    !part_a.isDebtor && !part_b.isDebtor
                      ? true
                      : part_a.isDebtor,
                  ...counterparties[0]
                },
                to: {
                  label: "partB",
                  debtor: part_b.isDebtor,
                  ...counterparties[1]
                },
                penaltyFee,
                contractName,
                amount: value,
                category: { label: category },
                status: { id: statusId, label: statusLabel, updatedDate: null }, // ???
                inCaseOfDispute: "open", // default
                duration: {
                  days: duration.days,
                  hours: duration.hours,
                  minutes: duration.minutes,
                  expireAlertFrom: ""
                },
                inCaseOfDispute: { id: "open", label: labels.open },
                onContractNameChange: onInputChange,
                onProgress: percentage => console.log(percentage),
                onExpire: () => alert("Countdown finished")
              }}
            />

            <InsertContractDetails
              disabled={contract.saving}
              kpiInitialValue={kpi || ""}
              kpiPlaceholder={labels.kpiPlaceholder}
              resolutionProofInitialValue={resolutionProof || ""}
              resolutionProofPlaceholder={labels.resolutionProofPlaceholder}
              onKpiChange={onInputChange}
              onResolutionProofChange={onInputChange}
              onFileAdded={onFileAdded}
              uploadedFiles={contractAttachments ? contractAttachments.data : []}
              onView={onFileView}
              onDelete={e => onFileDelete(e)}
              key={`contract-info-${contractAttachments ? contractAttachments.data.length : 0}`}
            />

          </Main>
          <Aside>
            <ContractSidebar
              disabled={contract.saving}
              contract={{
                contractID: id,
                from: {
                  label: "partA",
                  debtor:
                  !part_a.isDebtor && !part_b.isDebtor
                    ? true
                    : part_a.isDebtor,
                  ...counterparties[0]
                },
                to: {
                  label: "partB",
                  debtor: part_b.isDebtor,
                  ...counterparties[1]
                },
                duration,
                category,
                amount: value,
                penaltyFee
              }}
              currentUserCanPay={value <= ethToHuman(wallet.balance)}
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
              onSend={onSend}
              onChange={onInputChange}
              onChangeSelect={onChangeSelect}
              onChangeValue={changeInput}
            />
          </Aside>
        </>
      ) : (
        <Main>
          <SpinnerOnly loading={contract.updating} />
        </Main>
      )}

      {filePath && <Viewer isOpen={openPreview} filePath={filePath} onFileLoadingError={onFileError} onRequestClose={onRequestClose} />}

      <ModalDiscliamer
        isOpen={showModal}
        onAccept={() => setShowModal(false)}
        onDecline={() => setShowModal(false)}
      />

      <Disclaimer />
    </PageLayout>
  ) : (
    <Redirect to="/contracts" />
  );
};
