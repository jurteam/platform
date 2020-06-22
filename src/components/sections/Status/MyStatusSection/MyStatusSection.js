import React, { useEffect } from "react";
import "./MyStatusSection.scss";

import Section from "JurCommon/Section";
import HeaderBox from "../../../app-specific/Status/HeaderBox";
import { STATUS_FETCH_MINE } from "../../../../reducers/types";

const MyStatusSection = ({ fetchMyStatus }) => {
  useEffect(() => {
    fetchMyStatus();
  }, []);

  return (
    <Section>
      <HeaderBox />
    </Section>
  );
};

const fetchMyStatus = () => ({
  type: STATUS_FETCH_MINE
});

const mapDispatchToProps = { fetchMyStatus };

export default global.connection(MyStatusSection, null, mapDispatchToProps);
