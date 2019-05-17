import React, { useState, useContext } from "react";
import CalendarFilter from "../CalendarFilter";
import Form from "../Form";
import Button from "../Button";
import { SearchIcon } from "../Icons/SearchIcon";
import statusList from "../../../assets/i18n/en/status.json"; // status
import categories from "../../../assets/i18n/en/contractCategories.json"; // categories
import "./DisputesFilters.scss";
import { getFormattedDate } from "../../../utils/helpers"; // helpers
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputesFilters = ( props ) => {
  const [state, setState] = useState({
    status: props.status,
    category: props.category,
    fromDate: props.fromDate,
    toDate: props.toDate,
    searchText: props.searchText,
    disabled: props.disabled
  });

  const { myDispute, onChange, onSubmit, onReset } = props;

  const handleChange = (type, value) => {

    onChange(type, value);

    setState((state) => {
      const newState = { ...state, [type]: value };
      if (typeof onChange === "function") onChange(newState);
      return newState;
    });
  };

  const handleReset = () => {
    if (typeof onReset === "function") {onReset();};
  };


  const { labels } = useContext(AppContext);

  return (
    <div
      className={`jur-disputes-filter ${
        state.disabled ? "jur-disputes-filter--disabled" : ""
      }`}
    >
      <Button
        color="info"
        variant={myDispute ? "" : "contained"}
        onClick={() => {
          handleChange("mine", false);
          onSubmit();
        }}
        hoverColor="info"
      >
        {labels.all}
      </Button>
      <Button
        color="info"
        variant={myDispute ? "contained" : ""}
        onClick={() => {
          handleChange("mine", true);
          onSubmit();
        }}
        hoverColor="info"
      >
        {labels.myDisputes}
      </Button>
      <Form.Select
        placeholder={labels.filterByStatus}
        value={state.status}
        onChange={(value) => handleChange("status", value)}
        options={statusList.slice(-4)}
      />
      <Form.Select
        placeholder={labels.filterByCategory}
        value={state.category}
        onChange={(value) => handleChange("category", value)}
        options={categories.slice(0, -1)} // no other
      />
      <CalendarFilter
        name="from"
        selectedDate={state.fromDate}
        onChange={(value) => handleChange("fromDate", getFormattedDate(value))}
      />
      <span className="separator canDisable" />
      <CalendarFilter
        name="to"
        selectedDate={state.toDate}
        onChange={(value) => handleChange("toDate", getFormattedDate(value))}
      />
      <Form.Search onChange={(value) => handleChange("searchText", value)} />
      <Button
        color="info"
        variant="contained"
        onClick={onSubmit}
        size="medium"
        hoverColor="info"
        className="can-disable"
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
