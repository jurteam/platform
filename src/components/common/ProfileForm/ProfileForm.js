import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import Avatar from "../Avatar";
import Button from "../Button";
import Switch from "../Switch";
import Form from "../Form";
import InfoTootip from "../InfoTooltip";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ProfileForm.scss";

// TODO: eval startup call for this informations in the future
// TODO: use { translations } param due process.env.REACT_APP_LANGUAGE change
import locations from "../../../assets/locations.json"; // locations
import genders from "../../../assets/genders.json"; // genders
import categories from "../../../assets/categories.json"; // categories
import { FormContainer } from "../Form/FormContainer";
console.log("locations", locations);

export const ProfileForm = ({
  className,
  user,
  updateUserField,
  updateUser
}) => {
  // state = {
  //   fullName: "Alice",
  //   gender: "",
  //   email: "alice@domain.com",
  //   location: null,
  //   birthday: "",
  //   category: "",
  //   showFullName: false,
  //   terms: true
  // };

  const { labels } = useContext(AppContext);
  const {
    wallet,
    name,
    gender,
    email,
    updating,
    birth_date,
    location,
    category,
    show_fullname,
    accepted_terms
  } = user;

  // disable update
  const submitDisabled =
    accepted_terms === false || accepted_terms === 0 || updating === true;

  const onInputChange = ev => {
    const { target } = ev;
    console.log("target", target);
    if (target) {
      // only if there is a target
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      updateUserField(name, value); // dispatch action
    }
  };

  const onDateChange = date => this.setState({ birthday: date });

  const onSubmit = ev => {
    ev.preventDefault();
    if (submitDisabled === false) {
      updateUser();
    }
  };

  let locationsOptions = locations.map(loc => ({
    value: loc.alpha2Code,
    label: loc.name
  }));

  return (
    <Form
      className={`jur-form__profile ${className || ""}`}
      onSubmit={onSubmit}
    >
      <Form.Container className="jur-form__header">
        <Avatar size="xxlarge" variant="rounded" seed={wallet} />
        <Form.Group>
          <Form.Label htmlFor="walletAddress" required>
            {labels.wallet}
          </Form.Label>
          <Form.Input
            type="text"
            name="walletAddress"
            id="walletAddress"
            defaultValue={wallet}
            disabled
            readOnly
          />
        </Form.Group>
      </Form.Container>
      <Form.Container>
        <Form.Group>
          <Form.Label htmlFor="name" optional>
            {labels.fullName}
          </Form.Label>
          <Form.Input
            type="text"
            name="name"
            id="name"
            placeholder={labels.fullNamePlaceholder}
            value={name}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="gender" optional>
            {labels.gender}
          </Form.Label>
          <Form.Select
            name="gender"
            id="gender"
            value={genders.filter(option => option.value === gender)}
            options={genders}
            onChange={input => updateUserField("gender", input.value)}
          />
        </Form.Group>
      </Form.Container>
      <Form.Container>
        <Form.Group>
          <Form.Label htmlFor="email" optional>
            {labels.email}
          </Form.Label>
          <Form.Input
            type="text"
            name="email"
            id="email"
            placeholder={labels.emailPlaceholder}
            value={email}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="location" optional>
            {labels.location}
          </Form.Label>
          <Form.Select
            name="localtion"
            id="location"
            value={locationsOptions.filter(option => option.value === location)}
            options={locationsOptions}
            onChange={input => updateUserField("location", input.value)}
          />
        </Form.Group>
      </Form.Container>
      <Form.Container>
        <Form.Group>
          <Form.Label htmlFor="birth_date" optional>
            {labels.dateOfBirth}
          </Form.Label>
          <Form.DatePicker
            name="birth_date"
            id="birth_date"
            placeholder={labels.dateOfBirthPlaceholder}
            selectedDate={birth_date}
            onChange={date => updateUserField("birth_date", date)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category" optional>
            {labels.category}
          </Form.Label>
          <Form.Select
            name="category"
            id="category"
            value={categories.filter(option => option.value === category)}
            options={categories}
            onChange={input => updateUserField("category", input.value)}
          />
        </Form.Group>
      </Form.Container>
      <FormContainer className="jur-form__footer">
        <Form.Group>
          <div className="jur-form__profile__options">
            <div className="jur-form__profile__options__show-name">
              <Form.Label>
                <InfoTootip text={labels.showFullNameTooltipText} />{" "}
                {labels.showFullName}
              </Form.Label>
              <div className="jur-form__profile__options__show-name__input">
                <Switch
                  name="show_fullname"
                  value={show_fullname}
                  onChange={onInputChange}
                  checked={show_fullname}
                />
              </div>
            </div>
            <div className="jur-form__profile__options__terms">
              <input
                type="checkbox"
                name="accepted_terms"
                value={1}
                checked={accepted_terms}
                onChange={onInputChange}
              />
              <label>
                {labels.accept}{" "}
                <NavLink to="/profile/terms">
                  {labels.termAndConditions}
                </NavLink>
              </label>
            </div>
          </div>
          <div className="jur-form__profile__submit">
            <Button
              type="submit"
              variant="contained"
              size="big"
              disabled={submitDisabled}
            >
              {updating === false ? labels.update : labels.dotted}
            </Button>
          </div>
        </Form.Group>
      </FormContainer>
    </Form>
  );
};
