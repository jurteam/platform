import React, { Component } from "react";
import CalendarFilter from "../CalendarFilter";
import Form from "../Form";
import Button from "../Button";
import { SearchIcon } from "../Icons/SearchIcon";
import statusList from "../../../assets/status.json"; // categories
import "./ContractsFilters.scss";
export class ContractsFilters extends Component {
  state = {
    status: this.props.status,
    fromDate: this.props.fromDate,
    toDate: this.props.toDate,
    searchText: this.props.searchText
  };

  handleChange = (type, value) => {
    console.log({ type, value });
    this.setState(state => {
      const newState = { ...state, [type]: value };
      this.props.onChange(newState);
      return newState;
    });
  };

  render() {
    return (
      <div className="jur-contracts-filter">
        <Form.Select
          placeholder="Filter by Status..."
          value={this.state.status}
          onChange={value => this.handleChange("status", value)}
          options={statusList}
        />
        <CalendarFilter
          name="from"
          selectedDate={this.state.fromDate}
          onChange={value => this.handleChange("fromDate", value)}
        />
        <span class="separator" />
        <CalendarFilter
          name="to"
          selectedDate={this.state.toDate}
          onChange={value => this.handleChange("toDate", value)}
        />
        <Form.Search
          onChange={value => this.handleChange("searchText", value)}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={this.props.onSubmit}
        >
          <SearchIcon />
        </Button>
      </div>
    );
  }
}
