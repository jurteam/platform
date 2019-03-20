import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

// components
import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../Button";

export const DisclaimerModal = props => {
  const { labels } = useContext(AppContext);
  const { onAccept, onDecline, isOpen, disclaimerAccept } = props;

  const handleAccept = () => {
    disclaimerAccept(); // default action
    if (typeof onAccept === "function") onAccept(); // run onAccept function via props
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader title={labels.disclaimer} />
      <ModalBody>
        <p>{labels.disclaimerText}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onDecline} size="medium" variant="raised">
          {labels.decline}
        </Button>
        <Button onClick={handleAccept} size="medium" variant="contained">
          {labels.accept}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
