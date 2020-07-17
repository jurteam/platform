import React from "react";
import Box from "JurCommon/Box";
import Text from "JurCommon/Text";
import TakeOathButton from "../TakeOathButton";

const TakeOathBox = () => (
  <Box type="hero">
    <Text>
      Oath Keepers are Jur supporters that spontaneously lock-up their tokens
      for a period of time to show their commitment to the entire ecosystem.
      This decision increases also their reputation within the dApp.
    </Text>
    <TakeOathButton />
  </Box>
);

export default TakeOathBox;
