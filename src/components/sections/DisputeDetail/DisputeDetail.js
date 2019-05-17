import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";

// Context
import { AppContext } from "../../../bootstrap/AppProvider";

// Components
import Disclaimer, { ModalDiscliamer } from "../../common/Disclaimer";
import Aside from "../../common/Aside";
import Main from "../../common/Main";

import DisputeSidebar from "../../common/DisputeSidebar";

import ContractSummary from "../../common/ContractSummary";

import DisputeMainAccordions from "../../common/DisputeMainAccordions";
import DisputeResolutionProposal from "../../common/DisputeResolutionProposal";

import Page from "../../common/Page";
import Header from "../../common/Header";
import SubHeader from "../../common/SubHeader";
import Breadcrumbs from "../../common/Breadcrumbs";
import ResolvedDisputeNotification from "../../common/ResolvedDisputeNotification";
import Content from "../../common/Content";

import ContractModal from "../../common/ContractModal";
import PaymentModal from "../../common/PaymentModal";

import Viewer from "../../common/Viewer";

import { SpinnerOnly } from "../../common/Spinner";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { log, humanToEth, ethToHuman } from "../../../utils/helpers"; // log helper

import {
  API_GET_DISPUTE,
  PUT_CONTRACT,
  PUT_VOTE,
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
  DISCLAIMER_MUST_BE_ACCEPTED
} from "../../../reducers/types";

