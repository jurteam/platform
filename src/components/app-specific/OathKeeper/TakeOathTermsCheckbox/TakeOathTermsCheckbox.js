import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AppContext } from "../../../../bootstrap/AppProvider";
import "./TakeOathTermsCheckbox.scss";
import Form from "JurCommon/Form";
import { OATH_KEEPER_UPDATE_TNC } from "../../../../reducers/types";

const TakeOathTermsCheckbox = ({ onChange, acceptTnC }) => {
  const { labels } = useContext(AppContext);
  return (
    <Form.Label className="jur-take-oath-tnc">
      <Form.Input
        type="checkbox"
        name="accepted_terms"
        value={1}
        required={true}
        checked={acceptTnC}
        onChange={onChange}
      />{" "}
      I {labels.accept.toLowerCase()}{" "}
      <NavLink to="/profile/terms">
        {labels.termAndConditions.toLowerCase()}
      </NavLink>{" "}
      of the Oath Keeping
    </Form.Label>
  );
};

const mapStateToProps = state => ({ acceptTnC: state.oathKeeper.acceptTnC });

const onChange = e => ({ type: OATH_KEEPER_UPDATE_TNC });
const mapDispatchToProps = { onChange };

export default global.connection(
  TakeOathTermsCheckbox,
  mapStateToProps,
  mapDispatchToProps
);
