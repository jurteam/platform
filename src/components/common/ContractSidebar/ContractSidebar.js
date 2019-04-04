import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContractActions from "../ContractActions";
import ContractSelectCategory from "../ContractSelectCategory";
import ContractSetDuration from "../ContractSetDuration";
import ContractSetValue from "../ContractSetValue";
import ContractSetCaseDispute from "../ContractSetCaseDispute";
import Button from "../Button";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./ContractSidebar.scss";

export const ContractSidebar = ({
  contract,
  currentUserCanPay,
  cases,
  selectedOptionId,
  onSubmit,
  onSend,
  onChangeDuration,
  onChangeSelect,
  onChangeValue
}) => {
  const { labels } = useContext(AppContext);

  const { category } = contract;

  return (
    <div>
      <ContractActions>
        <Button onClick={onSubmit}>{labels.saveContract}</Button>
        <Button variant="gradient" onClick={onSend}>{labels.sendToCounterparty}</Button>
      </ContractActions>
      <ContractSelectCategory onChange={onChangeSelect} category={category} />
      <ContractSetDuration contract={contract} onChange={value => onChangeValue("duration", value)} />
      <ContractSetValue contract={contract} onChange={onChangeValue} currentUserCanPay={currentUserCanPay} />
      <ContractSetCaseDispute
        cases={cases}
        selectedOptionId={selectedOptionId}
        handleChange={selectedOptionId => console.log(selectedOptionId)}
      />
    </div>
  );
};
