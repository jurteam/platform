import React, { useState, useContext } from "react"; // eslint-disable-line no-unused-vars

import { AppContext } from "../../../../bootstrap/AppProvider"; // context

import UserPrivacy from "../../../../components/common/UserPrivacy"; // components
import { PrivacyModal } from "./PrivacyModal";

const Privacy = props => {
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

  return (
    <>
      <UserPrivacy data={privacyData} disclaimerAccepted={disclaimer.optin} />
      <PrivacyModal isOpen={showModalDisclaimer} onAccept={() => {props.disclaimerDecline(); setShowModalDisclaimer(false);}} onDecline={() => setShowModalDisclaimer(false)}/>
      <PrivacyModal isOpen={showModalContracts} onAccept={() => {props.deleteContracts(); setShowModalContracts(false);}} onDecline={() => setShowModalContracts(false)}/>
      <PrivacyModal isOpen={showModalDisputes} onAccept={() => {props.deleteDisputes(); setShowModalDisputes(false);}} onDecline={() => setShowModalDisputes(false)}/>
    </>
  );
};

export default Privacy;
