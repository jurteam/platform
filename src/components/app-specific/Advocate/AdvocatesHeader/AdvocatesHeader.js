import React from "react";
import "./AdvocatesHeader.scss";

import Text from "JurCommon/Text";
import Grid from "JurCommon/Grid";
import AdvocatesSearchInput from "../AdvocatesSearchInput";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AdvocatesHeader = ({ labels }) => (
  <Grid template="auto / auto 212px">
    <Grid.Cell>
      <Text size="large" transform="header">
        {labels.advocates}
      </Text>
      <Text>{labels.advocateListDescription}</Text>
    </Grid.Cell>
    <Grid.Cell vertical="end">
      <AdvocatesSearchInput />
    </Grid.Cell>
  </Grid>
);
export default global.connection(AdvocatesHeader, mapLabelsToProps);
