import React, { useEffect } from "react";
import "./AdvocateSection.scss";

import Section from "JurCommon/Section";
import {
  ADVOCATE_FETCH_PROFILE,
  ADVOCATE_TOGGLE_AVAILABLE,
  ADVOCATE_RESET_PROFILE,
  ADVOCATE_HIDE_DISCLAIMER
} from "../../../../reducers/types";
import {
  getAdvocate,
  getAdvocateMeta,
  getIsAdvocateAvailableShown,
  getWallet,
  getAdvocateIsFetching,
  getAdvocateShowDisclaimer
} from "../../../../sagas/Selectors";
import Text from "JurCommon/Text";
import Disclaimer, { ModalDiscliamer } from "JurCommon/Disclaimer";
import HeaderBox from "../../../app-specific/Advocate/HeaderBox";
import BalancesBox from "../../../app-specific/Advocate/BalancesBox";
import { isMyProfile } from "../../../../utils/AdvocateHelpers";
import AvailableBox from "../../../app-specific/Advocate/AvailableBox";
import YourActivitiesBox from "../../../app-specific/Advocate/YourActivitiesBox";
import RewardsBox from "../../../app-specific/Advocate/RewardsBox";
import AdvocatesIndex from "../../../app-specific/Advocate/AdvocatesIndex";
import AdvocatesFooterBox from "../../../app-specific/Advocate/AdvocatesFooterBox";
import AdvocateBio from "../../../app-specific/Advocate/AdvocateBio/AdvocateBio";
const AdvocateSection = ({
  fetchAdvocate,
  advocasy,
  isShown,
  address,
  myAddress,
  isPublic,
  toggleDetails,
  isAdvocate,
  isFetching,
  resetAdvocate,
  closeDisclaimer,
  isDisclaimerOpen
}) => {
  const effectiveAddress = address || myAddress;

  useEffect(() => {
    fetchAdvocate(effectiveAddress);
    return resetAdvocate;
  }, [effectiveAddress, fetchAdvocate, resetAdvocate]);

  return (
    <Section showSpinner={isFetching}>
      <HeaderBox address={effectiveAddress} isAdvocate={isAdvocate} />
      {isAdvocate ? (
        <>
          <AdvocateBio
            advocasy={advocasy}
            address={effectiveAddress}
            isPublic={isPublic}
          />
          <BalancesBox
            rewardsBalance={advocasy.rewardsBalance}
            totalEarned={advocasy.totalEarned}
            totalAvailable={advocasy.totalAvailable}
            isShown={isShown}
            toggleDetails={toggleDetails}
            isPublic={isPublic}
          />
          {isPublic ? null : (
            <>
              {isShown ? <AvailableBox /> : null}
              <YourActivitiesBox />
            </>
          )}
          <RewardsBox
            isPublic={isPublic}
            name={advocasy.name}
            address={effectiveAddress}
          />
        </>
      ) : (
        <>
          <Text size="large" transform="header">
            List of Advocates
          </Text>
          <AdvocatesIndex size="compact" />
          <AdvocatesFooterBox />
        </>
      )}
      <ModalDiscliamer
        isOpen={isDisclaimerOpen}
        onAccept={closeDisclaimer}
        onDecline={closeDisclaimer}
      />
      <Disclaimer />
    </Section>
  );
};

const mapStateToProps = state => {
  const myAddress = getWallet(state).address;
  const isDisclaimerOpen = getAdvocateShowDisclaimer(state);

  return {
    isFetching: getAdvocateIsFetching(state),
    advocasy: getAdvocate(state),
    isShown: getIsAdvocateAvailableShown(state),
    myAddress,
    isPublic: !isMyProfile(myAddress),
    isAdvocate: getAdvocateMeta(state).isAdvocate,
    isDisclaimerOpen
  };
};

const closeDisclaimer = () => ({ type: ADVOCATE_HIDE_DISCLAIMER });

const fetchAdvocate = address => ({
  type: ADVOCATE_FETCH_PROFILE,
  payload: { address }
});

const resetAdvocate = () => ({ type: ADVOCATE_RESET_PROFILE });

const toggleDetails = () => {
  setTimeout(() => {
    var element = document.querySelector("#jur-advocate__availabe-box");
    // smooth scroll to element and align it at the bottom
    element
      ? element.scrollIntoView({ behavior: "smooth", block: "start" })
      : document
          .querySelector(".jur-section")
          .scrollIntoView({ behavior: "smooth", block: "start" });
  }, 200);

  return {
    type: ADVOCATE_TOGGLE_AVAILABLE
  };
};

const mapDispatchToProps = {
  fetchAdvocate,
  closeDisclaimer,
  toggleDetails,
  resetAdvocate
};

export default global.connection(
  AdvocateSection,
  mapStateToProps,
  mapDispatchToProps
);
