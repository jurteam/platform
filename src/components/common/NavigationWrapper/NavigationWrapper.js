import React from "react";
import PropTypes from "prop-types";
import MainNav from "../MainNav";
import ProfilePreview from "../ProfilePreview";

export const NavigationWrapper = props => (
  <>
    <MainNav />
    <ProfilePreview {...props} />
  </>
);
