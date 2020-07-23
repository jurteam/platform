import React, { useState } from "react";
import Button from "JurCommon/Button";
import { ModalDiscliamer } from "JurCommon/Disclaimer";

import TakeOathModal from "../TakeOathModal";
import {
  OATH_KEEPER_OPEN,
  OATH_KEEPER_CLOSE
} from "../../../../reducers/types";
import { getUser } from "../../../../sagas/Selectors";

const color = type => (type === "compact" ? "outline" : "gradient");
const label = type => (type === "compact" ? "New Oath" : "Oath Now");
const size = type => (type === "compact" ? "small" : undefined);

const TakeOathButton = ({
  isOpen,
  open,
  close,
  type,
  message,
  isDisclaimerAccepted
}) => {
  const [isDisclaimerOpen, openDisclaimer] = useState(false);
  return (
    <>
      <Button
        color={color(type)}
        size={size(type)}
        onClick={isDisclaimerAccepted ? open : () => openDisclaimer(true)}
      >
        {label(type)}
      </Button>
      <ModalDiscliamer
        isOpen={isDisclaimerOpen}
        onAccept={() => openDisclaimer(false)}
        onDecline={() => openDisclaimer(false)}
      />
      <TakeOathModal isOpen={isOpen} onRequestClose={close} message={message} />
    </>
  );
};

TakeOathButton.defaultProps = {
  type: "normal"
};

const mapStateToProps = state => ({
  isOpen: state.oathKeeper.isModalOpen,
  message: state.oathKeeper.newOathMessage,
  isDisclaimerAccepted: getUser(state).disclaimer.optin
});

const open = () => ({ type: OATH_KEEPER_OPEN });
const close = () => ({ type: OATH_KEEPER_CLOSE });

const mapDispatchToProps = { open, close };

export default global.connection(
  TakeOathButton,
  mapStateToProps,
  mapDispatchToProps
);
