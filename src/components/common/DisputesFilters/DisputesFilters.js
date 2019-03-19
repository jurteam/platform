import React, { Component } from "react";
import CalendarFilter from "../CalendarFilter";
import Form from "../Form";
import Button from "../Button";
import { SearchIcon } from "../Icons/SearchIcon";
import statusList from "../../../assets/i18n/en/status.json"; // status
import categories from "../../../assets/i18n/en/contractCategories.json"; // categories
import "./DisputesFilters.scss";
export class DisputesFilters extends Component {
  state = {
    status: this.props.status,
    category: this.props.category,
    fromDate: this.props.fromDate,
    toDate: this.props.toDate,
    searchText: this.props.searchText,
    disabled: this.props.disabled
  };

  handleChange = (type, value) => {
    this.setState(state => {
      const newState = { ...state, [type]: value };
      this.props.onChange(newState);
      return newState;
    });
  };

  render() {
    return (
      <div
        className={`jur-disputes-filter ${
          this.state.disabled ? "jur-disputes-filter--disabled" : ""
        }`}
      >
        <Button variant="contained" onClick={this.props.getAllDisputes}>
          All
        </Button>
        <Button onClick={this.props.getMyDisputes}>My Disputes</Button>
        <Form.Select
          placeholder="Filter by Status..."
          value={this.state.status}
          onChange={value => this.handleChange("status", value)}
          options={statusList}
        />
        <Form.Select
          placeholder="Filter by Category..."
          value={this.state.category}
          onChange={value => this.handleChange("category", value)}
          options={categories}
        />
        <CalendarFilter
          name="from"
          selectedDate={this.state.fromDate}
          onChange={value => this.handleChange("fromDate", value)}
        />
        <span className="separator" />
        <CalendarFilter
          name="to"
          selectedDate={this.state.toDate}
          onChange={value => this.handleChange("toDate", value)}
        />
        <Form.Search
          onChange={value => this.handleChange("searchText", value)}
        />
        <Button variant="contained" onClick={this.props.onSubmit} size="medium">
          <SearchIcon />
        </Button>
      </div>
    );
  }
}
