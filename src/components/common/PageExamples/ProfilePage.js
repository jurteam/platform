import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../PageLayout';
import Main from '../Main';
import Aside from '../Aside';

export class ProfilePage extends Component {
  render() {
    return(
      <PageLayout showBreadcrumbs={ false }>
        <Aside>
          ASIDE CONTENT WILL BE HERE
        </Aside>
        <Main>
          MAIN CONTENT WILL BE HERE
        </Main>
      </PageLayout>
    );
  }
}
