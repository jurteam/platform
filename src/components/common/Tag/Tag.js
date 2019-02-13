import React from 'react';
import './Tag.scss';

export const Tag = ({statusId, children}) => {
  const statusObj = ['waiting', 'draft', 'ongoing', 'open-dispute', 'closed-dispute'];
  return (
    <div className={'jur-tag jur-tag--' + statusObj[statusId]}>
      <span>{children}</span>
    </div>
  );
};