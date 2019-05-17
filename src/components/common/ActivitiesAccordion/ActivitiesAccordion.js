import React from "react";

import ContractAccordion from "../ContractAccordion";
import ActivityList from "../ActivityList";

export const ActivitiesAccordion = ( props ) => (
  <ContractAccordion title="Activity">
    <ActivityList activities={props.activities} />
  </ContractAccordion>
);