import React from "react";

import Page from "../Page";
import Header from "../Header";
import Breadcrumbs from "../Breadcrumbs";
import Content from "../Content";
import SubHeader from "../SubHeader";

export const PageLayout = ( props ) => {
  const {
    showBreadcrumbs,
    breadcrumbs,
    children
  } = props;
  return (
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
};

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
