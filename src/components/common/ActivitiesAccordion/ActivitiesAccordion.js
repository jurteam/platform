import React from "react";
import PropTypes from "prop-types";
import ContractAccordion from "../ContractAccordion";
import ActivityList from "../ActivityList";
import { AngleIcon } from "../Icons/AngleIcon";

export const ActivitiesAccordion = props => (
  <ContractAccordion title="Activity">
    <ActivityList activities={props.activities} />
  </ContractAccordion>
);