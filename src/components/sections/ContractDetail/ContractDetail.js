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
  MEDIA_UPLOAD,
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
      match: { params }
    } = props;
    console.log("Contract Details - props", params);
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
      type: MEDIA_UPLOAD,
      entity: "contracts",
      attachments,
      ...params
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

  const initContract = () => {
    log("initContract", "run");
    const {
      user: { disclaimer }
    } = props;
    if (disclaimer.optin) {
      global.drizzle.store.dispatch({ type: NEW_CONTRACT });

      const { history } = props;
      history.push("/contracts/detail");
    } else {
      setShowModal(true); // show disclaimer modal
      global.drizzle.store.dispatch({ type: DISCLAIMER_MUST_BE_ACCEPTED });
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
    part_a_wallet,
    part_a_public_name,
    part_b_wallet,
    part_b_public_name,
    statusId,
    statusLabel,
    kpi,
    resolution_proof,
    value,
    whoPays,
    contractName,
    duration
  } = contract.current;
  console.log("ContractDetail - contract", contract);

  const part_a = {
    isDebtor: whoPays ? whoPays === "a" : true,
    shouldRenderName: part_a_wallet === user.wallet ? user.show_fullname : false
  };

  const part_b = {
    isDebtor: whoPays ? whoPays === "b" : true,
    shouldRenderName: part_b_wallet === user.wallet ? user.show_fullname : false
  };

  return typeof params.id !== "undefined" && contract.current.part_a_wallet ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Main>
        <ContractSummary
          data={{
            contractID: id,
            from: {
              label: "partA",
              debtor: part_a.isDebtor, // default valute equal to true
              wallet: {
                address: part_a_wallet
              },
              name: part_a_public_name,
              shouldRenderName: part_a.shouldRenderName
            },
            to: {
              label: "partB",
              debtor: part_b.isDebtor, // default value equal to false
              wallet: {
                address: part_b_wallet
              },
              name: part_b_public_name,
              shouldRenderName:
                part_b_wallet === user.wallet ? user.show_fullname : false
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
            onContractNameChange: ev => console.log(ev.target.value),
            onProgress: percentage => console.log(percentage),
            onExpire: () => alert("Countdown finished")
          }}
        />

        <InsertContractDetails
          kpiInitialValue={kpi}
          kpiPlaceholder={labels.kpiPlaceholder}
          resolutionProofInitialValue={resolution_proof}
          resolutionProofPlaceholder={labels.resolutionProofPlaceholder}
          onKpiChange={e => console.log("yo")}
          onResolutionProofChange={e => console.log("yo")}
          onFileAdded={onFileAdded}
          uploadedFiles={[{ name: "Hello worldl.pdf" }]}
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
                address: part_a_wallet,
                amount: value
              },
              name: part_a_public_name,
              shouldRenderName: part_a.shouldRenderName
            },
            to: {
              label: "partB",
              debtor: part_b.isDebtor,
              wallet: {
                address: part_b_wallet,
                amount: value
              },
              name: part_b_public_name,
              shouldRenderName: part_b.shouldRenderName
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
