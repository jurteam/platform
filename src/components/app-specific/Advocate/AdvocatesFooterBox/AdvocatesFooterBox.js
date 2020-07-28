import React from "react";
import "./AdvocatesFooterBox.scss";

import Box from "JurCommon/Box";
import ArticleButton from "../ArticleButton";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AdvocatesFooterBox = ({ labels }) => (
  <Box title={labels.learnAboutAdvocate} type="footer">
    <ArticleButton />
  </Box>
);
export default global.connection(AdvocatesFooterBox, mapLabelsToProps);
