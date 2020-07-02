import React, { useEffect } from "react";
import "./AdvocateSection.scss";

import Section from "JurCommon/Section";
import HeaderBox from "../../../app-specific/Advocate/HeaderBox";
import { ADVOCATE_FETCH_MINE } from "../../../../reducers/types";

const AdvocateSection = ({ fetchMyAdvocasy }) => {
  useEffect(() => {
    fetchMyAdvocasy();
  }, []);

  return (
    <Section>
      <HeaderBox />
    </Section>
  );
};

const fetchMyAdvocasy = () => ({
  type: ADVOCATE_FETCH_MINE
});

const mapDispatchToProps = { fetchMyAdvocasy };

export default global.connection(AdvocateSection, null, mapDispatchToProps);
