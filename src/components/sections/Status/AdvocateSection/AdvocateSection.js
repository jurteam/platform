import React, { useEffect } from "react";
import "./AdvocateSection.scss";

import Section from "JurCommon/Section";
import {
  ADVOCATE_FETCH_PROFILE,
  ADVOCATE_TOGGLE_AVAILABLE,
  ADVOCATE_RESET_PROFILE
} from "../../../../reducers/types";
import {
  getAdvocate,
  getAdvocateMeta,
  getIsAdvocateAvailableShown,
  getWallet
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
  bio,
  resetAdvocate
}) => {
  const effectiveAddress = address || myAddress;

  useEffect(() => {
    fetchAdvocate(effectiveAddress);
    return resetAdvocate;
  }, [effectiveAddress, fetchAdvocate, resetAdvocate]);

  return (
    <Section>
      <HeaderBox address={effectiveAddress} isAdvocate={isAdvocate} />
      {isAdvocate ? (
        <>
          <AdvocateBio advocasy={advocasy} address={effectiveAddress} />
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
          <AdvocatesIndex />
          <AdvocatesFooterBox />
        </>
      )}
      <ModalDiscliamer />
      <Disclaimer />
    </Section>
  );
};

const mapStateToProps = state => {
  const myAddress = getWallet(state).address;
  return {
    advocasy: getAdvocate(state),
    isShown: getIsAdvocateAvailableShown(state),
    myAddress,
    isPublic: !isMyProfile(myAddress),
    isAdvocate: getAdvocateMeta(state).isAdvocate
  };
};

const fetchAdvocate = address => ({
  type: ADVOCATE_FETCH_PROFILE,
  payload: { address }
});

const resetAdvocate = () => ({ type: ADVOCATE_RESET_PROFILE });

const toggleDetails = () => ({
  type: ADVOCATE_TOGGLE_AVAILABLE
});

const mapDispatchToProps = { fetchAdvocate, toggleDetails, resetAdvocate };

export default global.connection(
  AdvocateSection,
  mapStateToProps,
  mapDispatchToProps
);
