import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContractActions from '../ContractActions';
import ContractSelectCategory from '../ContractSelectCategory';
import ContractSetDuration from '../ContractSetDuration';
import ContractSetValue from '../ContractSetValue';
import ContractSetCaseDispute from '../ContractSetCaseDispute';
import Button from '../Button';

import './ContractSidebar.scss';

export class ContractSidebar extends Component {
  render() {
    return (
      <div>
        <ContractActions>
          <Button>Save Contract</Button>
          <Button variant="gradient">Send to counterparty</Button>
        </ContractActions>
        <ContractSelectCategory onChange={ev => console.log(ev)} />
        <ContractSetDuration onChange={value => console.log(value)} />
        <ContractSetValue contract={this.props.contract} />
        <ContractSetCaseDispute
          cases={this.props.cases}
          handleChange={selectedOptionId => console.log(selectedOptionId)}
        />
      </div>
    );
  }
};
