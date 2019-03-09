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
      to: 0,
      from: 0
    }
  }

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
          proposal: fromProposal,
          wallet: fromWallet,
          from: fromName
        },
        to: {
          proposal: toProposal,
          wallet: toWallet,
          name: toName
        }
      },
    } = this.props;
    
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
        <Form.TextArea placeholder="Insert here you message"/>
        <BlockTitle title="Proposal" />
        <div className="jur-proposal-form__range-wrapper">
          <PriceRange
            min={0}
            max={contractValue}
            address={fromWallet}
            defaultValue={fromProposal}
            onChange={value => console.log('from proposal value', value)}
          />
          <PriceRange
            min={0}
            max={contractValue}
            address={toWallet}
            defaultValue={toProposal}
            onChange={value => console.log('to proposal value', value)}
          />
        </div>
        <BlockInfo description={blockInfoTitle(fromProposal, toProposal)} />
        {extended && evidences && evidences.length &&
          <div className="jur-proposal-form__evidences">
            <BlockTitle title="Evidences" />
            <FileList>
              {evidences.map((file, idx) => (
                <File
                  key={File.name || idx.toString()}
                  name={file.name}
                  onView={onView}
                />
              ))}
            </FileList>
          </div>
        }
        {extended &&
          <UploadForm
            onFileAdded={() => console.log('added')}
          />
        }
        <div className="jur-proposal-form__actions">
          <Button color="muted" onClick={this.reset}>Cancel</Button>
          <Button variant="gradient" onClick={this.submit}>Send</Button>
        </div>
      </div>
    );
  }
}
