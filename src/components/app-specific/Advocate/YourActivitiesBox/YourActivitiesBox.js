import React from "react";
import "./YourActivitiesBox.scss";
import Box from "JurCommon/Box";
import YourActivitiesTable from "../YourActivitiesTable";
import YourActivitiesPagination from "../YourActivitiesPagination";

const YourActivitiesBox = () => (
  <Box title="Your Activities">
    <YourActivitiesTable />
    <YourActivitiesPagination />
  </Box>
);

export default YourActivitiesBox;
