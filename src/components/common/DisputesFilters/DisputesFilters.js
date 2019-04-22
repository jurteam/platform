import React, { useState, useContext } from "react";
import CalendarFilter from "../CalendarFilter";
import Form from "../Form";
import Button from "../Button";
import { SearchIcon } from "../Icons/SearchIcon";
import statusList from "../../../assets/i18n/en/status.json"; // status
import categories from "../../../assets/i18n/en/contractCategories.json"; // categories
import "./DisputesFilters.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const DisputesFilters = props => {
  const [state, setState] = useState({
    status: props.status,
    category: props.category,
    fromDate: props.fromDate,
    toDate: props.toDate,
    searchText: props.searchText,
    disabled: props.disabled
  });

  const { myDispute, onChange, onSubmit } = props;

  const handleChange = (type, value) => {

    onChange(type, value);

    setState(state => {
      const newState = { ...state, [type]: value };
      props.onChange(newState);
      return newState;
    });
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
        placeholder="Filter by Status..."
        value={state.status}
        onChange={value => handleChange("status", value)}
        options={statusList.slice(-5)}
      />
      <Form.Select
        placeholder="Filter by Category..."
        value={state.category}
        onChange={value => handleChange("category", value)}
        options={categories.slice(0, -1)} // no other
      />
      <CalendarFilter
        name="from"
        selectedDate={state.fromDate}
        onChange={value => handleChange("fromDate", value)}
      />
      <span className="separator canDisable" />
      <CalendarFilter
        name="to"
        selectedDate={state.toDate}
        onChange={value => handleChange("toDate", value)}
      />
      <Form.Search onChange={value => handleChange("searchText", value)} />
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
