import React, { useEffect } from "react";
import "./MyOathsSection.scss";

import Section from "JurCommon/Section";
import MyOathsHeaderBox from "../MyOathsHeaderBox";
import TakeOathBox from "../TakeOathBox";
import YourOathsBox from "../YourOathsBox";
import MyOathsFooterBox from "../MyOathsFooterBox";
import { getWallet, getMyOaths } from "../../../../sagas/Selectors";
import { OATH_KEEPER_FETCH_MY_OATHS } from "../../../../reducers/types";

const MyOathsSection = ({
  address,
  rank,
  balance,
  oaths,
  isFetchingMyOaths,
  fetchMyOaths
}) => {
  useEffect(() => {
    fetchMyOaths();
  }, []);

  return (
    <Section>
      <MyOathsHeaderBox
        address={address}
        rank={rank}
        balance={balance}
        oaths={oaths}
      />
      <TakeOathBox />
      <YourOathsBox oaths={oaths} isLoading={isFetchingMyOaths} />
      <MyOathsFooterBox />
    </Section>
  );
};

const mapStateToProps = state => ({
  address: getWallet(state).address,
  rank: 6, // TODO: get rank from backend
  balance: Number(getWallet(state).balance), // TODO: get oath keeper balance
  isFetchingMyOaths: state.oathKeeper.isFetchingMyOaths,
  oaths: getMyOaths(state)
});

const fetchMyOaths = () => ({ type: OATH_KEEPER_FETCH_MY_OATHS });

const mapDispatchToProps = {
  fetchMyOaths
};

export default global.connection(
  MyOathsSection,
  mapStateToProps,
  mapDispatchToProps
);
