import React from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import Header from '../Header';
import Breadcrumbs from '../Breadcrumbs';
import Content from '../Content';
import SubHeader from '../SubHeader';
import ResolvedDisputeNotification from '../ResolvedDisputeNotification';
import Logo from '../Logo';
import NavigationWrapper from '../NavigationWrapper';

export const PageLayout = ({ showBreadcrumbs, children }) => (
  <Page>
    <Header>
        <Logo />
        {true ?
          <NavigationWrapper
            to="/profile"
            name="Alice"
            seed="0x3954939439487573664374"
            shouldRenderName balance="7546857"
            currency="Jur"
          />
          : null
        }
    </Header>
    <SubHeader>
      <Breadcrumbs crumbList={
        [
          {
            id: 0,
            label: 'Contracts',
            to: '/contracts'
          },
          {
            id: 1,
            label: 'Create smart contract',
            to: '/create'
          }
        ]}
      />
    </SubHeader>
    { showBreadcrumbs && <Breadcrumbs /> }
    <Content>
      { children }
    </Content>
  </Page>
);

PageLayout.defaultProps = {
  showBreadcrumbs: true
};
