import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContractName from "../ContractName";
import ContractAmount from "../ContractAmount";
import ContractPenaltyFee from "../ContractPenaltyFee";
import CountdownGraph from "../CountdownGraph";
import ContractCounterparties from "../ContractCounterparties";
import ContractCategory from "../ContractCategory";
import ContractCaseDispute from "../ContractCaseDispute";
import BlockTitle from "../BlockTitle";

import "./ContractSummary.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ContractSummary = props => {
  const {
    contractName,
    from,
    to,
    amount: contractAmount,
    category,
    inCaseOfDispute,
    status: {
      id: statusId,
      label: statusIdLabel,
      updatedDate: countdownStartDate
    },
    duration: {
      days: durationInDays,
      hours: durationInHours,
      minutes: durationInMinutes,
      expireAlertFrom
    },
    penaltyFee,
    onContractNameChange,
    onProgress,
    onExpire
  } = props.data;

  const { debtor, partA, partB } = [from, to].reduce((acc, counterparty) => {
    if (counterparty.debtor) {
      acc.debtor = counterparty;
    }

    if (counterparty.label === "partA") {
      acc.partA = counterparty;
    }

    if (counterparty.label === "partB") {
      acc.partB = counterparty;
    }
    return acc;
  }, {});

  const { dispute } = props;

  const { labels } = useContext(AppContext);

  return (
    <div className="jur-contract-summary">
      <ContractName
        contractName={contractName}
        onContractNameChange={onContractNameChange}
        statusId={statusId}
        statusIdLabel={statusIdLabel}
        dispute={dispute}
      />
      <div className="jur-contract-summary__columns">
        <div className="jur-contract-summary__column jur-contract-summary__counterparties">
          <ContractCounterparties counterparties={[from, to]} />
        </div>
        <div className="jur-contract-summary__column">
          <ContractAmount
            debtorWalletAddress={debtor.wallet || null}
            amount={contractAmount || ""}
          />
          <ContractPenaltyFee
            contractInfo={{
              partA: partA.wallet.toLowerCase(),
              partB: partB.wallet.toLowerCase(),
              penaltyFee
            }}
          />
        </div>
        <div className="jur-contract-summary__column">
          <ContractCategory selectedCategories={category} />
          <ContractCaseDispute selectedCase={inCaseOfDispute} />
        </div>
        <div className="jur-contract-summary__column">
          <BlockTitle title={labels.duration} hideIcon />
          <CountdownGraph
            days={durationInDays}
            hours={durationInHours}
            minutes={durationInMinutes}
            startDate={countdownStartDate}
            statusId={statusId}
            expireAlertFrom={expireAlertFrom}
            onProgress={onProgress}
            onExpire={onExpire}
            key={`status-${statusId}`}
            showSeconds={dispute}
            showMessage
          />
        </div>
      </div>
    </div>
  );
};
