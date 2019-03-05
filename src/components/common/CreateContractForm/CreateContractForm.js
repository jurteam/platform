import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import Button from '../Button';

import './CreateContractForm.scss';

export class CreateContractForm extends Component {
  state = {
    counterparties: this.props.counterparties
  }

  onInputChange = (ev, index) => {
    const target = ev.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (name === 'walletAddress') {
      this.setState(state => {
        let counterparties = state.counterparties;
        counterparties[index]['wallet']['address'] = value;
        return {counterparties};
      });
    } else {
      this.setState(state => {
        let counterparties = state.counterparties;
        counterparties[index][name] = value;
        return {counterparties};
      });
    }

  };

  onNext = ev => {
    ev.preventDefault();
    this.props.onNext();
  }
  
  render() {
    return (
      <Form className="jur-form__create-contract-form">
        <Form.Wrapper>
          {this.props.counterparties.map((counterparty, index) => (
            <div key={index.toString()}>
              <Form.Container className="jur-form__header">
                <Form.Group>
                  <Form.Label htmlFor="walletAddress" required>Wallet</Form.Label>
                  <Form.Input
                    type="text"
                    name="walletAddress"
                    id="walletAddress"
                    value={counterparty.wallet.address}
                    onChange={ev => this.onInputChange(ev, index)}
                  />
                </Form.Group>
              </Form.Container>
              <Form.Container>
                <Form.Group>
                  <Form.Label htmlFor="fullname" optional>Full Name</Form.Label>
                  <Form.Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={counterparty.fullName}
                    onChange={ev => this.onInputChange(ev, index)}
                  />
                </Form.Group>
              </Form.Container>
              <Form.Container>
                <Form.Group>
                  <Form.Label htmlFor="fullname" optional>Email</Form.Label>
                  <Form.Input
                    type="text"
                    name="email"
                    id="email"
                    value={counterparty.fullName}
                    onChange={ev => this.onInputChange(ev, index)}
                  />
                </Form.Group>
              </Form.Container>
            </div>
          ))}
        </Form.Wrapper>
        <Form.Group className="jur-form__create-contract-form__footer">
          <Button variant="contained" onClick={this.onNext}>Next</Button>
        </Form.Group>
      </Form>
    );
  }
}
