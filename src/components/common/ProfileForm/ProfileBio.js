import React, { useState } from "react";
import Form from "JurCommon/Form";
import "./ProfileForm.scss";

const MAX_CONTENT_LENGTH = 1000;

const ProfileBio = ({
  label,
  value,
  error,
  onChange,
  placeholder,
  flashBio
}) => {
  return (
    <Form.Container className="jur-form__profile__bio">
      <Form.Group>
        <Form.Label htmlFor="bio" optional>
          {label}
        </Form.Label>
        <Form.TextArea
          autofocus={flashBio}
          className={flashBio ? "jur-form__profile__bio__flash" : ""}
          name="bio"
          id="bio"
          data-error={error}
          placeholder={placeholder}
          value={value}
          onChange={text => onChange({ target: { name: "bio", value: text } })}
        />
        {value && error ? (
          <span className="error-info jur-form__error-msg">
            {value.length} out of {MAX_CONTENT_LENGTH} characters.{" "}
            <strong>Please shorten the bio.</strong>
          </span>
        ) : null}
      </Form.Group>
    </Form.Container>
  );
};

export default ProfileBio;
