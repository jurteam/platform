import React, { useContext } from "react";
import { withRouter } from "react-router";

// Contexts
import { AppContext } from "../../../bootstrap/AppProvider";
import { ProfileContext } from "./";

// Components
import PageLayout from "../../../components/common/PageLayout";
import Main from "../../../components/common/Main";
import Aside from "../../../components/common/Aside";
import Side from "../../../components/common/Side";
import ProfileForm from "../../common/ProfileForm";

const Profile = props => {
  const context = useContext(ProfileContext);
  const { labels } = useContext(AppContext);
  const { navigation } = context;
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
