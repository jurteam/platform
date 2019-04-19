import React, { useContext } from "react";

import { AppContext } from "../../../bootstrap/AppProvider"; // context

// components
import Modal from "../Modal";
import ModalHeader from "../ModalHeader";
import ModalBody from "../ModalBody";
import ModalFooter from "../ModalFooter";
import Button from "../Button";

export const PaymentModal = props => {
  const { labels } = useContext(AppContext);
  const { title, content, onAccept, isOpen } = props;

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader title={title} className={"jur-modal__error"} />
      <ModalBody>
        <p>{content}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onAccept} color="gradient" size="medium" variant="contained">
          {labels.okUnderstood}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
