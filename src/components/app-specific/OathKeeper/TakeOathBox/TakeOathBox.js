import React from "react";
import Box from "JurCommon/Box";
import Text from "JurCommon/Text";
import TakeOathButton from "../TakeOathButton";
import { mapLabelsToProps } from "../../../../utils/helpers";

const TakeOathBox = ({ labels }) => (
  <Box type="hero">
    <Text>{labels.takeOathDescription}</Text>
    <TakeOathButton />
  </Box>
);

export default global.connection(TakeOathBox, mapLabelsToProps);
