import React, { Component } from "react";

import PageLayout from "../PageLayout";
import Main from "../Main";
import Aside from "../Aside";
import ProfileMenu from "../ProfileMenu";
import UserNotification from "../UserNotification";

const notificationTableHeaders = [
  {
    label: "Date",
    sortable: (e, desc) => alert("Desc is:" + desc)
  },
  {
    label: "Message"
  }
];

const notificationTableData = [
  {
    id: 1,
    date: "2019-01-08T14:25:44.335Z",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam"
  },
  {
    id: 2,
    date: "2019-01-08T14:25:44.335Z",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam"
  },
  {
    id: 3,
    date: "2019-01-08T14:25:44.335Z",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed lacinia odio. Ut suscipit, eros ac mattis fermentum, turpis ex blandit nisi, vitae ultrices urna orci et velit. Curabitur dapibus odio in dui pellentesque orci aliquam"
  }
];

export class ProfileNotification extends Component {
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
          <UserNotification
            title="Notification"
            headers={notificationTableHeaders}
            data={notificationTableData}
          />
        </Main>
      </PageLayout>
    );
  }
}
