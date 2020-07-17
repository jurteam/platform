import React from "react";
import "./YourActivitiesBox.scss";
import Box from "JurCommon/Box";
import YourActivitiesTable from "../YourActivitiesTable";
import YourActivitiesPagination from "../YourActivitiesPagination";
import { getAdvocateHasYourActivities } from "../../../../sagas/Selectors";

const YourActivitiesBox = ({ hasActivities }) => (
  <Box title="Your Activities" hide={hasActivities}>
    <YourActivitiesTable />
    <YourActivitiesPagination />
  </Box>
);

const mapStateToProps = state => ({
  hasActivities: getAdvocateHasYourActivities(state)
});

export default global.connection(YourActivitiesBox, mapStateToProps);
