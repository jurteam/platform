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
  isPublic,
  toggleDetails,
  isAdvocate
}) => {
  useEffect(() => {
    fetchMyAdvocasy();
  }, []);

  return (
    <Section>
      <HeaderBox address={address} isAdvocate={isAdvocate} />
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
              <AvailableBox />
              <YourActivitiesBox />
            </>
          )}
          <RewardsBox />
        </>
      ) : null}
    </Section>
  );
};

const mapStateToProps = state => {
  const address = getWallet(state).address;
  return {
    advocasy: getAdvocate(state),
    isShown: getIsAdvocateAvailableShown(state),
    address,
    isPublic: !isMyProfile(address),
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
