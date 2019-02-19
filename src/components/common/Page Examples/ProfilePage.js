import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../PageLayout';
import Main from '../Main';
import Aside from '../Aside';

class ProfilePage extends Component {
  render() {
    return(
      <PageLayout showBreadcrumbs={ false }>
        <Aside>
          {/* Aside Content here */}
        </Aside>
        <Main>
          {/* Main Content here */}
        </Main>
      </PageLayout>
    );
  }
}
