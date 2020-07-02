import React, { useState } from "react";
import "./ShareStatusButton.scss";

import Button from "JurCommon/Button";
import ShareStatusModal from "./ShareStatusModal";

const ShareStatusButton = ({ address, className }) => {
  const [isOpen, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return (
    <>
      <Button
        onClick={open}
        variant="contained"
        size="big"
        className={className}
      >
        Share Your Status Badge
      </Button>
      <ShareStatusModal
        isOpen={isOpen}
        onRequestClose={close}
        address={address}
      />
    </>
  );
};

export default ShareStatusButton;
