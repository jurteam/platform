import React from "react";
import "./ActiveOathsTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import Box from "JurCommon/Box";
import {
  oathState,
  i18nDateFormat,
  mapLabelsToProps
} from "../../../../utils/helpers";

const ActiveOathsTable = ({ oaths, isShown, labels }) =>
  isShown ? (
    <Box>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{labels.tokenAmount}</Table.Cell>
            <Table.Cell>{labels.begin}</Table.Cell>
            <Table.Cell>{labels.duration}</Table.Cell>
            <Table.Cell>{labels.unlockDate}</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {oaths
            .filter(oath => oathState(oath).isActive())
            .map(oath => (
              <Table.Row key={oath.oathIndex}>
                <Table.Cell align="left" className="jur-timeline-cell">
                  <Amount value={oath.amount} />
                </Table.Cell>
                <Table.Cell align="left">
                  {i18nDateFormat(Number(oath.startAt) * 1000)}
                </Table.Cell>
                <Table.Cell align="left">{oath.lockInPeriod} months</Table.Cell>
                <Table.Cell align="left">
                  {i18nDateFormat(Number(oath.releaseAt) * 1000)}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Box>
  ) : null;

ActiveOathsTable.defaultProps = { oaths: [] };

export default global.connection(ActiveOathsTable, mapLabelsToProps);
