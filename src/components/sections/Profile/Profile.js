import React, { useContext } from "react";
import { withRouter } from "react-router";

import { ProfileContext } from "./";

import Breadcrumbs from "./../../../components/common/Breadcrumbs";
import Side from "./../../../components/common/Side";

import ProfileSettings from "./ProfileSettings";

const Profile = props => {
  const context = useContext(ProfileContext);
  const { navigation } = context;
  const {
    location: { pathname }
  } = props;

  const showContent = () => {
    const currentContent = navigation.profile.find(el => {
      return el.path === pathname;
    });

    // fallback to profile settings by default
    return currentContent.component || <ProfileSettings />;
  };

  return (
    <div className="jur--body jur--body-sided">
      <Breadcrumbs />
      <Side items={navigation.profile} />
      <div className="jur--inner">{showContent()}</div>
    </div>
  );
};

export default withRouter(Profile);