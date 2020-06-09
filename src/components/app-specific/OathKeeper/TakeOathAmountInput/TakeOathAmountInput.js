import React from "react";
import "./TakeOathAmountInput.scss";

import Form from "JurCommon/Form";
import Col from "JurCommon/Col";
import { OATH_KEEPER_UPDATE_AMOUNT } from "../../../../reducers/types";
import { MIN_TOKEN_AMOUNT } from "../../../../api/connex/OathKeeper";
import { getWalletBalance, getNewOath } from "../../../../sagas/Selectors";

const TakeOathAmountInput = ({ onChange, balance, value }) => (
  <Col>
    <Form.Label className="jur-take-oath__label">Token Amount</Form.Label>
    <Form.NumericInput
      initialValue={0.0}
      onChange={onChange}
      step={1}
      className="jur-oath-amount-input"
      max={Number.MAX_SAFE_INTEGER}
      min={MIN_TOKEN_AMOUNT}
      errorMsg={
        Number(balance) < Number(value) && "You do not have enough JUR balance"
      }
    />
  </Col>
);

const onChange = e => ({
  type: OATH_KEEPER_UPDATE_AMOUNT,
  payload: e
});

const mapStateToProps = state => ({
  balance: getWalletBalance(state),
  value: getNewOath(state).amount
});

const mapDispatchToProps = { onChange };

export default global.connection(
  TakeOathAmountInput,
  mapStateToProps,
  mapDispatchToProps
);
