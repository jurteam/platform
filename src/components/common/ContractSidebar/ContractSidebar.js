import React, { useState, useContext, useEffect } from "react";
import ActivityList from "../ActivityList";
import ContractActions from "../ContractActions";
import ContractAccordion from "../ContractAccordion";
import ContractSelectCategory from "../ContractSelectCategory";
import ContractSetDuration from "../ContractSetDuration";
import ContractSetValue from "../ContractSetValue";
import ContractSetCaseDispute from "../ContractSetCaseDispute";
import ProposalForm from "../ProposalForm";
import Button from "../Button";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractSidebar.scss";
import { CONTRACT_READ_NOTIFICATIONS, CONTRACT_DETAIL_PAGE } from "../../../reducers/types";

// Api layouts
// import { Arbitration } from "../../../api";
import { log } from "../../../utils/helpers";

export const ContractSidebar = ({
  disabled,
  submitDisabled,
  formUpdated,
  feeToPay,
  contract,
  currentUserCanPay,
  cases,
  notificationLoading,
  currentProposal,
  selectedOptionId,
  onSubmit,
  onSend,
  activities,
  // onDispute,
  onSuccess,
  currentWallet,
  currentPart,
  hasError,
  isValid,
  // lastPartInvolved,
  onPay,
  onView,
  onReject,
  onAccept,
  onWithdraw,
  onAcceptAmendment,
  onChangeSelect,
  onSubmitProposal,
  onProposalFileAdded,
  history,
  contractAddress,
  statusFrom,
  chainContract,
  onChangeValue
}) => {
  const { labels } = useContext(AppContext);

  const { category, statusId, to, whoPays } = contract;
  const isPartB =
    currentWallet.address.toLowerCase() === to.wallet.toLowerCase()
      ? true
      : false;

  const [showProposalForm, setShowProposalForm] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(true);

  let showFeeMsg = false;
  if (typeof whoPays !== "undefined" && whoPays) {
    showFeeMsg =
      currentWallet.address.toLowerCase() === whoPays.toLowerCase()
        ? true
        : false;
  }

  useEffect(() => {

    console.log('ContractSidebar - Mount');
    global.drizzle.store.dispatch({
      type: CONTRACT_DETAIL_PAGE,
      payload: true
    });

    return () => {
      console.log('ContractSidebar - Unmount');
      global.drizzle.store.dispatch({
        type: CONTRACT_DETAIL_PAGE,
        payload: false
      });
    }; 

  }, []);

  const readActivities = () => {
    global.drizzle.store.dispatch({
      type: CONTRACT_READ_NOTIFICATIONS
    });
  };

  const onCancel = () => {
    setShowProposalForm(false);
    setActivitiesOpen(true);
  };

  // const shouldWaitDispute = lastPartInvolved.toLowerCase() === currentWallet.toLowerCase();
  const shouldWaitDispute = false;
  const issue = showProposalForm === 2 ? "disputes" : "friendly"; // match endpoint route

  const availableActions = () => {
    // TODO: made some checks for actions as been done here src/components/sections/Contracts/Contracts.js

    if (statusId === 1 && isPartB) {
      // waiting actions
      return (
        <>
          <Button color="dispute" onClick={onReject} hoverColor="dispute">
            {labels.reject}
          </Button>
          <Button
            color="gradient"
            variant="gradient"
            onClick={onAccept}
            hoverColor="success"
          >
            {labels.accept}
          </Button>
        </>
      );
    }

    if (statusId === 2 || statusId === 3) {
      // waiting actions
      return (
        <>
          <Button color="gradient" variant="gradient" onClick={onPay} fullWidth>
            {feeToPay > 0 ? labels.payment : labels.confirm}
          </Button>
        </>
      );
    }

    if (statusId === 5 || statusId === 7) {
      if (showProposalForm) {
        // ongoing actions
        return (
          <>
            <Button
              color="friendly"
              variant={showProposalForm === 2 ? "outlined" : "contained"}
              onClick={() => setShowProposalForm(true)}
              hoverColor="friendly"
              disabled={true}
            >
              {labels.friendlyResolution}
            </Button>
            <Button
              color="dispute"
              variant={showProposalForm === 2 ? "contained" : "outlined"}
              onClick={() => setShowProposalForm(2)}
              hoverColor="dispute"
            >
              {labels.openDispute}
            </Button>
          </>
        );
      }
      // ongoing actions fallback
      return (
        <>
          <Button
            color="dispute"
            hoverColor="dispute"
            onClick={() => {
              setShowProposalForm(2);
              setActivitiesOpen(false);
            }}
          >
            {labels.dispute}
          </Button>
          <Button color="success" onClick={onSuccess} hoverColor="success">
            {labels.success}
          </Button>
        </>
      );
    }

    if (statusId === 9 || statusId === 10) {
      if (typeof chainContract !== 'undefined' && chainContract) { // handle contract loading
        let { dispersal, hasWithdrawn } = chainContract
        log('Sidebar chainContract', chainContract)
        dispersal = dispersal[Object.keys(dispersal)[0]]; // handle chain sync & missing info
        hasWithdrawn = hasWithdrawn[Object.keys(hasWithdrawn)[0]]; // handle chain sync & missing info
          if (typeof dispersal !== 'undefined' && dispersal && typeof hasWithdrawn !== 'undefined' && hasWithdrawn) {

          log('Sidebar dispersal', dispersal)
          log('Sidebar hasWithdrawn', hasWithdrawn)
          // waiting actions
          return dispersal.value !== "0" && hasWithdrawn.value === false ? (
            <>
              <Button color="gradient" variant="gradient" onClick={onWithdraw} fullWidth>
                {labels.withdraw}
              </Button>
            </>
          ) : <span className="jur-contract-actions__text">
          {labels.contractIsClosed}
        </span>;
        }
      }
    }

    if (statusId === 21) {
      // ongoing actions fallback
      return (
        <>
          <Button
            color="dispute"
            variant={showProposalForm === 2 ? "contained" : "outlined"}
            onClick={() => {
              setShowProposalForm(2);
              setActivitiesOpen(false);
            }}
            hoverColor="dispute"
          >
            {labels.openDispute}
          </Button>

          <Button
            color="success"
            onClick={onAcceptAmendment}
            hoverColor="success"
          >
            {labels.accept}
          </Button>
        </>
      );
    }

    if (statusId === 31 || statusId === 32) {
      // ongoing actions fallback
      return (
        <>
          <Button
            color="dispute"
            variant={showProposalForm === 2 ? "contained" : "outlined"}
            onClick={() => {
              setShowProposalForm(2);
              setActivitiesOpen(false);
            }}
            fullWidth
            hoverColor="dispute"
          >
            {statusId === 31 ? labels.dispute : labels.amendDispute}
          </Button>
        </>
      );
    }

    if ([35, 36, 38, 39].indexOf(statusId) >= 0) {
      // ongoing actions fallback
      return (
        <>
          <Button
            color="info"
            variant="outlined"
            fullWidth
            onClick={() => history.push(`/disputes/detail/${contract.contractID}`)}
            hoverColor="info"
          >
            {labels.goToDispute}
          </Button>
        </>
      );
    }

    if (statusId === 0) {
      // initial state before saving and before sending to counterparty
      const canSave = disabled || submitDisabled || !formUpdated ? false : true;
      const canSend =
        disabled || !isValid || !currentUserCanPay || formUpdated ? false : true;

      return (
        <>
          <Button
            color={!canSave ? "muted" : null}
            onClick={canSave ? onSubmit : null}
          >
            {labels.saveContract}
          </Button>
          <Button
            color={!canSend ? "muted" : null}
            variant={!canSend ? "contained" : "gradient"}
            onClick={canSend ? onSend : null}
            hoverColor="success"
          >
            {labels.sendToCounterparty}
          </Button>
        </>
      );
    }

      // default actions
    return null; 

  };

  return (
    <div>
      <ContractActions statusId={statusId} part={currentPart} statusFrom={statusFrom} currentWallet={currentWallet} shouldWait={shouldWaitDispute} disabled={disabled}>
        {availableActions()}
      </ContractActions>
      {statusId !== 0 && (
        <ContractAccordion
          title={labels.activities}
          statusId={statusId}
          key={`activities-${activitiesOpen}`}
          initialOpen={activitiesOpen}
          loading={notificationLoading}
          onOpen={readActivities}
        >
          <ActivityList activities={activities || []} onView={onView} />
        </ContractAccordion>
      )}
      {statusId === 0 && (
        <>
          <ContractSelectCategory
            onChange={onChangeSelect}
            category={category}
            isDisabled={disabled}
            hasError={hasError}
          />
          <ContractSetDuration
            contract={contract}
            onChange={(value) => onChangeValue("duration", value)}
            disabled={disabled}
            hasError={hasError}
          />
          <ContractSetValue
            contract={contract}
            feeToPay={feeToPay}
            onChange={onChangeValue}
            currentUserCanPay={currentUserCanPay}
            disabled={disabled}
            showFeeMsg={showFeeMsg}
            hasError={hasError}
          />
          <ContractSetCaseDispute
            cases={cases}
            disabled={disabled}
            selectedOptionId={selectedOptionId}
            handleChange={(selectedOptionId) => console.log(selectedOptionId)}
          />
        </>
      )}
      {((statusId >= 4 && statusId <= 9) || statusId === 21 || statusId === 31 || statusId === 32) && showProposalForm && (
        <ProposalForm
          extended={showProposalForm === 2 ? true : false}
          disabled={disabled}
          description={
            showProposalForm === 2
              ? labels.disputeProposalDescription
              : labels.friendlyProposalDescription
          }
          currentUserWallet={currentWallet.address}
          currentProposal={currentProposal}
          onCancel={onCancel}
          contract={contract}
          onView={onView}
          onProposalFileAdded={onProposalFileAdded}
          onSubmit={(args) => {
            const { /* files, proposal, */ proposalMessage } = args;
            return onSubmitProposal(issue, setShowProposalForm, setActivitiesOpen, proposalMessage);
          }}
        />
      )}
    </div>
  );
};
