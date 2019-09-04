/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Form from "../Form";
import BlockTitle from "../BlockTitle";
import BlockInfo from "../BlockInfo";
import PriceRange from "../PriceRange";
import Button from "../Button";
import UploadForm from "../UploadForm";
import FileList from "../FileList";
import File from "../File";
import { toCurrencyFormat, ellipsisString, getContractTotalValue } from "../../../utils/helpers";

// form validation
import { useFormValidation } from "../../../utils/hooks";
import validationSchema from "./_validationSchema";

import "./ProposalForm.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

export const ProposalForm = ( props ) => {
  const {
    currentUserWallet,
    currentProposal,
    updateProposalField,
    extended,
    description,
    evidences,
    onCancel,
    onView,
    disabled,
    onProposalFileAdded,
    contract,
    contract: { from, to }
  } = props;

  const { wallet: fromWallet } = from;
  const { wallet: toWallet } = to;

  const contractValue = getContractTotalValue(contract);

  const initalProposal = {
    from:
      from.proposal ||
      from.wallet.toLowerCase() === currentUserWallet.toLowerCase()
        ? Number(contractValue)
        : 0,
    to:
      to.proposal || to.wallet.toLowerCase() === currentUserWallet.toLowerCase()
        ? Number(contractValue)
        : 0
  };

  // validation setup
  const [/*isValid, errors,*/ validateForm, setFormData] = useFormValidation(
    currentProposal,
    validationSchema
  );

  const changeInput = (name, value) => {
    setFormData({ ...currentProposal, [name]: value });
    updateProposalField(name, value); // dispatch action
  };

  // first form validation
  useEffect(() => {
    setFormData({ ...currentProposal });
    changeInput("proposal_part_a", initalProposal.from);
    changeInput("proposal_part_b", initalProposal.to);
    validateForm();
  }, []);

  const [proposalMessage, setProposalMessage] = useState(null);
  const [proposal, setProposal] = useState(initalProposal);
  const [files, setFiles] = useState([]);

  const { labels } = useContext(AppContext);

  const updateProposal = (counterparty, value) => {
    let newProposal = { ...proposal };
    const contractAmount = getContractTotalValue(props.contract);

    if (counterparty === "from") {
      newProposal = {
        ...proposal,
        from: value,
        to: contractAmount - value
      };
    } else {
      newProposal = {
        ...proposal,
        from: contractAmount - value,
        to: value
      };
    }

    changeInput("proposal_part_a", newProposal.from);
    changeInput("proposal_part_b", newProposal.to);
    setProposal(newProposal);
  };

  const onSubmit = () => props.onSubmit({ proposal, files, proposalMessage });

  const updateFiles = files => {
    setFiles(files);
    if (typeof onProposalFileAdded === "function") {onProposalFileAdded(files);}
  };

  const onReset = () => {
    setProposalMessage(null);
    setProposal(initalProposal);
    setFiles([]);
    setFormData({
      message: null,
      proposal_part_a: null,
      proposal_part_b: null,
      payed_at: null
    });

    if (typeof onCancel === "function") {onCancel();} // use callback
    if (typeof onProposalFileAdded === "function") {onProposalFileAdded([]);}
  };

  const { from: fromProposal, to: toProposal } = proposal;

  const blockInfoTitle = (fromProposal, toProposal) => {
    let myProposal = 0;
    let otherProposal = 0;
    let otherUser = "";

    if (currentUserWallet.toLowerCase() === fromWallet.toLowerCase()) {
      otherUser =
        to.renderName && to.name ? to.name : ellipsisString(to.wallet);
      myProposal = fromProposal;
      otherProposal = toProposal;
    } else {
      otherUser =
        from.renderName && from.name ? from.name : ellipsisString(from.wallet);
      myProposal = toProposal;
      otherProposal = fromProposal;
    }

    return labels.youGetBack
      .replace("%myProposal%", toCurrencyFormat(myProposal))
      .replace("%otherUser%", otherUser)
      .replace("%otherProposal%", toCurrencyFormat(otherProposal));
  };

  return (
    <div
      className={`jur-proposal-form ${
        disabled ? "jur-proposal-form__disabled" : null
      }`}
    >
      <div className="jur-proposal-form__description">{description}</div>
      <BlockTitle
        title={labels.message}
        description={labels.messageDescription}
      />
      <Form.TextArea
        placeholder={labels.insertHereYourMessage}
        defaultValue={proposalMessage}
        onChange={(value) => {
          setProposalMessage(value);
          changeInput("message", value);
        }}
      />
      <BlockTitle
        title={labels.proposal}
        description={labels.proposalDescription}
      />
      <div className="jur-proposal-form__range-wrapper">
        <PriceRange
          key={`proposalA-${parseInt(fromProposal)}`}
          min={0}
          max={Number(contractValue)}
          address={fromWallet.toLowerCase()}
          defaultValue={Number(fromProposal)}
          onChange={(value) => updateProposal("from", value)}
        />
        <PriceRange
          key={`proposalB-${parseInt(toProposal)}`}
          min={0}
          max={Number(contractValue)}
          address={toWallet.toLowerCase()}
          defaultValue={Number(toProposal)}
          onChange={(value) => updateProposal("to", value)}
        />
      </div>
      <BlockInfo description={blockInfoTitle(fromProposal, toProposal)} />
      {extended && evidences && evidences.length && (
        <div className="jur-proposal-form__evidences">
          <BlockTitle
            title={labels.evidences}
            description={labels.evidencesDescription}
          />
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
      {extended && <UploadForm onFileAdded={files => updateFiles({ files })} />}
      <div className="jur-proposal-form__actions">
        <Button color="info" onClick={onReset} hoverColor="info">
          {labels.cancel}
        </Button>
        <Button variant="gradient" onClick={onSubmit} hoverColor="success">
          {labels.send}
        </Button>
      </div>
    </div>
  );
};
