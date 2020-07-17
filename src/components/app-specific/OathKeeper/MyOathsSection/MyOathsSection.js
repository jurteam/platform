import React, { useEffect } from "react";
import "./MyOathsSection.scss";

import Section from "JurCommon/Section";
import Disclaimer, { ModalDiscliamer } from "JurCommon/Disclaimer";
import MyOathsHeaderBox from "../MyOathsHeaderBox";
import TakeOathBox from "../TakeOathBox";
import YourOathsBox from "../YourOathsBox";
import MyOathsFooterBox from "../MyOathsFooterBox";
import { getWallet, getMyOaths } from "../../../../sagas/Selectors";
import {
  OATH_KEEPER_FETCH_MY_OATHS,
  OATH_KEEPER_FETCH_RANK
} from "../../../../reducers/types";

const MyOathsSection = ({
  address,
  rank,
  balance,
  oaths,
  isFetchingMyOaths,
  fetchMyOaths,
  fetchMyRank
}) => {
  useEffect(() => {
    fetchMyOaths();
    fetchMyRank();
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
      <ModalDiscliamer />
      <Disclaimer />
    </Section>
  );
};

const mapStateToProps = state => ({
  address: getWallet(state).address,
  rank: state.oathKeeper.myRank,
  balance: state.oathKeeper.myBalance,
  isFetchingMyOaths: state.oathKeeper.isFetchingMyOaths,
  oaths: getMyOaths(state)
});

const fetchMyOaths = () => ({ type: OATH_KEEPER_FETCH_MY_OATHS });
const fetchMyRank = () => ({ type: OATH_KEEPER_FETCH_RANK });

const mapDispatchToProps = {
  fetchMyOaths,
  fetchMyRank
};

export default global.connection(
  MyOathsSection,
  mapStateToProps,
  mapDispatchToProps
);
