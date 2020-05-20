import React from "react";
import Button from "JurCommon/Button";

import TakeOathModal from "../TakeOathModal";
import {
  OATH_KEEPER_OPEN,
  OATH_KEEPER_CLOSE
} from "../../../../reducers/types";

const color = type => (type === "compact" ? "outline" : "gradient");
const label = type => (type === "compact" ? "New Oath" : "Oath Now");
const size = type => (type === "compact" ? "small" : undefined);

const TakeOathButton = ({ isOpen, open, close, type, message }) => {
  return (
    <>
      <Button color={color(type)} size={size(type)} onClick={open}>
        {label(type)}
      </Button>
      <TakeOathModal isOpen={isOpen} onRequestClose={close} message={message} />
    </>
  );
};

TakeOathButton.defaultProps = {
  type: "normal"
};

const mapStateToProps = state => ({
  isOpen: state.oathKeeper.isModalOpen,
  message: state.oathKeeper.newOathMessage
});

const open = () => ({ type: OATH_KEEPER_OPEN });
const close = () => ({ type: OATH_KEEPER_CLOSE });

const mapDispatchToProps = { open, close };

export default global.connection(
  TakeOathButton,
  mapStateToProps,
  mapDispatchToProps
);
