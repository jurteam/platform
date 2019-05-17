import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { capitalize } from "../../../utils/helpers";

import Amount from "../Amount";
import Avatar from "../Avatar";
import "./ProfilePreview.scss";

export const ProfilePreview = ( props ) => {
  const {
    to,
    name,
    seed,
    shouldRenderName,
    balance,
    currency
  } = props;
  return (
    <div className="jur-profile-preview">
      <NavLink to={to} activeClassName="active">
        <div className="jur-profile-preview__item jur-profile-preview__info">
          <Avatar seed={seed.toLowerCase()} size="medium" variant="circle" />
          <div className="jur-profile-preview__info__details">
            {shouldRenderName && !!name ? (
              <span className="jur-profile-preview__info__name">{name}</span>
            ) : null}
            <span className="jur-profile-preview__info__seed">{seed}</span>
          </div>
        </div>
        <div className="jur-profile-preview__item jur-profile-preview__balance">
          <span className="jur-profile-preview__balance__title">
            {capitalize(currency.toLowerCase())} Balance:
          </span>
          <Amount
            value={balance}
            className="jur-profile-preview__balance__value"
          />
        </div>
      </NavLink>
    </div>
  );
};

ProfilePreview.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string,
  seed: PropTypes.string.isRequired,
  shouldRenderName: PropTypes.bool,
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  currency: PropTypes.string
};

ProfilePreview.defaultProps = {
  currency: "JUR"
};
