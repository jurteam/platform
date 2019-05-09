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
  lastPartInvolved,
  onPay,
  onView,
  onReject,
  onAccept,
  onAcceptAmendment,
  onChangeSelect,
  onSubmitProposal,
  onProposalFileAdded,
  history,
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
                variant={showProposalForm === 2 ? "outlined" : "contained"}
                onClick={() => setShowProposalForm(true)}
                hoverColor="friendly"
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
            fullWidth={isPartB}
            hoverColor="dispute"
            onClick={() => {
              setShowProposalForm(isPartB ? 2 : true);
              setActivitiesOpen(false);
            }}
          >
            {labels.dispute}
          </Button>
          {!isPartB && (
            <Button color="success" onClick={onSuccess} hoverColor="success">
              {labels.success}
            </Button>
          )}
        </>
      );
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

    if (statusId === 31) {
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
            {labels.dispute}
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
          hoverColor="success"
        >
          {labels.sendToCounterparty}
        </Button>
      </>
    );
  };

  return (
    <div>
      <ContractActions statusId={statusId} part={currentPart} shouldWait={shouldWaitDispute} disabled={disabled}>
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
      {((statusId >= 4 && statusId <= 9) || statusId === 21 || statusId === 31) && showProposalForm && (
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
          onSubmit={() => onSubmitProposal(issue, setShowProposalForm, setActivitiesOpen)}
        />
      )}
    </div>
  );
};
