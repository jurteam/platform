import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import {CloseIcon} from '../Icons/CloseIcon';
import {AlertIcon} from '../Icons/AlertIcon';
import Countdown from '../Countdown';
import BlockTitle from '../BlockTitle';
import BlockInfo from '../BlockInfo';
import FileViewer from 'react-file-viewer';
import DisputeVote from '../DisputeVote';
import Avatar from '../Avatar';
import Form from '../Form';
import UploadForm from '../UploadForm';
import Button from '../Button';

import './Viewer.scss';

export class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCounterpartyIndex: 0,
      selectedCounterparty: props.counterparties ? props.counterparties[0] : null,
      jurTokens: 0,
      explanation: null,
      files: []
    }
  }

  getFileType = filePath => filePath.slice((filePath.lastIndexOf(".") - 1 >>> 0) + 2)

  setVoteForm = (counterparty, idx) => {
    this.setState({
      selectedCounterpartyIndex: idx,
      selectedCounterparty: counterparty
    });
  }

  onVoteSubmit = ev => {
    ev.preventDefault();

    this.props.onVoteSubmit({
      jurTokens: this.state.jurTokens,
      explanation: this.state.explanation,
      files: this.state.files,
      for: this.state.selectedCounterparty,
    });
  }
  
  render() {
    const {
      isOpen,
      onRequestClose,
      onAfterOpen,
      filePath,
      countdownOptions,
      counterparties,
      onFileLoadingError,
      statusId,
      onVote,
      onReject,
      currentUserWallet,
      metaMaskError
    } = this.props;

    const { selectedCounterpartyIndex } = this.state;
    let selectedCounterpartyAddress,
        selectedCounterpartyShouldRenderName,
        selectedCounterpartyName;
    
    if (counterparties && counterparties.length) {
      const { selectedCounterparty } = this.state;
      selectedCounterpartyAddress = selectedCounterparty.wallet.address;
      selectedCounterpartyShouldRenderName = selectedCounterparty.shouldRenderName;
      selectedCounterpartyName = selectedCounterparty.name;
    }

    return (
      <ReactModal
        isOpen={ isOpen }
        className="jur-viewer"
        ariaHideApp={ false }
        shouldCloseOnEsc={ true }
        onRequestClose={onRequestClose}
        onAfterOpen={onAfterOpen}
        overlayClassName='jur-modal__overlay'
      >
        <CloseIcon
          onClick={onRequestClose}
          className="jur-viewer__close-btn"
        />
        <div className="jur-viewer__wrapper">
          <div className="jur-viewer__container">
            {filePath &&
              <FileViewer
                filePath={filePath}
                fileType={this.getFileType(filePath)}
                onError={onFileLoadingError}
              />
            }
            {!filePath &&
              <div className={`jur-viewer__form ${selectedCounterpartyIndex === 0 ? 'jur-viewer__form--green' : 'jur-viewer__form--blue' }`}>
                <div className="jur-viewer__form__header">
                  <div className="jur-viewer__form__header__title">Vote for</div>
                  <div className="jur-viewer__form__header__user">
                    <Avatar
                      seed={selectedCounterpartyAddress}
                      size="xxxlarge"
                      variant="rounded"
                    />
                    <span>{selectedCounterpartyShouldRenderName ? selectedCounterpartyName : selectedCounterpartyAddress}</span>
                  </div>
                </div>
                <div className="jur-viewer__form__body">
                  <BlockTitle title="Jur Tokens" hideIcon/>
                  <Form.NumericInput
                    value={0}
                    onChange={value => this.setState({ jurTokens: value })}
                  />
                  <BlockInfo
                    title="Attention"
                    description="By voting, you are Jur tokens at risk . You will lose your Jur token if you vote on the minority side but you can earn around as many tokens as you voted if you vote for the majority early enough. This is not gambling. There is no higher reward for higher risks. In case the KPIs or the evidence are not clear or you are not confident about which proposal is the fairest, abstain from voting. You are using this interface on the blockchain under your own exclusive responsibility."
                  />
                  <BlockTitle title="Explain your vote" hideIcon/>
                  <Form.TextArea
                    placeholder="Insert you explanation"
                    onChange={value => this.setState({ explanation: value })}
                  />
                  <BlockTitle title="Attachment" hideIcon/>
                  <UploadForm
                    onFileAdded={files => this.setState({files: files})}
                  />
                  <Button
                    color={selectedCounterpartyIndex === 0 ? 'success' : 'info'}
                    className="ur-viewer__form__btn"
                    variant="contained"
                    fullWidth
                    onClick={this.onVoteSubmit}
                  >
                    Vote
                  </Button>
                </div>
                <div className="jur-viewer__form__note">
                  Do you feel the contract is illegal or inapplicable? 
                  <span onClick={onReject}>Vote for reject</span>
                </div> 
              </div>
            }
          </div>
          {!filePath &&
            <div className="jur-viewer__form-switch">
              {counterparties.map((counterparty, idx) => (
                <Avatar
                  onClick={() => this.setVoteForm(counterparty, idx)}
                  key={counterparty.wallet.address || idx.toString()}
                  seed={counterparty.wallet.address}
                  size="xlarge"
                  variant="rounded"
                  className={selectedCounterpartyIndex === idx ? 'active' : ''}
                />
              ))}
            </div>
          }
          {countdownOptions &&
            <div className="jur-viewer__countdown">
              <BlockTitle title="Duration" hideIcon />
              <Countdown {...countdownOptions} showSeconds />
            </div>
          }
          {counterparties && counterparties.length > 0 &&
            <div className="jur-viewer__voting-progress">
              <div className="jur-viewer__voting-progress__items">
                <DisputeVote
                  currentUserWallet={currentUserWallet}
                  statusId={statusId}
                  counterparties={counterparties}
                  onVote={onVote}
                  onReject={onReject}
                  canVote={statusId === 35 && !!filePath}
                />
              </div>
            </div>
          }
          {metaMaskError &&
            <div className="jur-viewer__metamask">
              <AlertIcon /> MetaMask Error
            </div>
          }
        </div>
      </ReactModal>
    )
  }
}
