import React from "react";
import "./ActiveOathsTable.scss";

import Table from "JurCommon/Table";
import Amount from "JurCommon/Amount";
import Box from "JurCommon/Box";
import { oathState, dateReducer } from "../../../../utils/helpers";

const ActiveOathsTable = ({ oaths, isShown }) =>
  isShown ? (
    <Box>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Token Amount</Table.Cell>
            <Table.Cell>Begin</Table.Cell>
            <Table.Cell>Duration</Table.Cell>
            <Table.Cell>Unlock Date</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {oaths
            .filter(oath => oathState(oath) === oathState.ACTIVE)
            .map(oath => (
              <Table.Row key={oath.oathIndex}>
                <Table.Cell align="left" className="jur-timeline-cell">
                  <Amount value={oath.amount} />
                </Table.Cell>
                <Table.Cell align="left">
                  {dateReducer(Number(oath.startAt) * 1000)}
                </Table.Cell>
                <Table.Cell align="left">{oath.lockInPeriod} months</Table.Cell>
                <Table.Cell align="left">
                  {dateReducer(Number(oath.releaseAt) * 1000)}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Box>
  ) : null;

ActiveOathsTable.defaultProps = { oaths: [] };

export default ActiveOathsTable;
