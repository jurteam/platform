import React from "react";
import "./ArticleButton.scss";

import Button from "JurCommon/Button";

const ArticleButton = ({ className }) => (
  <Button size="big" variant="contained" className={className}>
    Check out our landing page at status.jur.io
  </Button>
);
export default ArticleButton;
