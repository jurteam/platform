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

import Button from "../../common/Button";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { log } from "../../../utils/helpers"; // log helper

import {
  NEW_CONTRACT,
  API_GET_CONTRACT,
  PUT_CONTRACT,
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const ContractDetail = props => {
  const { labels } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const { contract, user, updateContractField } = props;
  const { updating } = contract;

  const {
    match: { params }
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
    const target = ev.target;
    if (target) {
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      changeInput(name, value);
    }
  };

  const onFileAdded = selectedFiles => {
    console.log("upload", selectedFiles);
    setAttachments(selectedFiles);
  };

  const fileUploadSample = () => {
    console.log("upload", "run");

    global.drizzle.store.dispatch({
      type: PUT_CONTRACT,
      // entity: "contracts",
      attachments,
      // ...params
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
    resolution_proof,
    value,
    whoPays,
    contractName,
    counterparties,
    attachments: contractAttachments,
    duration
  } = contract.current;
  console.log("ContractDetail - contract", contract);

  const part_a = {
    isDebtor: whoPays && whoPays === counterparties[0].wallet ? true : false
  };

  const part_b = {
    isDebtor: whoPays && whoPays === counterparties[1].wallet ? true : false
  };

  return typeof params.id !== "undefined" ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      { counterparties ? <>
      <Main>
        <ContractSummary
          data={{
            contractID: id,
            from: {
              label: "partA",
              debtor: (!part_a.isDebtor && !part_b.isDebtor) ? true : part_a.isDebtor,
              ...counterparties[0]
            },
            to: {
              label: "partB",
              debtor: part_b.isDebtor,
              ...counterparties[1]
            },
            penaltyFee: {
              partA: "",
              partB: ""
            },
            contractName,
            amount: value,
            category: null,
            status: { id: statusId, label: statusLabel, updatedDate: null }, // ???
            inCaseOfDispute: null,
            duration: {
              days: duration.days,
              hours: duration.hours,
              minutes: duration.minutes,
              expireAlertFrom: ""
            },
            inCaseOfDispute: {id: "open", label: labels.open},
            onContractNameChange: onInputChange,
            onProgress: percentage => console.log(percentage),
            onExpire: () => alert("Countdown finished")
          }}
        />

        <InsertContractDetails
          kpiInitialValue={kpi}
          kpiPlaceholder={labels.kpiPlaceholder}
          resolutionProofInitialValue={resolution_proof}
          resolutionProofPlaceholder={labels.resolutionProofPlaceholder}
          onKpiChange={onInputChange}
          onResolutionProofChange={onInputChange}
          onFileAdded={onFileAdded}
          uploadedFiles={contractAttachments}
          onView={e => console.log("yo")}
          onDelete={e => console.log("yo")}
        />

        <Button onClick={fileUploadSample}>!!! Upload Test !!!</Button>
      </Main>
      <Aside>
        <ContractSidebar
          contract={{
            contractID: id,
            from: {
              label: "partA",
              debtor: part_a.isDebtor,
              wallet: {
                address: counterparties[0].wallet,
                amount: value
              },
              ...counterparties[0] || []
            },
            to: {
              label: "partB",
              debtor: part_b.isDebtor,
              wallet: {
                address: counterparties[1].wallet,
                amount: value
              },
              ...counterparties[1] || []
            },
            penaltyFee: null
          }}
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
        />
      </Aside>
</>
      : "loading" }

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
