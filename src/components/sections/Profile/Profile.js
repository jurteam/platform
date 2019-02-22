import React, { useContext } from "react";
import { withRouter } from "react-router";

// Contexts
import { AppContext } from "../../../bootstrap/AppProvider";
import { ProfileContext } from "./";

// Components
import PageLayout from "../../common/PageLayout";
import Main from "../../common/Main";
import Aside from "../../common/Aside";
import Side from "../../common/Side";
import ProfileForm from "../../common/ProfileForm";

const Profile = props => {
  const { navigation } = useContext(ProfileContext);
  const { labels } = useContext(AppContext);
  const {
    location: { pathname }
  } = props;

  let breadcrumbs = [
    {
      label: labels.profileSettings,
      active: true,
      to: "/profile"
    }
  ];

  const showContent = () => {
    const currentContent = navigation.profile.find(el => {
      return el.path === pathname;
    });

    // fallback to profile settings by default
    return currentContent.component || <ProfileForm />;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Aside>
        <Side items={navigation.profile} />
      </Aside>
      <Main>{showContent()}</Main>
    </PageLayout>
  );
};

export default withRouter(Profile);
