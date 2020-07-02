import React from "react";
import "./ShareStatusButton.scss";

import Modal from "JurCommon/Modal";
import Text from "JurCommon/Text";
import SocialNetworkInput from "../SocialNetworkInput";
import ShareStatusTextInput from "../ShareStatusTextInput";
import SubmitShareButton from "../SubmitShareButton";

const ShareModal = ({ address, isOpen, onRequestClose }) => {
  const initialText = `I am a Status Holder in the Jur ecosystem to support the development of a truly decentralized ecosystem for a new legal framework https://status.jur.io/${address} `;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Header title="Share your Status Badge" />
      <Modal.Body>
        <Text>Select a network</Text>
        <SocialNetworkInput />
        <ShareStatusTextInput defaultValue={initialText} />
      </Modal.Body>
      <Modal.Footer>
        <SubmitShareButton />
      </Modal.Footer>
    </Modal>
  );
};

export default ShareModal;
