import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import Content from '../Content';

export const PageLayout = ({ showBreadcrumbs, children }) => (
  <Page>
    <Header />
    { showBreadcrumbs && <Breadcrumb /> }
    <Content>
      { children }
    </Content>
  </Page>
);

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
