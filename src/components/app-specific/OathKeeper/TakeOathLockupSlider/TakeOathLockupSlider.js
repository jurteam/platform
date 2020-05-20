import React from "react";
import "./TakeOathLockupSlider.scss";

import Col from "JurCommon/Col";
import Form from "JurCommon/Form";
import InputRange from "JurCommon/InputRange";
import { OATH_KEEPER_UPDATE_LOCK_IN_PERIOD } from "../../../../reducers/types";

const min = 1;
const max = 36;

const TakeOathLockupSlider = ({ onChange, value }) => (
  <Col>
    <Form.Label className="jur-take-oath__label">Lock Up Duration</Form.Label>
    <InputRange
      min={min}
      max={max}
      defaultValue={value <= max ? value : max}
      onValueChange={onChange}
      valueLabel={`${value || 1} months`}
    />
  </Col>
);

const onChange = e => ({ type: OATH_KEEPER_UPDATE_LOCK_IN_PERIOD, payload: e });

const mapStateToProps = state => ({ value: state.oathKeeper.lockInPeriod });
const mapDispatchToProps = { onChange };

export default global.connection(
  TakeOathLockupSlider,
  mapStateToProps,
  mapDispatchToProps
);
