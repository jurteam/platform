import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../PageLayout';
import Main from '../Main';
import Aside from '../Aside';

export class DisputesPage extends Component {
  render() {
    return(
      <PageLayout showBreadcrumbs={ true }>
        <Main>
          MAIN CONTENT WILL BE HERE
        </Main>
        <Aside>
          ASIDE CONTENT WILL BE HERE
        </Aside>
      </PageLayout>
    );
  }
}
