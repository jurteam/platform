import React from "react";
import "./AdvocatesHeader.scss";

import Text from "JurCommon/Text";
import Grid from "JurCommon/Grid";
import AdvocatesSearchInput from "../AdvocatesSearchInput";

const AdvocatesHeader = () => (
  <Grid template="auto / auto 212px">
    <Grid.Cell>
      <Text size="large" transform="header">
        Advocates
      </Text>
      <Text>
        This is the list of active Jur Advocates licenses that are co-creating
        the Jur legal automation framework
      </Text>
    </Grid.Cell>
    <Grid.Cell vertical="end">
      <AdvocatesSearchInput />
    </Grid.Cell>
  </Grid>
);
export default AdvocatesHeader;
