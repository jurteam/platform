import React from "react";
import "./MyOathsFooterBox.scss";

import Box from "JurCommon/Box";
import Text from "JurCommon/Text";
import { mapLabelsToProps } from "../../../../utils/helpers";
import t from "../../../../utils/template";

const MyOathsFooterBox = ({ labels }) => (
  <Box title={labels.learnAboutOathKeeper} type="footer">
    <Text>
      {t(labels.checkOutArticle, {
        link: (
          <a href="https://medium.com/jur-io" target="_blank">
            jur.io
          </a>
        )
      })}
    </Text>
  </Box>
);

export default global.connection(MyOathsFooterBox, mapLabelsToProps);
