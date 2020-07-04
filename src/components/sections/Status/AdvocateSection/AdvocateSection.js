import React, { useEffect } from "react";
import "./AdvocateSection.scss";

import Section from "JurCommon/Section";
import HeaderBox from "../../../app-specific/Advocate/HeaderBox";
import {
  ADVOCATE_FETCH_MINE,
  ADVOCATE_TOGGLE_AVAILABLE
} from "../../../../reducers/types";
import BalancesBox from "../../../app-specific/Advocate/BalancesBox";
import {
  getAdvocate,
  getAdvocateMeta,
  getIsAdvocateAvailableShown,
  getWallet
} from "../../../../sagas/Selectors";
import { isMyProfile } from "../../../../utils/AdvocateHelpers";
import AvailableBox from "../../../app-specific/Advocate/AvailableBox/AvailableBox";

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
          <AvailableBox />
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
