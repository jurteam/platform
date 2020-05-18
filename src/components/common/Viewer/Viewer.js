import React, { useState, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import { CloseIcon } from "../Icons/CloseIcon";
import { AlertIcon } from "../Icons/AlertIcon";
import Countdown from "../Countdown";
import BlockTitle from "../BlockTitle";
import BlockInfo from "../BlockInfo";
import FileViewer from "react-file-viewer";
import DisputeVote from "../DisputeVote";
import Avatar from "../Avatar";
import Form from "../Form";
import UploadForm from "../UploadForm";
import Button from "../Button";
import Spinner from "../Spinner";

import "./Viewer.scss";
import { AppContext } from "../../../bootstrap/AppProvider"; // context

import {
  canVote, log
} from "../../../utils/helpers";

export const Viewer = (props) => {

  const [state, setState] = useState({
      selectedCounterpartyIndex: 0,
      selectedCounterparty: props.counterparties
        ? props.counterparties[0]
        : null,
      jurTokens: 0,
      explanation: null,
      files: []
    });

    const { labels } = useContext(AppContext);


    const {
      isOpen,
      onRequestClose,
      onAfterOpen,
      filePath,
      countdownOptions,
      counterparties,
      onFileLoadingError,
      submitDisabled,
      statusId,
      changeInput,
      currentVote,
      hasError,
      onVote,
      voteReject,
      current,
      contract,
      shouldHide,
      // onInputChange,
      onFileAdded,
      onReject,
      currentWallet,
      metaMaskError,
      fullWidthViewer
    } = props;

  // cDM
  // useEffect(() => {

  //   const { current, counterparties, changeInput } = props;

  //   if (typeof current !== "undefined" || typeof current.idx !== "undefined") {

  //     const { idx } = current;

  //     log("Viewer - cDM", {
  //       props: props,
  //       selectedCounterpartyIndex: idx,
  //       selectedCounterparty: counterparties[idx]
  //     });


  //     changeInput("wallet_part", counterparties[idx].wallet.toLowerCase());
  //     changeInput("contract_id", contract.contractID);
  //     changeInput("oracle_wallet", currentWallet);
  //   }

  //   return () => null;

  // }, [contract]);
  // cDM
  // useEffect(() => {

  //   log("Viewer - current changed",props);

  //   const { current : { idx } } = props;

  //   setState({
  //     selectedCounterpartyIndex: idx,
  //     selectedCounterparty: counterparties[idx]
  //   });

  //   return () => null; // do nothing on unmount

  // }, [props.current]);
  useEffect(() => {

    if (typeof current !== "undefined") {
    setState({
      selectedCounterpartyIndex: current.idx,
      selectedCounterparty: current.counterparty
    });
    }

  }, [current]);

  // cDM
  useEffect(() => {

    log("Viewer - mount");

    return () => log("Viewer - umount"); // do something on unmount

  }, [state.selectedCounterpartyIndex]);

  const getFileType = filePath =>
    filePath.slice(((filePath.lastIndexOf(".") - 1) >>> 0) + 2);

  const setVoteForm = (counterparty, idx) => {
    setState({
      selectedCounterpartyIndex: idx,
      selectedCounterparty: counterparty
    });
    changeInput("wallet_part", counterparty.wallet.toLowerCase());
  };

  const onVoteSubmit = () => {
    log("onVoteSubmit", props.onVoteSubmit);
    props.onVoteSubmit();
  };


    const { selectedCounterpartyIndex } = state;
    let selectedCounterpartyAddress,
      selectedCounterpartyShouldRenderName,
      selectedCounterpartyName;

    if (counterparties && counterparties.length) {
      const { selectedCounterparty } = state;
      if (selectedCounterparty) {
        selectedCounterpartyAddress =
          selectedCounterparty && selectedCounterparty.wallet
            ? selectedCounterparty.wallet.toLowerCase()
            : "0x0";
        selectedCounterpartyShouldRenderName = selectedCounterparty.renderName;
        selectedCounterpartyName = selectedCounterparty.name;
      }
    }

    log("Viewer", current);

    return (
      <ReactModal
        isOpen={isOpen}
        className={shouldHide ? "jur-viewer jur-viewer__hidden" : "jur-viewer"}
        ariaHideApp={false}
        shouldCloseOnEsc={true}
        onRequestClose={onRequestClose}
        onAfterOpen={onAfterOpen}
        overlayClassName="jur-modal__overlay"
      >
        <CloseIcon onClick={onRequestClose} className="jur-viewer__close-btn" />
        <div
          className={`jur-viewer__wrapper ${
            fullWidthViewer ? "jur-viewer__wrapper--full" : ""
          }`}
        >
          <div className="jur-viewer__container">
            {filePath && (
              <FileViewer
                filePath={filePath}
                fileType={getFileType(filePath)}
                onError={onFileLoadingError}
                loadingComponent={<Spinner />}
              />
            )}
            {!filePath && (
              <div
                className={`jur-viewer__form ${
                  selectedCounterpartyIndex === 0
                    ? "jur-viewer__form--green"
                    : "jur-viewer__form--blue"
                }`}
              >
                <div className={selectedCounterpartyIndex !== -1 ? "jur-viewer__form__header" : "jur-viewer__form__header rejected"}>
                  <div className="jur-viewer__form__header__title">
                    {selectedCounterpartyIndex !== -1 ? labels.voteFor : labels.voteForReject}
                  </div>
                  {selectedCounterpartyIndex !== -1 && (
                  <div className="jur-viewer__form__header__user">
                    <Avatar
                      seed={selectedCounterpartyAddress}
                      size="xxxlarge"
                      variant="rounded"
                      />
                    <span>
                      {selectedCounterpartyShouldRenderName && selectedCounterpartyName !== ''
                        ? selectedCounterpartyName
                        : selectedCounterpartyAddress}
                    </span>
                  </div>)
                      }
                </div>
                <div className="jur-viewer__form__body">
                  <BlockTitle title={labels.tokensLabel} hideIcon />
                  <Form.NumericInput
                    initialValue={Number.parseFloat(currentVote.amount).toFixed(2)}
                    step={0.01}
                    error={props.error || props.hasError("amount")}
                    errorMsg={props.error && labels.notEnoughTokenBalance}
                    onChange={(value) => changeInput("amount", value)}
                  />
                  <BlockInfo
                    title={labels.voteAttention}
                    description={labels.voteAttentionDescription}
                  />
                  <BlockTitle title={labels.explainYourVote} hideIcon />
                  <Form.TextArea
                    placeholder={labels.insertYourExplanation}
                    name="message"
                    error={hasError("message") || "false"}
                    initialValue={currentVote.message}
                    onChange={(value) => changeInput("message", value)}
                  />
                  <BlockTitle title={labels.attachments} hideIcon />
                  <UploadForm
                    onFileAdded={onFileAdded}
                  />
                  <Button
                    color={submitDisabled ? 'muted' : selectedCounterpartyIndex === 0 ? "success" : "info"}
                    className="ur-viewer__form__btn"
                    variant="contained"
                    fullWidth
                    onClick={() => onVoteSubmit()}
                  >
                    {labels.vote}
                  </Button>
                </div>
                <div className="jur-viewer__form__note">
                  {labels.voteForRejectText}
                  <span className={submitDisabled ? 'disabled' : null} onClick={onReject}>{labels.voteForReject}</span>
                </div>
              </div>
            )}
          </div>
          {!filePath && (
            <div className="jur-viewer__form-switch">
              {counterparties.map((counterparty, idx) => (
                <Avatar
                  onClick={() => setVoteForm(counterparty, idx)}
                  key={counterparty.wallet.toLowerCase() || idx.toString()}
                  seed={counterparty.wallet.toLowerCase()}
                  size="xlarge"
                  variant="rounded"
                  className={selectedCounterpartyIndex === idx ? "active" : ""}
                />
              ))}
            </div>
          )}
          {countdownOptions && (
            <div className="jur-viewer__countdown">
              <BlockTitle title="Duration" hideIcon />
              <Countdown {...countdownOptions} showSeconds />
            </div>
          )}
          {counterparties && counterparties.length > 0 && (
            <div className="jur-viewer__voting-progress">
              <div className="jur-viewer__voting-progress__items">
                <DisputeVote
                  currentWallet={currentWallet}
                  statusId={statusId}
                  counterparties={counterparties}
                  onVote={onVote}
                  winner={contract.winner}
                  earnings={contract.earnings}
                  onReject={onReject}
                  canVote={canVote(statusId)}
                  voteReject={voteReject}
                />
              </div>
            </div>
          )}
          {metaMaskError && (
            <div className="jur-viewer__metamask">
              <AlertIcon /> {labels.metamaskError}
            </div>
          )}
        </div>
      </ReactModal>
    );
}
