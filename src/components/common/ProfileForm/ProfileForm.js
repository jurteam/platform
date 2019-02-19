import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '../Avatar';
import Button from '../Button';
import Switch from '../Switch';
import { InfoIcon } from '../Icons/InfoIcon';

import './ProfileForm.scss';

export class ProfileForm extends Component {
  state = {
    wallet: '0x70aec4b9cffa7b55c0711b82dd719049d615e21d',
    fullName: 'Alice',
    gender: '',
    email: 'alice@domain.com',
    location: '',
    birthday: '',
    category: '',
    showFullName: false,
    terms: true
  }

  onInputChange = (ev) => {
    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit();
  }

  render() {

    const {
      className
    } = this.props;

    return (
      <form className={`jur-profile-form ${className || ''}`} onSubmit={ this.onSubmit }>
        <div className="jur-profile-form__header">
          <Avatar size="xxlarge" variant="rounded" seed={ this.state.wallet } />
          <div className="form-group">
            <label htmlFor="wallet">Wallet <sup>*</sup></label>
            <input
              type="text"
              className="form-control"
              name="wallet"
              id="wallet"
              defaultValue={ this.state.wallet }
              disabled
            />
          </div>
        </div>
        <div className="jur-profile-form__body">
          <div className="jur-profile-form__row">
            <div className="form-group">
              <label htmlFor="fullname">Full Name <span>(Optional)</span></label>
              <input
                type="text"
                className="form-control"
                name="fullname"
                id="fullname"
                value={ this.state.fullName }
                onChange={ this.onInputChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender <span>(Optional)</span></label>
              <select name="gender" id="gender" value={ this.state.gender } onChange={ this.onInputChange }>
                <option>Select...</option>
              </select>
            </div>
          </div>
          <div className="jur-profile-form__row">
            <div className="form-group">
              <label htmlFor="email">Email <span>(Optional)</span></label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                value={ this.state.email }
                onChange={ this.onInputChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location <span>(Optional)</span></label>
              <select name="location" id="location" value={ this.state.location } onChange={ this.handleChange }>
                <option>Select...</option>
              </select>
            </div>
          </div>
          <div className="jur-profile-form__row">
            <div className="form-group">
              <label htmlFor="birthday">Date of Birth <span>(Optional)</span></label>
              <input
                type="text"
                className="form-control"
                name="birthday"
                id="birthday"
                value={ this.state.birthday }
                onChange={ this.onInputChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category <span>(Optional)</span></label>
              <select name="category" id="category" value={ this.state.category } onChange={ this.handleChange }>
                <option>Select...</option>
              </select>
            </div>
          </div>
        </div>
        <div className="jur-profile-form__footer">
          <div className="jur-profile-form__row">
            <div className="jur-profile-form__options">
              <div className="jur-profile-form__options__show-name">
                <label>
                  <InfoIcon />
                  Show Full Name instead of Wallet address
                </label>
                <div className="jur-profile-form__options__show-name__input">
                  <Switch
                    name="showFullName"
                    value={ this.state.showFullName }
                    onChange={ this.onInputChange }
                    checked={ this.state.showFullName }
                  />
                  <span>
                    {this.state.showFullName ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
              <div className="jur-profile-form__options__terms">
                <input type="checkbox" name="terms" value={ this.state.terms } onChange={ this.onInputChange }/>
                <label>Accept <a href="#">Terms and Condition</a></label>
              </div>
            </div>
            <div className="jur-profile-form__submit">
              <Button type="submit" variant="contained" size="big">Update</Button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}