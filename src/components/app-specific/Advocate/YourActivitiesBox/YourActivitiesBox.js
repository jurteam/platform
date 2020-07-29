import React from "react";
import "./YourActivitiesBox.scss";
import Box from "JurCommon/Box";
import YourActivitiesTable from "../YourActivitiesTable";
import YourActivitiesPagination from "../YourActivitiesPagination";
import {
  getAdvocateHasYourActivities,
  getLabels
} from "../../../../sagas/Selectors";

const YourActivitiesBox = ({ hasActivities, labels }) => (
  <Box title={labels.yourActivities} hide={hasActivities}>
    <YourActivitiesTable />
    <YourActivitiesPagination />
  </Box>
);

const mapStateToProps = state => ({
  hasActivities: getAdvocateHasYourActivities(state),
  labels: getLabels(state)
});

export default global.connection(YourActivitiesBox, mapStateToProps);
