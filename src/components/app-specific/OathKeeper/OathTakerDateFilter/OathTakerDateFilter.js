import React from "react";
import "./OathTakerDateFilter.scss";
import CalendarFilter from "JurCommon/CalendarFilter";
import Separator from "JurCommon/Separator";

const OathTakerDateFilter = ({ onChange, startsAt, endsAt }) => (
  <>
    <CalendarFilter
      selectedDate={startsAt}
      name="From"
      maxDate={endsAt}
      onChange={startsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter"
    />
    <Separator />
    <CalendarFilter
      selectedDate={endsAt}
      name="To"
      minDate={startsAt}
      onChange={endsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter jur-oath-taker-date-filter__to"
    />
  </>
);

const mapStateToProps = state => ({
  startsAt: state.oathKeeper.oathTakersFilters.startsAt,
  endsAt: state.oathKeeper.oathTakersFilters.endsAt
});

export default global.connection(OathTakerDateFilter, mapStateToProps);
