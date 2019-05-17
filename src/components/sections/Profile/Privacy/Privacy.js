import React, { useState, useContext } from "react"; // eslint-disable-line no-unused-vars

import { AppContext } from "../../../../bootstrap/AppProvider"; // context

import UserPrivacy from "../../../../components/common/UserPrivacy"; // components
import { PrivacyModal } from "./PrivacyModal";

import { USER_OBLIVION, DELETE_ALL_CONTRACTS, DELETE_ALL_DISPUTES } from "../../../../reducers/types";

const Privacy = ( props ) => {
  // Context
  const { labels } = useContext(AppContext);

  const [ showModalDisclaimer, setShowModalDisclaimer ] = useState(false);
  const [ showModalContracts, setShowModalContracts ] = useState(false);
  const [ showModalDisputes, setShowModalDisputes ] = useState(false);

  const { disclaimer } = props.user;

  let privacyData = [];

  if (disclaimer.optin) {
    privacyData.push({
      title: labels.disclaimer,
      description: labels.disclaimerText,
      buttonLabel: labels.decline,
      handler: () => setShowModalDisclaimer(true)
    });
  } else {
    privacyData.push({
      title: labels.disclaimer,
      description: labels.disclaimerText,
      buttonLabel: labels.accept,
      buttonVariant: "contained",
      handler: props.disclaimerAccept
    });
  }

  // Data Management
  privacyData.push({
    title: labels.dataManagement,
    description: labels.deleteAllYourContractsText,
    buttonLabel: labels.deleteAllYourContracts,
    handler: () => setShowModalContracts(true)
  });
  privacyData.push({
    description: labels.deleteAllYourDisputesText,
    buttonLabel: labels.deleteAllYourDisputes,
    handler: () => setShowModalDisputes(true)
  });

  const disclaimerDecline = () => {

    global.drizzle.store.dispatch({
      type: USER_OBLIVION
    });

    if (typeof props.disclaimerDecline === "function") props.disclaimerDecline(); // callback
  }

  const deleteContracts = () => {

    global.drizzle.store.dispatch({
      type: DELETE_ALL_CONTRACTS
    });

    if (typeof props.deleteContracts === "function") props.deleteContracts(); // callback
  }

  const deleteDisputes = () => {

    global.drizzle.store.dispatch({
      type: DELETE_ALL_DISPUTES
    });

    if (typeof props.deleteDisputes === "function") props.deleteDisputes(); // callback
  }

  return (
    <>
      <UserPrivacy data={privacyData} disclaimerAccepted={disclaimer.optin} />
      <PrivacyModal isOpen={showModalDisclaimer} onAccept={() => {disclaimerDecline(); setShowModalDisclaimer(false);}} onDecline={() => setShowModalDisclaimer(false)}/>
      <PrivacyModal isOpen={showModalContracts} onAccept={() => {deleteContracts(); setShowModalContracts(false);}} onDecline={() => setShowModalContracts(false)}/>
      <PrivacyModal isOpen={showModalDisputes} onAccept={() => {deleteDisputes(); setShowModalDisputes(false);}} onDecline={() => setShowModalDisputes(false)}/>
    </>
  );
};

export default Privacy;
