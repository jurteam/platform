import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../PageLayout';
import Main from '../Main';
import Aside from '../Aside';

class ProfilePage extends Component {
  render() {
    return(
      <PageLayout showBreadcrumbs={ true }>
        <Main>
          {/* Main Content here */}
        </Main>
        <Aside>
          {/* Aside Content here */}
        </Aside>
      </PageLayout>
    );
  }
}
