import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

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
import genders from "../../../assets/i18n/en/genders.json"; // genders
import categories from "../../../assets/i18n/en/userCategories.json"; // TODO: i18n
import { FormContainer } from "../Form/FormContainer";

export const ProfileForm = ( props ) => {
  const { className, user, updateUserField, updateUser } = props;
  const [formUpdated, setFormUpdated] = useState(false);

  // validation setup
  const [isValid, errors, validateForm, setFormData] = useFormValidation(
    user,
    validationSchema
  );

  // first form validation
  useEffect(() => {
    validateForm();
  }, []);

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

  const [setOtherCategoryIsVisible, setOtherCategoryInputVisibility] = useState(
    category === 5
  );

  const changeInput = (name, value) => {
    setFormUpdated(true);
    setFormData({ ...user, [name]: value });
    updateUserField(name, value); // dispatch action
  };

  const onInputChange = (ev) => {
    const { target } = ev;
    if (target) {
      // only if there is a target
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;
      if (name === "category") {
        changeInput(name, {
          value: 5,
          label: value
        });
      } else {
        changeInput(name, value);
      }
    }
  };

  const onChangeSelect = (name, input) => {
    if (name === "category" && input.value === 5) {
      changeInput("category", null);
      setOtherCategoryInputVisibility(true);
    } else {
      const value =
        typeof input !== "undefined" &&
        input !== null &&
        typeof input.value !== "undefined"
          ? input.value
          : null;

      changeInput(name, value);
    }
  };

  // disable update
  const submitDisabled =
    formUpdated === false || updating === true || !isValid();

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!submitDisabled) {
      updateUser();
      setFormUpdated(false); // reset form
    }
  };

  let locationsOptions = locations.map((loc) => ({
    value: loc.alpha2Code,
    label: loc.name
  }));

  // form error handling
  const hasError = (field) =>
    typeof errors[field] !== "undefined" && errors[field].length > 0;

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
            error={hasError("name")}
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
            error={hasError("gender")}
            value={genders.filter((option) => option.value === gender)}
            options={genders}
            onChange={(input) => onChangeSelect("gender", input)}
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
            error={hasError("email")}
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
            error={hasError("location")}
            value={locationsOptions.filter((option) => option.value === location)}
            options={locationsOptions}
            onChange={(input) => onChangeSelect("location", input)}
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
            error={hasError("birth_date")}
            placeholder={labels.dateOfBirthPlaceholder}
            selectedDate={birth_date ? new Date(birth_date) : null}
            onChange={date => changeInput("birth_date", date)}
            maxDate={new Date()}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category" optional>
            {labels.category}
          </Form.Label>
          {setOtherCategoryIsVisible ? (
            <>
              <Form.Input
                type="text"
                name="category"
                id="category"
                placeholder={labels.otherCategoryPlaceholder}
                value={(category && category.label) || ""}
                error={hasError("category")}
                onChange={onInputChange}
              />
              <span
                className="back-to-list"
                onClick={() => setOtherCategoryInputVisibility(false)}
              >
                {labels.backToList}
              </span>
            </>
          ) : (
            <Form.Select
              name="category"
              id="category"
              error={hasError("category")}
              value={categories.filter((option) => option.value === category)}
              options={categories}
              onChange={(input) => onChangeSelect("category", input)}
            />
          )}
        </Form.Group>
      </Form.Container>
      <FormContainer className="jur-form__footer">
        <Form.Group>
          <div className="jur-form__profile__options">
            <div className="jur-form__profile__options__show-name">
              <Form.Label>
                <InfoTootip
                  position="top"
                  text={labels.showFullNameTooltipText}
                />{" "}
                {labels.showFullName}
              </Form.Label>
              <div className="jur-form__profile__options__show-name__input">
                <Switch
                  name="show_fullname"
                  error={hasError("show_fullname")}
                  onChange={onInputChange}
                  value={show_fullname || false}
                  checked={show_fullname}
                />
              </div>
            </div>
            <div className="jur-form__profile__options__terms">
              <Form.Label>
                <Form.Input
                  type="checkbox"
                  name="accepted_terms"
                  error={hasError("accepted_terms")}
                  value={1}
                  required={true}
                  checked={accepted_terms}
                  onChange={onInputChange}
                />
                {labels.accept}{" "}
                <NavLink to="/profile/terms">
                  {labels.termAndConditions}
                </NavLink>
              </Form.Label>
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
      {formUpdated && hasError("accepted_terms") && (
        <Form.ErrorMsg msg={labels.termAndConditionsError} />
      )}
    </Form>
  );
};
