import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import BlockTitle from "../BlockTitle";
import BlockInfo from "../BlockInfo";
import PriceRange from "../PriceRange";
import Button from "../Button";
import UploadForm from "../UploadForm";
import FileList from "../FileList";
import File from "../File";
import { toCurrencyFormat, ellipsisString } from "../../../utils/helpers";

import "./ProposalForm.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ProposalForm = props => {

  const {
    currentUserWallet,
    extended,
    description,
    evidences,
    onCancel,
    onView,
    contract,
    contract: {
      amount: contractValue,
      from,
      to
    }
  } = props;

  const { wallet: fromWallet, name: fromName } = from;
  const { wallet: toWallet, name: toName } = to;

  const initalProposal = {
    from: contract.from.proposal || (contract.from.wallet.toLowerCase() === currentUserWallet.toLowerCase()) ? contract.amount : 0,
    to: contract.to.proposal || (contract.to.wallet.toLowerCase() === currentUserWallet.toLowerCase()) ? contract.amount : 0,
  };

  const [proposalMessage, setProposalMessage] = useState(null);
  const [proposal, setProposal] = useState(initalProposal);
  const [files, setFiles] = useState([]);

  const { labels } = useContext(AppContext);

  const updateProposal = (counterparty, value) => {
    let newProposal = { ...proposal };
    const contractAmount = Number(props.contract.amount);

    if (counterparty === "from") {
      newProposal = {
        ...proposal,
        from : value,
        to : contractAmount - value
      }
    } else {
      newProposal = {
        ...proposal,
        from : contractAmount - value,
        to : value
      }
    };

    console.log("ProposalForm", newProposal);

    setProposal(newProposal);
  };

  const onSubmit = () => props.onSubmit({ proposal, files });

  const onReset = () => {
    setProposalMessage(null);
    setProposal(initalProposal);
    setFiles([]);

    if (typeof onCancel === "function") onCancel(); // use callback
  };

  const { from: fromProposal, to: toProposal } = proposal;

  const blockInfoTitle = (fromProposal, toProposal) => {
    let myProposal = 0;
    let otherProposal = 0;
    let otherUser = "";

    if (currentUserWallet.toLowerCase() === fromWallet.toLowerCase()) {
      otherUser = to.renderName && to.name ? to.name : ellipsisString(to.wallet);
      myProposal = fromProposal;
      otherProposal = toProposal;
    } else {
      otherUser = from.renderName && from.name ? from.name : ellipsisString(from.wallet);
      myProposal = toProposal;
      otherProposal = fromProposal;
    }

    return labels.youGetBack.replace("%myProposal%", toCurrencyFormat(myProposal)).replace("%otherUser%", otherUser).replace("%otherProposal%", toCurrencyFormat(otherProposal));
  };

  return (
    <div className="jur-proposal-form">
      <div className="jur-proposal-form__description">{description}</div>
      <BlockTitle title={labels.message} description={labels.messageDescription} />
      <Form.TextArea
        placeholder={labels.insertHereYourMessage}
        defaultValue={proposalMessage}
        onChange={value => setProposalMessage(value)}
      />
      <BlockTitle title={labels.proposal} description={labels.proposalDescription} />
      <div className="jur-proposal-form__range-wrapper">
        <PriceRange
          key={`proposalA-${parseInt(fromProposal)}`}
          min={0}
          max={Number(contractValue)}
          address={fromWallet.toLowerCase()}
          defaultValue={Number(fromProposal)}
          onChange={value => updateProposal("from", value)}
        />
        <PriceRange
          key={`proposalB-${parseInt(toProposal)}`}
          min={0}
          max={Number(contractValue)}
          address={toWallet.toLowerCase()}
          defaultValue={Number(toProposal)}
          onChange={value => updateProposal("to", value)}
        />
      </div>
      <BlockInfo description={blockInfoTitle(fromProposal, toProposal)} />
      {extended && evidences && evidences.length && (
        <div className="jur-proposal-form__evidences">
          <BlockTitle title={labels.evidences} description={labels.evidencesDescription} />
          <FileList>
            {evidences.map((file, idx) => (
              <File
                key={file.name || idx.toString()}
                name={file.name}
                onView={onView}
              />
            ))}
          </FileList>
        </div>
      )}
      {extended && <UploadForm onFileAdded={files => setFiles({ files })} />}
      <div className="jur-proposal-form__actions">
        <Button color="muted" onClick={onReset}>
          {labels.cancel}
        </Button>
        <Button variant="gradient" onClick={onSubmit}>
          {labels.send}
        </Button>
      </div>
    </div>
  );
};
