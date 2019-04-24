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
  FETCH_ORACLES
} from "../../../reducers/types";

export const OracleDetail = props => {
  const { labels, oraclesFullTableHeaders } = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);

  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [showModalRejectPay, setShowModalRejectPay] = useState(false);

  const [showVoteOverlay, setShowVoteOverlay] = useState(false);
  const [metaMaskError, setMetaMaskError] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const [proposalAttachments, setProposalAttachments] = useState([]);

  const [openPreview, setOpenPreview] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const { dispute, user, oracle, contract, history } = props;
  const { updating } = dispute;

  const {
    match: { params },
    wallet
  } = props;

  const [userWallet, setUserWallet] = useState(wallet.address);

  const pageLoaded = () => {
    if (wallet.address) {
      setLoaded(true);
    } else {
      // wait for wallet to load
    }
  };

  // cDM
  useEffect(() => {
    const {
      match: {
        params: { id }
      }
    } = props;

    global.drizzle.store.dispatch({
      type: FETCH_ORACLES,
      id,
      onSuccess: pageLoaded,
      onError: pageLoaded
    });
  }, [wallet.address]);

  const changeInput = (name, value) => {
    if (!formUpdated) setFormUpdated(true);
    // updateContractField(name, value); // dispatch action
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
    setAttachments(selectedFiles);
    setFormUpdated(true);
  };

  const onFileView = file => {
    setFilePath(file.url);
    setOpenPreview(true);
    console.log("onFileView", file);
  };

  const onRequestClose = () => {
    setFilePath(null);
    setOpenPreview(false);
  };

  const onFileError = e => {
    console.error("onFileError", e);
  };

  const onExpire = () => {
    const { id } = dispute.current;

    global.drizzle.store.dispatch({
      type: EXPIRED_CONTRACT,
      id
    });
  };

  const onSend = () => {
    console.log("onSend", "run");

    global.drizzle.store.dispatch({
      type: NEW_ARBITRATION
    });
  };

  const onProgress = percentage => {
    // console.log(percentage);
  };

  const onSubmit = () => {
    if (!submitDisabled) {
      global.drizzle.store.dispatch({
        type: PUT_CONTRACT,
        attachments,
        callback: () => setFormUpdated(false) // reset form
      });
    }
  };

  const onFileDelete = file => {
    console.log("file delete", file);

    global.drizzle.store.dispatch({
      type: CONTRACT_MEDIA_DELETE,
      ...file
    });
  };

  // disable update
  const submitDisabled =
    formUpdated === false ||
    updating === true ||
    dispute.saving === true;

  const {
    match: {
      params: { id: disputeID }
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

  const {
    id,
    statusId,
    statusLabel,
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
    proposalPartA,
    proposalPartB,
    hasPenaltyFee,
    partAPenaltyFee,
    partBPenaltyFee,
    percentagePartA,
    percentagePartB,
    totalTokensPartA,
    totalTokensPartB,
    totalTokens,
    details: issues
  } = dispute.current;

  let currentPart = null;
  if (
    typeof counterparties !== "undefined" &&
    typeof counterparties[1] !== "undefined"
  ) {
    currentPart =
      wallet.address.toLowerCase() === counterparties[1].wallet.toLowerCase()
        ? "b"
        : "a";
  }

  const contractValue = Number(value);
  let feeToPay = contractValue;
  if (hasPenaltyFee && currentPart) {
    if (currentPart === "a") {
      feeToPay = contractValue + Number(partAPenaltyFee);
    } else {
      feeToPay = contractValue + Number(partBPenaltyFee);
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
    hasPenaltyFee && hasPenaltyFee != "0"
      ? {
          partA:
            Number(partAPenaltyFee) <= Number(value) ? partAPenaltyFee : value,
          partB:
            Number(partBPenaltyFee) <= Number(value) ? partBPenaltyFee : value
        }
      : null;

  let common = {};
  let voteCounterparties = [];

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
        expireAlertFrom: Number(process.env.REACT_APP_VOTE_EXPIRE_ALERT)
      },
      inCaseOfDispute: { id: "open", label: labels.open },
      issues,
      onContractNameChange: onInputChange,
      onProgress,
      onExpire
    };

    common = {
      part_a: contractData.from.wallet,
      part_b: contractData.to.wallet
    };

    voteCounterparties = [
      {
        ...counterparties[0],
        percentage: percentagePartA,
        value: totalTokensPartA,
        winner: false
      },
      {
        ...counterparties[1],
        percentage: percentagePartB,
        value: totalTokensPartB,
        winner: false
      }
    ];
  }

  const uploadedFiles = contractAttachments ? contractAttachments.data : [];

  return typeof params.id !== "undefined" &&
    !(loaded === true && typeof dispute.current.id === "undefined") ? (
    <PageLayout breadcrumbs={breadcrumbs}>
      {!dispute.updating && counterparties ? (
        <>
          <Main>
            <OraclesTable
              headers={oraclesFullTableHeaders}
              data={oracle.currentList || []}
              currentUserWallet={userWallet}
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
          <SpinnerOnly loading={dispute.updating} />
        </Main>
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