export const DisputeDetail = ( props ) => {
  const { labels } = useContext(AppContext);

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

  // validation setup
  const [isValid, errors, validateForm, setFormData] = useFormValidation(
    dispute.vote,
    validationSchema
  );

  const {
    match: { params },
    wallet
  } = props;

  const [userWallet] = useState(wallet.address);

  const pageLoaded = () => {
    if (wallet.address) {
      validateForm(); // first validation
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
      type: API_GET_DISPUTE,
      id,
      onSuccess: pageLoaded,
      onError: pageLoaded
    });
  }, [wallet.address]);

  const changeInput = (name, value) => {
    if (!formUpdated) setFormUpdated(true);
    setFormData({ ...dispute.vote, [name]: value });

    const { updateVoteField } = props;
    updateVoteField(name, value); // dispatch action
  };

  const onInputChange = (ev) => {
    const target = ev.target;
    console.log("onInputChange", target, ev);
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

  const onFileError = ( e ) => {
    console.error("onFileError", e);
  };

  const onExpire = () => {
    const { id } = dispute.current;

    global.drizzle.store.dispatch({
      type: EXPIRED_CONTRACT,
      id
    });
  };

  const onVote = (counterparty, idx) => {
    onRequestClose();
    changeInput("contract_id", dispute.current.id);
    changeInput("oracle_wallet", wallet.address);
    changeInput("wallet_part", counterparty.wallet.toLowerCase());
    setShowVoteOverlay({ counterparty, idx });
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

  const onFileDelete = file => {
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
    formUpdated === false ||
    updating === true ||
    dispute.saving === true ||
    !isValid();

  const onSubmit = () => {
    if (!submitDisabled) {
      global.drizzle.store.dispatch({
        type: PUT_VOTE,
        vote: dispute.vote,
        attachments,
        callback: () => {
          setFormUpdated(false);
          setShowVoteOverlay(false);
        } // reset form
      });
    }
  };

  const breadcrumbs = [
    {
      label: labels.disputes,
      to: "/disputes",
      exact: true
    },
    {
      label: labels.disputeDetails,
      active: true,
      to: "/disputes/detail"
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
    winner,
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
    earnings,
    totalTokens,
    details: issues
  } = dispute.current;

  console.log("ContractDetail - contract", {
    isValid: isValid(),
    errors,
    validateForm,
    setFormData
  });

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
    hasPenaltyFee && hasPenaltyFee !== "0"
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
      winner,
      earnings,
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

  const countdownOptions = {
    ...contractData.duration,
    statusId,
    startDate: statusUpdatedAt,
    onExpire: () => onExpire(dispute.id),
    showSeconds: true
  };

  return typeof params.id !== "undefined" &&
    !(loaded === true && typeof dispute.current.id === "undefined") ? (
    <Page>
      <Header />
      <SubHeader>
        <Breadcrumbs crumbList={breadcrumbs} />
        {statusId === 39 && <ResolvedDisputeNotification />}
      </SubHeader>
      <Content>
        {!dispute.updating && counterparties ? (
          <>
            <Main>
              <ContractSummary
                data={{
                  ...contractData,
                  category: { label: contractData.category }
                }}
                dispute={true}
              />

              <DisputeMainAccordions
                details={contractData.details}
                files={uploadedFiles}
                onView={onFileView}
              />

              {counterparties && (
                <DisputeResolutionProposal
                  proposals={[
                    {
                      ...proposalPartA,
                      ...common,
                      from: { ...counterparties[0] },
                      proposal: {
                        part_a: proposalPartA.proposal.proposal_part_a,
                        part_b: proposalPartA.proposal.proposal_part_b
                      }
                    },
                    {
                      ...proposalPartB,
                      ...common,
                      from: { ...counterparties[1] },
                      proposal: {
                        part_a: proposalPartB.proposal.proposal_part_a,
                        part_b: proposalPartB.proposal.proposal_part_b
                      }
                    }
                  ]}
                  onView={onFileView}
                />
              )}
            </Main>
            <Aside>
              {user.wallet && (
                <DisputeSidebar
                  disabled={dispute.saving}
                  submitDisabled={submitDisabled}
                  currentWallet={user.wallet}
                  currentPart={currentPart}
                  notificationLoading={dispute.notificationLoading}
                  contract={contractData}
                  activities={contract.current.activities}
                  currentUserCanPay={currentUserCanPay}
                  lastPartInvolved={lastPartInvolved}
                  voteCounterparties={voteCounterparties}
                  history={history}
                  oracles={oracle.currentList}
                  onSubmit={onSubmit}
                  onVote={onVote}
                  onView={onFileView}
                />
              )}
            </Aside>
          </>
        ) : (
          <Main>
            <SpinnerOnly loading={dispute.updating} />
          </Main>
        )}

        {filePath && (
          <Viewer
            isOpen={openPreview}
            filePath={filePath}
            countdownOptions={countdownOptions}
            statusId={statusId}
            contract={contractData}
            currentWallet={user.wallet}
            counterparties={voteCounterparties}
            onVote={(counterparty, idx) => {
              onRequestClose();
              setShowVoteOverlay({ counterparty, idx });
            }}
            onReject={() => alert("Rejected Contract")}
            onFileLoadingError={onFileError}
            onRequestClose={onRequestClose}
          />
        )}

        <Viewer
          isOpen={
            showVoteOverlay && showVoteOverlay.counterparty ? true : false
          }
          countdownOptions={countdownOptions}
          statusId={statusId}
          contract={contractData}
          current={showVoteOverlay}
          currentIdx={showVoteOverlay.idx}
          currentVote={dispute.vote}
          currentWallet={user.wallet}
          hasError={hasError}
          counterparties={voteCounterparties}
          onVote={(counterparty, idx) => {
            onRequestClose();
            setShowVoteOverlay({ counterparty, idx });
          }}
          onReject={() => alert("Rejected Contract")}
          onInputChange={onInputChange}
          changeInput={changeInput}
          onFileAdded={onFileAdded}
          onFileLoadingError={() => alert("file error")}
          onRequestClose={() => setShowVoteOverlay(false)}
          onVoteSubmit={() => onSubmit()}
          metaMaskError={metaMaskError}
        />

        <ModalDiscliamer
          isOpen={showModal}
          onAccept={() => setShowModal(false)}
          onDecline={() => setShowModal(false)}
        />

        <Disclaimer />
      </Content>
    </Page>
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
