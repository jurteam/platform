import React from 'react';
import CalendarFilter from "../CalendarFilter";
import Form from '../Form';
export const ContractsFilter = ({onChange}) => (
  <div className="jur-contracts-filter">
    <Form.FormSelect />
    <CalendarFilter name="from" />
    <CalendarFilter name="to" />
    <Form.Search />
  </div>
);
