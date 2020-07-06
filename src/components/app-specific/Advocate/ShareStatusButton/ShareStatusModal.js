import React from "react";
import "./ShareStatusButton.scss";

import Modal from "JurCommon/Modal";
import Message from "JurCommon/Message";
import Text from "JurCommon/Text";
import SocialNetworkInput from "../SocialNetworkInput";
import ShareStatusTextInput from "../ShareStatusTextInput";
import SubmitShareButton from "../SubmitShareButton";
import { getAdvocateMessage } from "../../../../sagas/Selectors";

const ShareModal = ({ address, isOpen, onRequestClose, message }) => {
  const initialText = `I am an Advocate in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework https://status.jur.io/${address} `;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Header title="Share your Status Badge" />
      <Modal.Body>
        <Text weight="bold" size="small">
          Select a network
        </Text>
        <SocialNetworkInput />
        <Message timeOut={2000} type="toast">
          {message}
        </Message>
        <ShareStatusTextInput defaultValue={initialText} />
      </Modal.Body>
      <Modal.Footer>
        <SubmitShareButton />
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  message: getAdvocateMessage(state)
});

export default global.connection(ShareModal, mapStateToProps);
