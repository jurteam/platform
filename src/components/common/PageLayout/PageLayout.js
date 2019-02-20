import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Header from '../Header';
import Breadcrumbs from '../Breadcrumbs';
import Content from '../Content';

export const PageLayout = ({ showBreadcrumbs, children }) => (
  <Page>
    <Header />
    { showBreadcrumbs && <Breadcrumbs /> }
    <Content>
      { children }
    </Content>
  </Page>
);

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
