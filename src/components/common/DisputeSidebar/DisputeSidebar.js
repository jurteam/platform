import React, { useState, useContext, useEffect } from "react";
import ActivityList from "../ActivityList";
import DisputeVote from "../DisputeVote";
import ContractAccordion from "../ContractAccordion";
import OraclesTablePreview from "../OraclesTablePreview";
// import Button from "../Button";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./DisputeSidebar.scss";
import { 
  CONTRACT_READ_NOTIFICATIONS, 
  DISPUTE_DETAIL_PAGE,
} from "../../../reducers/types";


import {
  canVote, log
} from "../../../utils/helpers";


export const DisputeSidebar = ({
  // disabled,
  // submitDisabled,
  // formUpdated,
  // feeToPay,
  contract,
  onWithdraw,
  onPayout,
  // currentUserCanPay,
  // cases,
  notificationLoading,
  voteCounterparties,
  payout,
  // selectedOptionId,
  // onSubmit,
  // onSend,
  oracles,
  activities,
  // onDispute,
  // onSuccess,
  currentWallet,
  // currentPart,
  // hasError,
  // isValid,
  // lastPartInvolved,
  onVote,
  onView,
  onReject,
  voteReject,
  // onAccept,
  // onAcceptAmendment,
  // onChangeSelect,
  // onSubmitProposal,
  // onProposalFileAdded,
  // history,
  // onChangeValue
}) => {
  const { labels, oraclesTableHeaders } = useContext(AppContext);

  const {
    statusId,
    winner,
    earnings,
    // counterparties,
    // percentagePartA,
    // percentagePartB,
    // totalTokensPartA,
    // totalTokensPartB,
    // totalTokens
  } = contract;

  const [activitiesOpen /* , setActivitiesOpen */] = useState(false);
  const [oraclesOpen /*, setOraclesOpen */] = useState(true);

  useEffect(() => {

    log('DisputeSidebar - Mount');
    global.drizzle.store.dispatch({
      type: DISPUTE_DETAIL_PAGE,
      payload: true
    });

    return () => {
      log('DisputeSidebar - Unmount');
      global.drizzle.store.dispatch({
        type: DISPUTE_DETAIL_PAGE,
        payload: false
      });
    }; 

  }, []);

  const readActivities = () => {
    global.drizzle.store.dispatch({
      type: CONTRACT_READ_NOTIFICATIONS
    });
  };

    // {
    //   ethAddress: "0x42cfc69d0b12bc96589390b8c5dca30e72ebf3f2",
    //   vote:
    //     "0x55fe002aeff02f77364de0xf20b9e713a33f61fa38792d2afaf1cd30339126a339a1292923a15844b8",
    //   message:
    //     "Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato.",
    //   evidences: [
    //     {
    //       name: "file1.pdf"
    //     }
    //   ],
    //   amount: 38974,
    //   date: "2019-01-08T14:25:44.335Z"
    // }


  return (
    <div>
      {voteCounterparties && (
        <DisputeVote
          title={statusId === 39 ? labels.voting : labels.whoDoYouThinkIsRight}
          statusId={statusId}
          counterparties={voteCounterparties}
          currentWallet={currentWallet}
          onVote={onVote}
          earnings={earnings}
          onWithdraw={onWithdraw}
          onPayout={onPayout}
          payout={payout}
          winner={winner}
          onReject={onReject}
          voteReject={voteReject}
          canVote={canVote(statusId)}
        />
      )}
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

      <ContractAccordion
        title={labels.oracles}
        key={`oracles-${oraclesOpen}`}
        initialOpen={oraclesOpen}
        tooltip={labels.oraclesText}
      >
        <OraclesTablePreview
          headers={oraclesTableHeaders}
          data={oracles || []}
          currentUserWallet={currentWallet}
          viewAllDetails={`/disputes/detail/${contract.contractID}/oracles`}
        />
      </ContractAccordion>
    </div>
  );
};
