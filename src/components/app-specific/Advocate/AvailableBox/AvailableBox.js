import React from "react";
import "./AvailableBox.scss";
import Box from "JurCommon/Box";
import AvailableTable from "../AvailableTable";
import AvailablePagination from "../AvailablePagination";

const AvailableBox = () => (
  <Box title="Activities Available">
    <AvailableTable />
    <AvailablePagination />
  </Box>
);
export default AvailableBox;
