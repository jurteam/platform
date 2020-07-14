import React, { Component } from "react";
import CalendarFilter from "../CalendarFilter";
import Form from "../Form";
import Button from "../Button";
import { SearchIcon } from "../Icons/SearchIcon";
import statusList from "../../../assets/i18n/en/status.json"; // categories
import { getFormattedDate, log } from "../../../utils/helpers"; // helpers
import "./ContractsFilters.scss";
export class ContractsFilters extends Component {
  state = {
    status: this.props.status,
    fromDate: this.props.fromDate,
    toDate: this.props.toDate,
    searchText: this.props.searchText,
    disabled: this.props.disabled
  };

  handleChange = (type, value) => {
    this.setState((state) => {
      const newState = { ...state, [type]: value };
      value = type === 'searchText' && value === '' ? null : value
      if (typeof this.props.onChange === "function") this.props.onChange(type, value);
      return newState;
    });
    log('ContractsFilters handlechange',{type:type,value:value})


  };

  handleReset = () => {
    if (typeof this.props.onReset === "function") this.props.onReset();
  };


  render() {
    console.log("form date: ", this.state.fromDate);
    return (
      <div
        className={`jur-contracts-filter ${
          this.state.disabled ? "jur-contracts-filter--disabled" : ""
        }`}
      >
        <Form.Select
          placeholder="Filter by Status..."
          value={this.state.status}
          onChange={(value) => this.handleChange("status", value)}
          options={statusList}
        />
        <CalendarFilter
          name="from"
          selectedDate={Date.parse(this.state.fromDate)}
          onChange={(value) => this.handleChange("fromDate", getFormattedDate(value))}
        />
        <span className="separator" />
        <CalendarFilter
          name="to"
          selectedDate={Date.parse(this.state.toDate)}
          onChange={(value) => this.handleChange("toDate", getFormattedDate(value))}
        />
        <Form.Search
          onChange={(value) => this.handleChange("searchText", value)}
        />
        {/* <Button
          color="info"
          className="jur-contracts-filter__submit-btn"
          variant="contained"
          onClick={this.props.onSubmit}
          size="medium"
          hoverColor="info"
        >
          <SearchIcon />
        </Button> */}
      </div>
    );
  }
}
