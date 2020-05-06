import React from "react";
import "./OathCardEnumFilter.scss";

import EnumFilter from "JurCommon/EnumFilter";
import { oathKeeperAnalytics } from "../../../../utils/helpers";

const CARD_ENUMS = Object.values(oathKeeperAnalytics.durations);

const OathCardEnumFilter = ({ selected, onChange }) => (
  <EnumFilter enums={CARD_ENUMS} selected={selected} onChange={onChange} />
);

export default OathCardEnumFilter;
