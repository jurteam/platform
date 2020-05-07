import React from "react";
import "./OathTakerDateFilter.scss";
import CalendarFilter from "JurCommon/CalendarFilter";
import Separator from "JurCommon/Separator";
import { getFormattedDate } from "../../../../utils/helpers";

const OathTakerDateFilter = ({ onChange, startsAt, endsAt }) => (
  <>
    <CalendarFilter
      selectedDate={startsAt}
      name="From"
      onChange={startsAt =>
        onChange(getFormattedDate(startsAt), getFormattedDate(endsAt))
      }
    />
    <Separator />
    <CalendarFilter
      selectedDate={endsAt}
      name="To"
      onChange={endsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter-to"
    />
  </>
);

export default OathTakerDateFilter;
