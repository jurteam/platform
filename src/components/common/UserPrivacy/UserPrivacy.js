import React from 'react';
import PropTypes from 'prop-types';
import UserAction from '../UserAction';
import UserActionHeader from '../UserActionHeader';
import UserActionBody from '../UserActionBody';
import UserActionFooter from '../UserActionFooter';
import Button from '../Button';

import './UserPrivacy.scss';

export const UserPrivacy = ({ data, className }) => (
  <div className={`jur-user-privacy ${className || ''}`}>
    {data.map((item, i) => (
      <UserAction key={i.toString()}>
        <UserActionHeader>
          { item.title }
        </UserActionHeader>
        <UserActionBody>
          { item.description }
        </UserActionBody>
        <UserActionFooter>
          <Button size="big" variant={item.buttonVariant || "outlined"} onClick={ () => item.handler() }>
            { item.buttonLabel }
          </Button>
        </UserActionFooter>
      </UserAction>
    ))}
  </div>
);
