import React, { Component } from "react";

import Profile from "./Profile";

// Inner pages
import ProfileForm from "../../common/ProfileForm";
import UserPrivacy from "../../common/UserPrivacy";
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
          path: "/profile",
          component: <ProfileForm />
        },
        {
          label: i18n.privacy,
          path: "/profile/privacy",
          component: (
            <UserPrivacy
              data={[
                {
                  title: "Disclaimer",
                  description:
                    "Jur is an interface on the blockchain. Jur can als…",
                  buttonLabel: "Decline"
                },
                {
                  title: "Data Management",
                  description:
                    "Remove all your offchain data related to your cont…",
                  buttonLabel: "Delete all your contracts"
                },
                {
                  title: "",
                  description:
                    "Remove all your offchain data related to your disp…",
                  buttonLabel: "Delete all your disputes"
                }
              ]}
            />
          )
        },
        {
          label: i18n.notification,
          path: "/profile/notifications",
          component: <UserNotification title="Notification" headers={[{label: 'Date',sortable: true},{label: 'Message'}]} data={[{id: 1,date: 'few seconds ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'},{id: 2,date: 'few minutes ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'},{id: 3,date: 'few hours ago',message: 'Lorem ipsum dolor sit amet, consectetur adipiscing…'}]} />

        },
        { label: i18n.faq, path: "/profile/faq", component: <Faq /> },
        {
          label: i18n.termOfService,
          path: "/profile/terms",
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
