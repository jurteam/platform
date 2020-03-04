/* eslint-disable react-hooks/exhaustive-deps */
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

import Viewer from "../../common/Viewer";

import { SpinnerOnly } from "../../common/Spinner";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { ethToHuman, log } from "../../../utils/helpers"; // log helper

import {
  API_GET_DISPUTE,
  // PUT_CONTRACT,
  PUT_VOTE,
  // NEW_ARBITRATION,
  // CONTRACT_ISSUE,
  // REJECT_ARBITRATION,
  // ACCEPT_ARBITRATION,
  // ACCEPT_ARBITRATION_AMENDMENT,
  // PAY_ARBITRATION,
  EXPIRED_CONTRACT,
  DISPUTE_PAYOUT_PARTY,
  DISPUTE_PAYOUT_VOTER,
  // SUCCESS_ARBITRATION,
  // SEND_TO_COUNTERPARTY,
  // DISCLAIMER_MUST_BE_ACCEPTED,
  // CONTRACT_MEDIA_DELETE
} from "../../../reducers/types";
import ActionsBar from "../../chain/ActionsBar";

export const DisputeDetail = ( props ) => {
  const { labels } = useContext(AppContext);

  const [loaded, setLoaded] = useState(false);

  // const [showModalSuccess, setShowModalSuccess] = useState(false);

  // const [showModalRejectPay, setShowModalRejectPay] = useState(false);

  const [showVoteOverlay, setShowVoteOverlay] = useState(false);
  const [metaMaskError /*, setMetaMaskError */] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [attachments, setAttachments] = useState([]);

  // const [proposalAttachments, setProposalAttachments] = useState([]);

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
      },
      history
    } = props;

    global.store.dispatch({
      type: API_GET_DISPUTE,
      id,
      onSuccess: pageLoaded,
      onError: pageLoaded,
      history
    });
  }, [wallet.address]);

  useEffect(() => {
    log('useEffect - showVoteOverlay',showVoteOverlay)
    if (!showVoteOverlay) {
      changeInput("amount", 0.01)
    }
  }, [showVoteOverlay]);

  const changeInput = (name, value) => {
    if (!formUpdated) {setFormUpdated(true);};
    setFormData({ ...dispute.vote, [name]: value });

    const { updateVoteField } = props;
    updateVoteField(name, value); // dispatch action
  };

  const onInputChange = (ev) => {
    const target = ev.target;
    log("onInputChange", target, ev);
    if (target) {
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      changeInput(name, value);
    }
  };

  const onFileAdded = (selectedFiles) => {
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

  const onExpire = () => {
    const { id } = dispute.current;

    global.store.dispatch({
      type: EXPIRED_CONTRACT,
      id
    });
  };


  const onWithdraw = () => {

    const {
      id,
      address,
      hasToWithdraw
    } = dispute.current;

    global.store.dispatch({
      type: DISPUTE_PAYOUT_PARTY,
      id,
      address,
      history
    });

  };

  const onPayout = () => {

    const {
      id,
      address,
      hasToWithdraw
    } = dispute.current;

    global.store.dispatch({
      type: DISPUTE_PAYOUT_VOTER,
      id,
      address,
      history
    });

  };

  const onVote = (counterparty, idx) => {
    onRequestClose();
    changeInput("contract_id", dispute.current.id);
    changeInput("oracle_wallet", wallet.address);
    changeInput("wallet_part", counterparty.wallet.toLowerCase());
    changeInput("reject", false);
    setShowVoteOverlay({ counterparty, idx });
  };

  // const onSend = () => {
  //   log("onSend", "run");

  //   global.store.dispatch({
  //     type: NEW_ARBITRATION
  //   });
  // };

  const onProgress = percentage => {
    // log(percentage);
  };

  // const onFileDelete = (file) => {
  //   log("file delete", file);

  //   global.store.dispatch({
  //     type: CONTRACT_MEDIA_DELETE,
  //     ...file
  //   });
  // };

  // form error handling
  const hasError = (field) =>
    typeof errors[field] !== "undefined" &&
    errors[field].length > 0 &&
    formUpdated; // show error only when form is update at least one time

  const currentUserCanPay = dispute.vote.amount <= Number(ethToHuman(wallet.balance));

  // disable update
  const submitDisabled =
    currentUserCanPay === false ||
    formUpdated === false ||
    updating === true ||
    dispute.saving === true ||
    !isValid();

  const onSubmit = () => {
    if (!submitDisabled) {
      global.store.dispatch({
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

  const onRejectOpener = () => {
    onRequestClose();
    changeInput("contract_id", dispute.current.id);
    changeInput("oracle_wallet", wallet.address);
    changeInput("wallet_part", "0x0");
    changeInput("reject", true);
    const counterparty = {
      wallet: 0,
      name: "",
      winner: false
    };
    const idx = -1;
    setShowVoteOverlay({counterparty, idx});
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
    totalTokensReject,
    earnings,
    // totalTokens,
    details: issues
  } = dispute.current;

  log("ContractDetail - contract", {
    isValid: isValid(),
    errors,
    validateForm,
    setFormData
  });

  let currentPart = null;
  if (
    typeof currentPart !== "undefined" &&
    typeof counterparties !== "undefined" &&
    typeof counterparties[1] !== "undefined" &&
    typeof counterparties[1].wallet !== "undefined" &&
    typeof wallet !== "undefined" &&
    typeof wallet.address !== "undefined" && wallet.address !== null
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
  let voteReject = {};

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

    let rejectPercentage = (100 - percentagePartA - percentagePartB);
    rejectPercentage =rejectPercentage > 0 ? rejectPercentage : 0;

    voteReject = {
      percentage: rejectPercentage,
      value: totalTokensReject,
    }
    
    if (statusId === 39) {
      voteCounterparties.push({
        wallet: '0x0',
        name: 'Reject',
        email: null,
        renderName: true,
        percentage: (100-percentagePartB-percentagePartA),
        value: totalTokensReject,
        winner: false
      })
    }
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
            <ActionsBar isDispute={true} />
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
                  onWithdraw={onWithdraw}
                  onPayout={onPayout}
                  payout={
                    { 
                      hasWithdrawn: dispute.current.hasWithdrawn,
                      hasToGetReward: dispute.current.hasToGetReward,
                      voteLookup: dispute.current.voteLookup,
                      sumToWithdraw: dispute.current.sumToWithdraw,
                      reward: dispute.current.reward,
                    }                    
                  }
                  history={history}
                  oracles={oracle.currentList}
                  onSubmit={onSubmit}
                  onVote={onVote}
                  onReject={onRejectOpener}
                  onView={onFileView}
                  voteReject={voteReject}
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
            currentUserCanPay={currentUserCanPay}
            onVote={(counterparty, idx) => onVote(counterparty, idx)}
            onReject={onRejectOpener}
            error={!currentUserCanPay}
            onFileLoadingError={onFileError}
            onRequestClose={onRequestClose}
            voteReject={voteReject}
          />
        )}

        <Viewer
          isOpen={
            showVoteOverlay && showVoteOverlay.counterparty ? true : false
          }
          countdownOptions={countdownOptions}
          statusId={statusId}
          error={!currentUserCanPay}
          contract={contractData}
          current={showVoteOverlay}
          currentIdx={showVoteOverlay.idx}
          currentVote={dispute.vote}
          shouldHide={dispute.updating || dispute.saving}
          currentWallet={user.wallet}
          submitDisabled={submitDisabled}
          currentUserCanPay={currentUserCanPay}
          hasError={hasError}
          counterparties={voteCounterparties}
          onVote={(counterparty, idx) => onVote(counterparty, idx)}
          onReject={onRejectOpener}
          onInputChange={onInputChange}
          changeInput={changeInput}
          onFileAdded={onFileAdded}
          onFileLoadingError={() => alert("file error")}
          onRequestClose={() => setShowVoteOverlay(false)}
          onVoteSubmit={() => onSubmit()}
          metaMaskError={metaMaskError}
          voteReject={voteReject}
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
