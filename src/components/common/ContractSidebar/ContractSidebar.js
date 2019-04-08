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
  disabled,
  error,
  errorMsg,
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
        <Button color={disabled ? "muted" : null} onClick={!disabled && onSubmit}>{labels.saveContract}</Button>
        <Button color={disabled ? "muted" : null} variant={disabled ? "contained" : "gradient"} onClick={!disabled && onSend}>{labels.sendToCounterparty}</Button>
      </ContractActions>
      <ContractSelectCategory onChange={onChangeSelect} category={category} isDisabled={disabled} />
      <ContractSetDuration contract={contract} onChange={value => onChangeValue("duration", value)} disabled={disabled} />
      <ContractSetValue contract={contract} onChange={onChangeValue} currentUserCanPay={currentUserCanPay} disabled={disabled} />
      <ContractSetCaseDispute
        cases={cases}
        disabled={disabled}
        selectedOptionId={selectedOptionId}
        handleChange={selectedOptionId => console.log(selectedOptionId)}
      />
    </div>
  );
};
