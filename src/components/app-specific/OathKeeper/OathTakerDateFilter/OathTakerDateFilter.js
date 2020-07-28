import React from "react";
import "./OathTakerDateFilter.scss";
import CalendarFilter from "JurCommon/CalendarFilter";
import Separator from "JurCommon/Separator";
import { getLabels } from "../../../../sagas/Selectors";

const OathTakerDateFilter = ({ onChange, startsAt, endsAt, labels }) => (
  <>
    <CalendarFilter
      selectedDate={startsAt}
      name={labels.from}
      maxDate={endsAt}
      onChange={startsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter"
    />
    <Separator />
    <CalendarFilter
      selectedDate={endsAt}
      name={labels.to}
      minDate={startsAt}
      onChange={endsAt => onChange(startsAt, endsAt)}
      className="jur-oath-taker-date-filter jur-oath-taker-date-filter__to"
    />
  </>
);

const mapStateToProps = state => ({
  startsAt: state.oathKeeper.oathTakersFilters.startsAt,
  endsAt: state.oathKeeper.oathTakersFilters.endsAt,
  labels: getLabels(state)
});

export default global.connection(OathTakerDateFilter, mapStateToProps);
