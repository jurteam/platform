import React, { Component } from "react";

import Profile from "./Profile";

// Inner pages
import ProfileForm from "../../common/ProfileForm";
import Privacy from "./Privacy";
import UserNotification from "../../common/UserNotification";
import Faq from "./Faq";
import Terms from "./Terms";

import i18n from "../../../assets/i18n/en.json"; // i18n

// Section Context
export const ProfileContext = React.createContext();

class ProfileProvider extends Component {
  state = {
    navigation: {
      profile: [
        {
          label: i18n.profileSettings,
          to: "/profile",
          component: <ProfileForm />
        },
        {
          label: i18n.privacy,
          to: "/profile/privacy",
          component: <Privacy />
        },
        {
          label: i18n.notification,
          to: "/profile/notifications",
          component: <UserNotification title="Notification" headers={[{label: 'Date',sortable: true},{label: 'Message'}]} data={[{id: 1,date: 'few seconds ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'},{id: 2,date: 'few minutes ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'},{id: 3,date: 'few hours ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'}]} />

        },
        { label: i18n.faq, to: "/profile/faq", component: <Faq /> },
        {
          label: i18n.termOfService,
          to: "/profile/terms",
          component: <Terms />
        }
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
