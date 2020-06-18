import React from "react";
import "./MyStatusSection.scss";

import Section from "JurCommon/Section";
import HeaderBox from "../HeaderBox";
import { getWallet } from "../../../../sagas/Selectors";

const MyStatusSection = ({ address }) => (
  <Section>
    <HeaderBox address={address} />
  </Section>
);

const mapStateToProps = state => ({
  address: getWallet(state).address
});

export default global.connection(MyStatusSection, mapStateToProps);
