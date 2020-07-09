import React, { useEffect } from "react";
import "./AdvocateSection.scss";

import Section from "JurCommon/Section";
import {
  ADVOCATE_FETCH_MINE,
  ADVOCATE_TOGGLE_AVAILABLE
} from "../../../../reducers/types";
import {
  getAdvocate,
  getAdvocateMeta,
  getIsAdvocateAvailableShown,
  getWallet
} from "../../../../sagas/Selectors";
import Disclaimer, { ModalDiscliamer } from "JurCommon/Disclaimer";
import HeaderBox from "../../../app-specific/Advocate/HeaderBox";
import BalancesBox from "../../../app-specific/Advocate/BalancesBox";
import { isMyProfile } from "../../../../utils/AdvocateHelpers";
import AvailableBox from "../../../app-specific/Advocate/AvailableBox";
import YourActivitiesBox from "../../../app-specific/Advocate/YourActivitiesBox";
import RewardsBox from "../../../app-specific/Advocate/RewardsBox";
const AdvocateSection = ({
  fetchMyAdvocasy,
  advocasy,
  isShown,
  address,
  myAddress,
  isPublic,
  toggleDetails,
  isAdvocate
}) => {
  useEffect(() => {
    fetchMyAdvocasy();
  }, []);

  const effectiveAddress = address || myAddress;

  return (
    <Section>
      <HeaderBox address={effectiveAddress} isAdvocate={isAdvocate} />
      {isAdvocate ? (
        <>
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
          <RewardsBox address={effectiveAddress} />
        </>
      ) : null}
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

const fetchMyAdvocasy = () => ({
  type: ADVOCATE_FETCH_MINE
});

const toggleDetails = () => ({
  type: ADVOCATE_TOGGLE_AVAILABLE
});

const mapDispatchToProps = { fetchMyAdvocasy, toggleDetails };

export default global.connection(
  AdvocateSection,
  mapStateToProps,
  mapDispatchToProps
);
