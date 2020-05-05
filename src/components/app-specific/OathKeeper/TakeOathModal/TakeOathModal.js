import React from "react";
import Modal from "JurCommon/Modal";
import Text from "JurCommon/Text";
import Row from "JurCommon/Row";

import TakeOathCancelButton from "../TakeOathCancelButton";
import TakeOathSubmitButton from "../TakeOathSubmitButton";
import TakeOathTermsCheckbox from "../TakeOathTermsCheckbox";
import TakeOathAmountInput from "../TakeOathAmountInput";
import TakeOathLockupSlider from "../TakeOathLockupSlider";

const TakeOathModal = ({ isOpen, onRequestClose }) => {
  console.log("TakeOathModal isOpen", isOpen);
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Modal.Header title="New Oath" />
      <Modal.Body>
        <Text>
          Your commitment to the Jur ecosystem is admirable and we value it
          above anything else. Locking voluntarily your tokens is a gesture that
          supports Jur's growth. We work hard to make this ecosystem shine
          because of people like you. Thanks from the Jur team.
        </Text>
        <Row>
          <TakeOathAmountInput />
          <TakeOathLockupSlider />
        </Row>
        <TakeOathTermsCheckbox />
      </Modal.Body>
      <Modal.Footer>
        <TakeOathCancelButton onClick={onRequestClose} />
        <TakeOathSubmitButton />
      </Modal.Footer>
    </Modal>
  );
};

export default TakeOathModal;
