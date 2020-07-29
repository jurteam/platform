import React from "react";
import "./AvailableBox.scss";
import Box from "JurCommon/Box";
import AvailableTable from "../AvailableTable";
import AvailablePagination from "../AvailablePagination";
import { mapLabelsToProps } from "../../../../utils/helpers";

const AvailableBox = ({ labels }) => (
  <Box title={labels.activitiesAvailable} id="jur-advocate__availabe-box">
    <AvailableTable />
    <AvailablePagination />
  </Box>
);
export default global.connection(AvailableBox, mapLabelsToProps);
