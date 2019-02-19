import React, { Component } from "react";

import Profile from "./Profile";

// Inner pages
import ProfileSettings from "./ProfileSettings";
import Privacy from "./Privacy";
import Faq from "./Faq";
import Notification from "./Notification";
import Terms from "./Terms";

import i18n from "../../../assets/i18n/en.json"; // i18n

// Section Context
export const ProfileContext = React.createContext();

class ProfileProvider extends Component {
  state = {
    navigation: {
      profile: [
        { label: i18n.profileSettings, path: "/profile", component: <ProfileSettings /> },
        { label: i18n.privacy, path: "/profile/privacy", component: <Privacy /> },
        { label: i18n.notification, path: "/profile/notifications", component: <Notification /> },
        { label: i18n.faq, path: "/profile/faq", component: <Faq/> },
        { label: i18n.termOfService, path: "/profile/terms", component: <Terms /> }
      ]
    }
  };

  render() {
    return (
      <ProfileContext.Provider value={this.state}>
        <Profile />
      </ProfileContext.Provider>
    );
  }
}

export default ProfileProvider;
