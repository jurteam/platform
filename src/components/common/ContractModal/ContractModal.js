import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

// components
import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../Button";

export const ContractModal = props => {
  const { labels } = useContext(AppContext);
  const { title, content, onAccept, onDecline, isOpen } = props;

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader title={title} />
      <ModalBody>
        <p>{content}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onDecline} color="dispute" size="medium" variant="raised">
          {labels.cancel}
        </Button>
        <Button onClick={onAccept} color="gradient" size="medium" variant="contained" hoverColor="success">
          {labels.ok}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
