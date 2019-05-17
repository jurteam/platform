import React, { Component } from "react";

import PageLayout from "../PageLayout";
import Main from "../Main";
import Aside from "../Aside";
import InsertContractDetails from "../InsertContractDetails";
import ContractSidebar from "../ContractSidebar";
import ContractSummary from "../ContractSummary";
import Disclaimer from "../Disclaimer";
import ContractActions from "../ContractActions";
import Button from "../Button";
import ContractSelectCategory from "../ContractSelectCategory";
import ContractSetDuration from "../ContractSetDuration";
import ContractSetValue from "../ContractSetValue";
import ContractSetCaseDispute from "../ContractSetCaseDispute";

const contract = {
  contractID: 34765,
  from: {
    label: "partA",
    debtor: true,
    wallet: {
      address: "0xh845684f893689fh56347563fh3486539463",
      amount: 86486
    },
    name: "Alice",
    shouldRenderName: true
  },
  to: {
    label: "partB",
    debtor: false,
    wallet: {
      address: "0x38683746f893457h6fh563487fh569834596",
      amount: 126486
    },
    name: "Bob",
    shouldRenderName: false
  },
  penaltyFee: null
};
const cases = [
  {
    label: "Open",
    description:
      "On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.",
    id: 1
  },
  {
    label: "Hubs",
    description:
      "On the open layer any token holder can vote. According to our game theory, disputes over contracts with clear Key Performance Indicators and good evidence will result in fair outcomes. There is no incentive for anyone to vote on the wrong side, since there is no extra reward for choosing the unlikely proposition. The system is not corruptible because no one can realistically have 51% of Jur tokens.",
    id: 2
  }
];

export class ContractDraft extends Component {
  render() {
    return (
      <PageLayout showBreadcrumbs={false}>
        <Main>
          <ContractSummary
            data={{
              contractID: 34765,
              from: {
                label: "partA",
                debtor: true,
                wallet: {
                  address: "0xh845684f893689fh56347563fh3486539463"
                },
                name: "Alice",
                shouldRenderName: true
              },
              to: {
                label: "partB",
                debtor: false,
                wallet: {
                  address: "0x38683746f893457h6fh563487fh569834596"
                },
                name: "Bob",
                shouldRenderName: false
              },
              penaltyFee: {
                partA: "",
                partB: ""
              },
              contractName: "",
              amount: "",
              category: null,
              status: { id: 0, label: "Draft", updatedDate: null },
              inCaseOfDispute: null,
              duration: {
                days: 0,
                hours: 0,
                minutes: 0,
                expireAlertFrom: ""
              },
              onContractNameChange: ev => console.log(ev.target.value),
              onProgress: percentage => console.log(percentage),
              onExpire: () => alert("Countdown finished")
            }}
          />
          <InsertContractDetails
            kpiPlaceholder="Please insert in a clear way some objective elements that can demonstrate the contract has been executed properly."
            resolutionPlaceholder={
              "Please provide evidence (including external links if appropriate) for assessing if the key performance indicators and contract terms have been met"
            }
            onKpiChange={e => console.log("yo")}
            onResolutionProofChange={e => console.log("yo")}
            onFileAdded={addedFiles => console.log(addedFiles)}
            uploadedFiles={[{ name: "Hello worldl.pdf" }]}
            onView={e => console.log("yo")}
            onDelete={e => console.log("yo")}
          />
        </Main>
        <Aside>
          <ContractActions>
            <Button>Save Contract</Button>
            <Button variant="gradient">Send to counterparty</Button>
          </ContractActions>
          <ContractSelectCategory onChange={ev => console.log(ev)} />
          <ContractSetDuration onChange={value => console.log(value)} />
          <ContractSetValue contract={contract} />
          <ContractSetCaseDispute
            cases={cases}
            handleChange={selectedOptionId => console.log(selectedOptionId)}
          />
        </Aside>
        <Disclaimer
          isOpen={false}
          title="Disclaimer"
          description="Jur is an interface on the blockchain. Jur can also be used without our Interface. You use this interface provided by Jur AG at your own risk. You will evaluate your decisions with your legal and fiscal advisors. Privacy Policy: Jur AG doesn't store any your personal data, except your email if requested. After 7 days from the conclusion of any contract, the contract will be erased and not stored by Jur AG. Note that if you want to keep recrods, you will need to archive your contracts locally."
          accepted={false}
          declineLabel="Decline"
          acceptLabel="Accept"
          closeLabel="Close"
          onAccept={() => alert("accepted")}
          onClose={() => alert("close")}
          onDecline={() => alert("decline")}
        />
      </PageLayout>
    );
  }
}
