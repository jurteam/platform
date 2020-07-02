import React from "react";
import "./ArticleButton.scss";

import Button from "JurCommon/Button";

const ArticleButton = ({ className }) => (
  <Button size="big" variant="contained" className={className}>
    Check out join.jur.io
  </Button>
);
export default ArticleButton;
