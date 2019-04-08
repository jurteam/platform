import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import BlockTitle from "../BlockTitle";
import { AvatarInfo } from "../AvatarInfo/AvatarInfo";
import Form from "../Form";
import AlertIcon from "../Icons/AlertIcon";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

import "./WhoPays.scss";

export const WhoPays = (props) => {

  const { labels } = useContext(AppContext)

  const [openIndex, setOpenIndex] = useState(props.contract.from.debtor ? 0 : 1);
  const [counterparties, setCounterparties] = useState([props.contract.from, props.contract.to]);
  const [payer, setPayer] = useState({
    counterParty: props.contract.from.debtor ? props.contract.from : props.contract.to,
    value: Number(props.contract.amount)
  });

  const handleContractValue = (counterPartyIndex, value) => {
    let payerUpdated = { ...payer };
    payerUpdated = {
      counterParty: counterparties[counterPartyIndex],
      value: Number(value)
    };
    setPayer(payerUpdated);
    props.handleSelectPayer(payerUpdated);
  };

  const changePayer = index => {
    if (!props.disabled) {
      setOpenIndex(index);
      handleContractValue(index, 0);
    }
  };

  return (
    <div className="jur-who-pays">
      <BlockTitle title={labels.whoPays} />
      <div className={`jur-who-pays__counterparties ${props.disabled ? "jur-who-pays__disabled": ""}`}>
        {counterparties.map((counterparty, index) => (
          <div
            className={`jur-who-pays__counterparty ${
              openIndex === index
                ? "jur-who-pays__counterparty--open"
                : ""
            }`}
            key={index.toString()}
          >
            <AvatarInfo
              size="small"
              userName={counterparty.name}
              userWallet={counterparty.wallet}
              shouldRenderName={counterparty.renderName}
              variant="ellipsis"
              type="circle"
              onClick={() => changePayer(index)}
            />
            {openIndex === index && (
              <>
                <Form.NumericInput
                  label={labels.tokenLabel}
                  initialValue={payer.value}
                  onChange={handleContractValue.bind(this, index)}
                  step={1}
                  disabled={props.disabled}
                />
                {props.error && (
                  <span>{labels.notEnoughTokenBalance}</span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
