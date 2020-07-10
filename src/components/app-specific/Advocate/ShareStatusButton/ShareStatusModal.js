import React from "react";
import "./ShareStatusButton.scss";

import Modal from "JurCommon/Modal";
import Message from "JurCommon/Message";
import Text from "JurCommon/Text";
import SocialNetworkInput from "../SocialNetworkInput";
import ShareStatusTextInput from "../ShareStatusTextInput";
import SubmitShareButton from "../SubmitShareButton";
import { getAdvocateMessage } from "../../../../sagas/Selectors";
import { isMyProfile } from "../../../../utils/AdvocateHelpers";

const ShareModal = ({ address, isOpen, onRequestClose, message }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Header title={modalTitle(address)} />
      <Modal.Body>
        <Text weight="bold" size="small">
          Select a network
        </Text>
        <SocialNetworkInput />
        <Message timeOut={2000} type="toast">
          {message}
        </Message>
        <ShareStatusTextInput />
      </Modal.Body>
      <Modal.Footer>
        <SubmitShareButton />
      </Modal.Footer>
    </Modal>
  );
};

function modalTitle(address) {
  return isMyProfile(address)
    ? "Share your Advocate Badge"
    : "Share Advocate Badge";
}

const mapStateToProps = state => ({
  message: getAdvocateMessage(state)
});

export default global.connection(ShareModal, mapStateToProps);
