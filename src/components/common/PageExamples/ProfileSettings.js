import React, { Component } from "react";
import PropTypes from "prop-types";
import PageLayout from "../PageLayout";
import Main from "../Main";
import Aside from "../Aside";
import ProfileMenu from "../ProfileMenu";
import ProfileForm from "../ProfileForm";

export class ProfileSettings extends Component {
  render() {
    return (
      <PageLayout showBreadcrumbs={false}>
        <Aside>
          <ProfileMenu
            menuList={[
              {
                id: 0,
                label: "Profile Settings",
                to: "/profile"
              },
              {
                id: 1,
                label: "Privacy",
                to: "/privacy"
              },
              {
                id: 2,
                label: `FAQ's`,
                to: "/faq"
              },
              {
                id: 3,
                label: `Term of Service`,
                to: "/terms"
              }
            ]}
          />
        </Aside>
        <Main>
          <ProfileForm
            wallet={{ address: "0xkfr48774n7y4t84b" }}
            onSubmit={() => alert("Submit form fired")}
          />
        </Main>
      </PageLayout>
    );
  }
}
