import React from "react";
import "./TakeOathAmountInput.scss";

import Form from "JurCommon/Form";
import Col from "JurCommon/Col";
import { OATH_KEEPER_UPDATE_AMOUNT } from "../../../../reducers/types";

const TakeOathAmountInput = ({ onChange }) => (
  <Col>
    <Form.Label className="jur-take-oath__label">Token Amount</Form.Label>
    <Form.NumericInput
      initialValue={0.0}
      onChange={onChange}
      step={1}
      className="jur-oath-amount-input"
      max={Number.MAX_SAFE_INTEGER}
    />
  </Col>
);

const onChange = e => ({
  type: OATH_KEEPER_UPDATE_AMOUNT,
  payload: e
});

const mapDispatchToProps = { onChange };

export default global.connection(TakeOathAmountInput, null, mapDispatchToProps);
