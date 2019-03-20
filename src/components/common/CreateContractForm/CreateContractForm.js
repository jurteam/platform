import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import Button from "../Button";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./CreateContractForm.scss";

export const CreateContractForm = ({
  onNext,
  user,
  contract,
  updateContractField,
  resetContract
}) => {
  const [formUpdated, setFormUpdated] = useState(false);

  // validation setup
  const [isValid, errors, validateForm, setFormData] = useFormValidation(
    contract.new,
    validationSchema
  );

  const { labels } = useContext(AppContext);

  const {
    updating,
    new: {
      part_a_wallet,
      part_a_public_name,
      part_a_email,
      part_b_wallet,
      part_b_public_name,
      part_b_email
    }
  } = contract;

  // first form validation
  useEffect(() => {
    resetContract();
    validateForm();
  }, []);

  const changeInput = (name, value) => {
    setFormUpdated(true);
    setFormData({ ...contract.new, [name]: value });
    updateContractField(name, value); // dispatch action
  };

  const onInputChange = ev => {
    const target = ev.target;
    if (target) {
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      changeInput(name, value);
    }
  };

  // disable update
  const submitDisabled =
    formUpdated === false || updating === true || !isValid();

  const onSubmit = ev => {
    ev.preventDefault();
    onNext();
  };

  console.log("Create Contract - errors", errors);

  // form error handling
  const hasError = field =>
    typeof errors[field] !== "undefined" &&
    errors[field].length > 0 &&
    formUpdated; // show error only when form is update at least one time

  return (
    <Form className="jur-form__create-contract-form">
      <Form.Wrapper>
        <div key="cc-part-a">
          <Form.Container className="jur-form__header">
            <Form.Group>
              <Form.Label htmlFor={"part_a_wallet"} required>
                {labels.wallet}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_a_wallet"}
                id={"part_a_wallet"}
                error={hasError("part_a_wallet")}
                value={part_a_wallet}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
          <Form.Container>
            <Form.Group>
              <Form.Label htmlFor={"part_a_public_name"} optional>
                {labels.fullName}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_a_public_name"}
                id={"part_a_public_name"}
                error={hasError("part_a_public_name")}
                value={part_a_public_name}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
          <Form.Container>
            <Form.Group>
              <Form.Label htmlFor={"part_a_email"} optional>
                {labels.email}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_a_email"}
                id={"part_a_email"}
                error={hasError("part_a_email")}
                value={part_a_email}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
        </div>
        <div key="cc-part-b">
          <Form.Container className="jur-form__header">
            <Form.Group>
              <Form.Label htmlFor={"part_b_wallet"} required>
                {labels.wallet}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_b_wallet"}
                id={"part_b_wallet"}
                error={hasError("part_b_wallet")}
                value={part_b_wallet}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
          <Form.Container>
            <Form.Group>
              <Form.Label htmlFor={"part_b_public_name"} optional>
                {labels.fullName}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_b_public_name"}
                id={"part_b_public_name"}
                error={hasError("part_b_public_name")}
                value={part_b_public_name}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
          <Form.Container>
            <Form.Group>
              <Form.Label htmlFor={"part_b_email"} optional>
                {labels.email}
              </Form.Label>
              <Form.Input
                type="text"
                name={"part_b_email"}
                id={"part_b_email"}
                error={hasError("part_b_email")}
                value={part_b_email}
                onChange={ev => onInputChange(ev)}
              />
            </Form.Group>
          </Form.Container>
        </div>
      </Form.Wrapper>
      <Form.Group className="jur-form__create-contract-form__footer">
        <Button
          size="big"
          variant="contained"
          onClick={onSubmit}
          disabled={submitDisabled}
        >
          {updating === false ? labels.next : labels.dotted}
        </Button>
      </Form.Group>
    </Form>
  );
};
