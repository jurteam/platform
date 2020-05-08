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
      maxDate={endsAt}
      onChange={startsAt => onChange(startsAt, endsAt)}
    />
    <Separator />
    <CalendarFilter
      selectedDate={endsAt}
      name="To"
      minDate={startsAt}
      onChange={endsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter-to"
    />
  </>
);

const mapStateToProps = state => ({
  startsAt: state.oathKeeper.oathTakersFilters.startsAt,
  endsAt: state.oathKeeper.oathTakersFilters.endsAt
});

export default global.connection(OathTakerDateFilter, mapStateToProps);
