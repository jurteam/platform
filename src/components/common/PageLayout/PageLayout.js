import React from "react";
import PropTypes from "prop-types";
import Page from "../Page";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import Content from "../Content";
import SubHeader from "../SubHeader";
import ResolvedDisputeNotification from "../ResolvedDisputeNotification";
import Logo from "../Logo";
import NavigationWrapper from "../NavigationWrapper";

export const PageLayout = ({ showBreadcrumbs, breadcrumbs, children }) => (
  <Page>
    <Header />
    {showBreadcrumbs && (
      <SubHeader>
        <Breadcrumbs crumbList={breadcrumbs} />
      </SubHeader>
    )}
    <Content>{children}</Content>
  </Page>
);

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
