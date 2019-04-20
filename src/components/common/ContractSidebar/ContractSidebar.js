import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
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
import { CONTRACT_READ_NOTIFICATIONS } from "../../../reducers/types";

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
  onDispute,
  onSuccess,
  currentWallet,
  currentPart,
  hasError,
  isValid,
  onPay,
  onReject,
  onAccept,
  onChangeSelect,
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

  const readActivities = () => {
    global.drizzle.store.dispatch({
      type: CONTRACT_READ_NOTIFICATIONS
    });
  };

  const onCancel = () => {
    setShowProposalForm(false);
    setActivitiesOpen(true);
  };

  const availableActions = () => {
    // TODO: made some checks for actions as been done here src/components/sections/Contracts/Contracts.js

    if (statusId === 1 && isPartB) {
      // waiting actions
      return (
        <>
          <Button color="dispute" onClick={onReject}>
            {labels.reject}
          </Button>
          <Button color="muted" variant="gradient" onClick={onAccept}>
            {labels.accept}
          </Button>
        </>
      );
    }

    if (statusId === 2) {
      // waiting actions
      return (
        <>
          <Button color="gradient" variant="gradient" onClick={onPay} fullWidth>
            {labels.payment}
          </Button>
        </>
      );
    }

    if (statusId === 5) {
      if (showProposalForm) {
        // ongoing actions
        return (
          <>
            {!isPartB && (
              <Button
                color="friendly"
                variant={showProposalForm === true ? "contained" : "outlined"}
                onClick={() => setShowProposalForm(true)}
              >
                {labels.friendlyResolution}
              </Button>
            )}
            <Button
              color="dispute"
              variant={
                isPartB || showProposalForm === 2 ? "contained" : "outlined"
              }
              fullWidth={isPartB}
              onClick={() => setShowProposalForm(2)}
            >
              {labels.dispute}
            </Button>
          </>
        );
      }
      // ongoing actions fallback
      return (
        <>
          <Button
            color="dispute"
            fullWidth={isPartB}
            onClick={() => {
              setShowProposalForm(isPartB ? 2 : true);
              setActivitiesOpen(false);
            }}
          >
            {labels.dispute}
          </Button>
          {!isPartB && (
            <Button color="success" onClick={onSuccess}>
              {labels.success}
            </Button>
          )}
        </>
      );
    }

    const canSave = disabled || submitDisabled || !formUpdated ? false : true;
    const canSend =
      disabled || !isValid || !currentUserCanPay || formUpdated ? false : true;

    // default actions
    return (
      <>
        <Button
          color={!canSave ? "muted" : null}
          onClick={canSave ? onSubmit : undefined}
        >
          {labels.saveContract}
        </Button>
        <Button
          color={!canSend ? "muted" : null}
          variant={!canSend ? "contained" : "gradient"}
          onClick={canSend ? onSend : undefined}
        >
          {labels.sendToCounterparty}
        </Button>
      </>
    );
  };

  return (
    <div>
      <ContractActions statusId={statusId} part={currentPart}>
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
          <ActivityList activities={activities || []} />
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
            onChange={value => onChangeValue("duration", value)}
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
            handleChange={selectedOptionId => console.log(selectedOptionId)}
          />
        </>
      )}
      {statusId >= 4 && statusId <= 9 && showProposalForm && (
        <ProposalForm
          extended={showProposalForm === 2 ? true : false}
          description={
            showProposalForm === 2
              ? labels.disputeProposalDescription
              : labels.friendlyProposalDescription
          }
          currentUserWallet={currentWallet.address}
          currentProposal={currentProposal}
          onCancel={onCancel}
          contract={contract}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
