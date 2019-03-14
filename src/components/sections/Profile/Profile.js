import React, { useContext } from "react";
import { withRouter } from "react-router";

// Contexts
import { AppContext } from "../../../bootstrap/AppProvider";
import { ProfileContext } from "./";

// Components
import PageLayout from "../../common/PageLayout";
import Main from "../../common/Main";
import Aside from "../../common/Aside";
import ProfileMenu from "../../common/ProfileMenu";
import ProfileForm from "../../common/ProfileForm";

const Profile = props => {
  const { navigation } = useContext(ProfileContext);
  const { labels } = useContext(AppContext);
  const {
    location: { pathname }
  } = props;

  const profileRootSection = "/profile";

  let breadcrumbs = [
    {
      label: labels.profileSettings,
      to: profileRootSection
    }
  ];

  const showContent = () => {
    const currentContent = navigation.profile.find(el => {
      const findCheck = el.to === pathname;
      if (findCheck && el.to !== profileRootSection) {
        breadcrumbs[1] = el;
      }
      return findCheck;
    });

    // fallback to profile settings by default
    return currentContent.component || <ProfileForm />;
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <Aside>
        <ProfileMenu menuList={navigation.profile} />
      </Aside>
      <Main>{showContent()}</Main>
    </PageLayout>
  );
};

export default withRouter(Profile);
