import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import Content from '../Content';

export const PageLayout = ({ showBreadcrumbs, breadcrumbs, children }) => (
  <Page>
    <Header />
    { showBreadcrumbs && <Breadcrumb crumbList={breadcrumbs} /> }
    <Content>
      { children }
    </Content>
  </Page>
);

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
