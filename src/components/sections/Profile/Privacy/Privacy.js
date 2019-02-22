import React, { useState, useContext } from "react"; // eslint-disable-line no-unused-vars

import { AppContext } from "../../../../bootstrap/AppProvider"; // context

import UserPrivacy from "../../../../components/common/UserPrivacy"; // components

const Privacy = props => {
  // Context
  const { labels } = useContext(AppContext);

  const { disclaimer } = props.user;

  let privacyData = [];

  if (disclaimer.optin) {
    privacyData.push({
      title: labels.disclaimer,
      description: labels.disclaimerText,
      buttonLabel: labels.decline,
      handler: props.disclaimerDecline
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
    handler: props.deleteContracts
  });
  privacyData.push({
    description: labels.deleteAllYourDisputesText,
    buttonLabel: labels.deleteAllYourDisputes,
    handler: props.deleteDisputes
  });

  return (
    <UserPrivacy data={privacyData} disclaimerAccepted={disclaimer.optin} />
  );
};

export default Privacy;
