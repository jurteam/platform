import React, { useContext } from "react";

import { AppContext } from "../../../../bootstrap/AppProvider"; // context

// components
import Modal from "../../../common/Modal";
import ModalHeader from "../../../common/ModalHeader";
import ModalBody from "../../../common/ModalBody";
import ModalFooter from "../../../common/ModalFooter";
import Button from "../../../common/Button";

export const PrivacyModal = props => {
  const { labels } = useContext(AppContext);
  const { onAccept, onDecline, isOpen } = props

  const handleAccept = () => {
    if (typeof onAccept === 'function') onAccept(); // run onAccept function via props
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader title={labels.dataLost} />
      <ModalBody>
        <p>{labels.dataLostText}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onDecline} size="medium" variant="contained">
          {labels.cancel}
        </Button>
        <Button onClick={handleAccept} size="medium" variant="raised">
          {labels.confirm}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
