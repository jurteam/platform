import React from "react";
import "./ArticleButton.scss";

import Button from "JurCommon/Button";
import { mapLabelsToProps } from "../../../../utils/helpers";

const ArticleButton = ({ className, labels }) => (
  <Button size="big" variant="contained" className={className}>
    {labels.checkOutJur}
  </Button>
);
export default global.connection(ArticleButton, mapLabelsToProps);
