import React from "react";
import "./OathTakerDateFilter.scss";
import CalendarFilter from "JurCommon/CalendarFilter";
import Separator from "JurCommon/Separator";

const OathTakerDateFilter = () => (
  <>
    <CalendarFilter name="From" />
    <Separator />
    <CalendarFilter name="To" className="jur-oath-taker-date-filter-to" />
  </>
);

export default OathTakerDateFilter;
