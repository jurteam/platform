import React from "react";
import "./HoldersTableBox.scss";

import Box from "JurCommon/Box";
import HoldersTable from "../HoldersTable";
import HoldersPagination from "../HoldersPagination";

const HoldersTableBox = () => (
  <Box>
    <HoldersTable />
    <HoldersPagination />
  </Box>
);

export default HoldersTableBox;
