import React, { useState } from "react";
import "./ShareStatusButton.scss";

import Button from "JurCommon/Button";
import ShareStatusModal from "./ShareStatusModal";
import { mapLabelsToProps } from "../../../../utils/helpers";

const ShareStatusButton = ({ address, className, labels }) => {
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
        {labels.shareAdvocateBadge}
      </Button>
      <ShareStatusModal
        isOpen={isOpen}
        onRequestClose={close}
        address={address}
      />
    </>
  );
};

export default global.connection(ShareStatusButton, mapLabelsToProps);
