import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import BlockTitle from '../BlockTitle';
import BlockInfo from '../BlockInfo';
import PriceRange from '../PriceRange';
import Button from '../Button';
import UploadForm from '../UploadForm';
import FileList from '../FileList';
import File from '../File';
import {toCurrencyFormat, ellipsisString} from '../../../utils/helpers';

import './ProposalForm.scss';


export class ProposalForm extends Component {
  state = {
    proposalMessage: null,
    proposal: {
      to: this.props.contract.to.proposal || 0,
      from: this.props.contract.from.proposal || 0
    },
    files: []
  }

  updateProposal = (counterparty, value) => {
    this.setState(state => ({
      proposal: {
        ...state.proposal,
        [counterparty]: value
      }
    }));
  }

  onSubmit = () => this.props.onSubmit(this.state);

  onReset = () => this.setState({
    proposalMessage: null,
    proposal: {
      to: this.props.contract.to.proposal || 0,
      from: this.props.contract.from.proposal || 0
    },
    files: []
  });

  render() {
    const {
      currrentUserWallet,
      extended,
      description,
      evidences,
      onView,
      contract: {
        value: contractValue,
        from: {
          wallet: fromWallet,
          from: fromName
        },
        to: {
          wallet: toWallet,
          name: toName
        }
      },
    } = this.props;

    const { from: fromProposal, to: toProposal } = this.state.proposal;
    
    const blockInfoTitle = (fromProposal, toProposal) => {
      let myProposal = 0;
      let otherProposal = 0;
      let otherUser = '';
      
      if (currrentUserWallet === fromWallet) {
        otherUser = toName ? toName : ellipsisString(toWallet);
        myProposal = fromProposal;
        otherProposal = toProposal;
      } else {
        otherUser = fromName ? fromName : ellipsisString(toWallet);
        myProposal = toProposal;
        otherProposal = fromProposal;
      }

      return `You get back ${toCurrencyFormat(myProposal)}JUR, ${otherUser} gets ${toCurrencyFormat(otherProposal)}JUR`;
    }

    return (
      <div className="jur-proposal-form">
        <div className="jur-proposal-form__description">{description}</div>
        <BlockTitle title="Message" />
        <Form.TextArea
          placeholder="Insert here you message"
          onChange={value => this.setState({ proposalMessage: value })}
        />
        <BlockTitle title="Proposal" />
        <div className="jur-proposal-form__range-wrapper">
          <PriceRange
            min={0}
            max={contractValue}
            address={fromWallet}
            defaultValue={fromProposal}
            onChange={value => this.updateProposal('from', value)}
          />
          <PriceRange
            min={0}
            max={contractValue}
            address={toWallet}
            defaultValue={toProposal}
            onChange={value => this.updateProposal('to', value)}
          />
        </div>
        <BlockInfo description={blockInfoTitle(fromProposal, toProposal)} />
        {extended && evidences && evidences.length &&
          <div className="jur-proposal-form__evidences">
            <BlockTitle title="Evidences" />
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
        }
        {extended &&
          <UploadForm
            onFileAdded={files => this.setState({ files })}
          />
        }
        <div className="jur-proposal-form__actions">
          <Button color="muted" onClick={this.onReset}>Cancel</Button>
          <Button variant="gradient" onClick={this.onSubmit}>Send</Button>
        </div>
      </div>
    );
  }
}
