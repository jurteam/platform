import React from "react";
import PropTypes from "prop-types";
import ContractAccordion from "../ContractAccordion";
import ActivityList from "../ActivityList";
import { AngleIcon } from "../Icons/AngleIcon";

export const ActivitiesAccordion = ({activities}) => (
  <ContractAccordion title="Activity">
    <ActivityList activities={activities} />
  </ContractAccordion>
);