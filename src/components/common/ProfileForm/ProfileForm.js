import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "../Avatar";
import Button from "../Button";
import Switch from "../Switch";
import { InfoIcon } from "../Icons/InfoIcon";
import Form from '../Form';
import InfoTootip from '../InfoTooltip'

import "./ProfileForm.scss";

// TODO: eval startup call for this informations in the future
// TODO: use { translations } param due process.env.REACT_APP_LANGUAGE change
import locations from "../../../assets/locations.json"; // locations
import genders from "../../../assets/genders.json"; // genders
import categories from "../../../assets/categories.json"; // categories
import { FormContainer } from "../Form/FormContainer";
console.log("locations", locations);

export class ProfileForm extends Component {
  state = {
    fullName: "Alice",
    gender: "",
    email: "alice@domain.com",
    location: null,
    birthday: "",
    category: "",
    showFullName: false,
    terms: true
  };

  onInputChange = ev => {
    const target = ev.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  onSelectChange = (name, selectedOption) => {
    this.setState({ [name]: selectedOption });
  }

  onDateChange = date => this.setState({ birthday: date })

  onSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit();
  };

  render() {
    const { className, wallet } = this.props;
    let locationsOptions = locations.map(loc => ({ value: loc.alpha2Code, label: loc.name }));

    return (
      <Form
        className={`jur-form__profile ${className || ''}`}
        onSubmit={this.onSubmit}
      >
        <Form.Container className="jur-form__header">
          <Avatar size="xxlarge" variant="rounded" seed={wallet.address} />
          <Form.Group>
            <Form.Label htmlFor="walletAddress" required>Wallet</Form.Label>
            <Form.Input
              type="text"
              name="walletAddress"
              id="walletAddress"
              defaultValue={wallet.address}
              disabled
              readOnly
            />
          </Form.Group>
        </Form.Container>
        <Form.Container>
          <Form.Group>
            <Form.Label htmlFor="fullname" optional>Full Name</Form.Label>
            <Form.Input
              type="text"
              name="fullname"
              id="fullname"
              value={this.state.fullName}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="gender" optional>Gender</Form.Label>
            <Form.Select
              name="gender"
              id="gender"
              options={genders}
              onChange={this.onSelectChange.bind(this, 'gender')}
            />
          </Form.Group>
        </Form.Container>
        <Form.Container>
          <Form.Group>
            <Form.Label htmlFor="email" optional>Email</Form.Label>
            <Form.Input
              type="text"
              name="email"
              id="email"
              value={this.state.email}
              onChange={this.onInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="location" optional>Location</Form.Label>
            <Form.Select
              name="localtion"
              id="location"
              value={this.state.location}
              options={locationsOptions}
              onChange={this.onSelectChange.bind(this, 'location')}
            />
          </Form.Group>
        </Form.Container>
        <Form.Container>
          <Form.Group>
            <Form.Label htmlFor="birthday" optional>Date of Birth</Form.Label>
            <Form.DatePicker selectedDate={this.state.birthday} onChange={this.onDateChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="category" optional>Category</Form.Label>
            <Form.Select
              name="category"
              id="category"
              value={this.state.category}
              options={categories}
              onChange={this.onSelectChange.bind(this, 'category')}
            />
          </Form.Group>
        </Form.Container>
        <FormContainer className="jur-form__footer">
          <Form.Group>
            <div className="jur-form__profile__options">
              <div className="jur-form__profile__options__show-name">
                <Form.Label>
                  <InfoTootip /> Show Full Name instead of Wallet address
                </Form.Label>
                <div className="jur-form__profile__options__show-name__input">
                  <Switch
                    name="showFullName"
                    value={this.state.showFullName}
                    onChange={this.onInputChange}
                    checked={this.state.showFullName}
                  />
                </div>
              </div>
              <div className="jur-form__profile__options__terms">
                <input
                  type="checkbox"
                  name="terms"
                  value={this.state.terms}
                  onChange={this.onInputChange}
                />
                <label>
                  Accept <a href="#">Terms and Condition</a>
                </label>
              </div>
            </div>
            <div className="jur-form__profile__submit">
                <Button type="submit" variant="contained" size="big">
                  Update
                </Button>
              </div>
          </Form.Group>
        </FormContainer>
      </Form>
    );
  }
}
