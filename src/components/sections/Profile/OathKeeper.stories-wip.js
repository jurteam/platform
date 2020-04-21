import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

// Commons Existing
import {
  Avatar,
  Button,
  Amount,
  Modal,
  ModalHeader,
  ModalBody,
  DateRangeFilter,
  SearchBox
} from "../commons";

// Commons New

const HeaderCard = () => null;
HeaderCard.Hero = () => null;
HeaderCard.Body = () => null;
const ViewDetailsAction = () => null;
const Rank = () => null;
const Text = () => null;
const Row = () => null;
const Expand = () => null;
const Message = () => null;
const ChartCard = () => null;
ChartCard.Title = () => null;
ChartCard.Metric = () => null;
ChartCard.Footer = () => null;
ChartCard.LineChart = () => null;
ChartCard.DonutsChart = () => null;
const AmountRangeFilter = () => null;
const Box = () => null;

// App Specific

const WalletCard = ({ address }) => (
  <HeaderCard title="Wallet" info="lorem ipsum">
    <HeaderCard.Hero>
      <Avatar seed={address} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <Text size="small">{address}</Text>
    </HeaderCard.Body>
  </HeaderCard>
);

const RankCard = ({ rank }) => (
  <HeaderCard title="Oath Keeper Rank" info="lorem another ipsum">
    <HeaderCard.Hero>
      <Rank rank={rank} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <Link to="ranking page">
        <Text size="small">Check Oathkeeping Ranking</Text>
      </Link>
    </HeaderCard.Body>
  </HeaderCard>
);

const BalanceCard = ({ amount, onViewDetail, isOpen }) => (
  <HeaderCard title="Oath Keeper Balance" info="lorem lorem">
    <HeaderCard.Hero>
      <Amount value={amount} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <ViewDetailsAction isOpen={isOpen} onClick={onViewDetail} />
    </HeaderCard.Body>
  </HeaderCard>
);

// On Click it will call releaseOath(oathId) in smart contract
const WithdrawOathButton = ({ oathId }) => <Button>Withdraw</Button>;

// It will render last cell in each row of OathsTimelineView
const StatusAction = ({ status, oathId }) =>
  status.toLowerCase() == "unlocked" ? (
    <WithdrawOathButton oathId={oathId} />
  ) : (
    <Text>{status}</Text>
  );

const OathsTimelineView = oaths => "OathsTimelineView"; // TODO: write expressive version

// The following components are always ment to be used together
// So could be exported through a single object.
// TakeOath.AmountInput, TakeOath.LockupSlider, etc.
const TakeOathAmountInput = () => null;
const TakeOathLockupSlider = () => null;
const TakeOathCancelButton = () => null;
const TakeOathSubmitButton = () => null;

// Will use Rect Context to manage form input
const TakeOathModal = ({ isOpen, onRequestClose }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <ModalHeader title="New Oath" />
    <ModalBody>
      <Text>Your commitment to the Jur ecosystem ...</Text>
      <Row>
        <TakeOathAmountInput />
        <TakeOathLockupSlider />
      </Row>
      <TakeOathTermsCheckbox />
    </ModalBody>
    <ModalFooter>
      <TakeOathCancelButton />
      <TakeOathSubmitButton />
    </ModalFooter>
  </Modal>
);

const EnumFilter = () => null; // NOTE: name suggestions: RadioSelector, DurationSelector

const AverageAmountCard = ({
  value,
  delta,
  graph,
  selectedEnum = "Last Month",
  onEnumFilterChange
}) => (
  <ChartCard>
    <ChartCard.Title>Average Amount Staked</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={value} />
        <Delta value={delta} />
      </ChartCard.Metric>
      <ChartCard.LineChart data={graph} />
    </Row>
    <ChartCard.Footer>
      <EnumFilter selected={selectedEnum} onChange={onEnumFilterChange} />
    </ChartCard.Footer>
  </ChartCard>
);

const AmountStakedCard = ({
  value,
  graph,
  selectedEnum = "Last Month",
  onEnumFilterChange
}) => (
  <ChartCard>
    <ChartCard.Title>Amount Staked By Oath keeper</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={value} />
      </ChartCard.Metric>
      <ChartCard.DonutsChart data={graph} />
    </Row>
    <ChartCard.Footer>
      <EnumFilter selected={selectedEnum} onChange={onEnumFilterChange} />
    </ChartCard.Footer>
  </ChartCard>
);

const ActiveAmountCard = () => null; // same as AverageAmountCard
const ActiveOathKeepersCard = () => null; // same as AverageAmountCard

const RankStatusFilter = () => <Dropdown />;
const RankAmountRangeFilter = () => <AmountRangeFilter />;
const RankDateRangeFilter = () => <DateRangeFilter />;
const RankSearchBox = () => <SearchBox />;

// It will manage individual filter changes and call onChange accordingly
// For example, onStatusChange -> direct call, onSearchChange -> debounced call, etc
const RankingFilters = ({ onChange }) => (
  <Row>
    <RankStatusFilter onChange={onStatusChange} selected={state.status} />
    <Expand />
    <RankAmountRangeFilter
      onChange={onAmountRangeChange}
      min={state.min}
      max={state.max}
    />
    <RankDateRangeFilter
      onChange={onDateRangeChange}
      start={state.start}
      end={state.end}
    />
    <RankSearchBox onChange={onSearchChange} query={state.query} />
  </Row>
);

const RankingTableHeaderRow = ({ onSort }) => null;
const RankingTableRow = ({ rank, address, amount, oathsCount }) => null;

const RankingTable = ({ rows, isLoading, onSortChange }) => (
  <Table>
    <TableHead>
      <RankingTableHeaderRow onSort={onSortChange} />
    </TableHead>
    <TableBody>
      {isLoading ? (
        <Spin />
      ) : (
        rows.map(r => <RankingTableRow key={r.address} {...r} />)
      )}
    </TableBody>
  </Table>
);

const RankingTableStats = ({ activePage, total, perPage = 10 }) =>
  `${activePage}-${activePage + perPage} of ${total}`;

const RankingTablePagination = ({
  active,
  total,
  onPageChange,
  perPage = 10
}) => (
  <Pagination
    activePage={active}
    itemsCountPerPage={perPage}
    totalItemsCount={total}
    handlePageChange={onPageChange}
  />
);

const RankingFooter = ({ active, total, onPageChange }) => (
  <Row>
    <RankingTableStats active={active} total={total} />
    <Expand />
    <RankingTablePagination
      active={active}
      total={total}
      onPageChange={onPageChange}
    />
  </Row>
);

const ActiveOathsTable = ({ isHidden = true, oaths }) => null;

// button manages state internally. It has modal also 😎
const TakeOathButton = () => null;

// Boxs

// manages state for view details action
const MyOathsHeaderBox = ({ oaths }) => (
  <Box type="header">
    <Row>
      <WalletCard />
      <RankCard />
      <BalanceCard />
    </Row>
    <ActiveOathsTable isHidden={true} oaths={oaths} />
  </Box>
);

const TakeOathBox = () => (
  <Box type="main">
    <Text>Oath Keepers are Jur supporters ...</Text>
    <TakeOathButton />
  </Box>
);

const YourOathsBox = ({ oaths }) => (
  <Box title="Your Oaths">
    {oaths.length ? (
      <OathsTimelineView oaths={oaths} />
    ) : (
      <Message text="You have not ..." />
    )}
    <TakeOathButton type="compact" />
  </Box>
);

const FooterBox = () => (
  <Box type="footer" title="Do you want to learn...">
    <Text>Check out article ...</Text>
  </Box>
);

// fetches data on load & handles filter change
const RankingTableBox = () => (
  <Box>
    <RankingFilters />
    <RankingTable />
    <RankingFooter />
  </Box>
);

// loads initial stats & handles enum filter change per card
const RankingHeaderBox = () => (
  <Box>
    <Row>
      <ActiveAmountCard onEnumFilterChange={onActiveAmountEmumFilterChange} />
      <AmountStakedCard onEnumFilterChange={onAmountStakedEmumFilterChange} />
      <AverageAmountCard onEnumFilterChange={onAverageAmountEmumFilterChange} />
      <ActiveOathKeepersCard
        onEnumFilterChange={onActiveOathKeeperEmumFilterChange}
      />
    </Row>
  </Box>
);

// Sections

const MyOathsSection = () => (
  <Section>
    <MyOathsHeaderBox oaths={activeOaths(oaths)} />
    <TakeOathBox />
    <YourOathsBox oaths={state.oaths} />
    <FooterBox />
  </Section>
);

const OathRankingSection = () => (
  <Section>
    <RankingHeaderBox />
    <RankingTableBox />
  </Section>
);

// Stories

storiesOf("OathKeeper", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Navigation - Top", () => <MenuItem />)
  .add("Section - MyOaths", () => <MyOathsSection />)
  .add("MyOaths - HeaderCard - Balance", () => <BalanceCard />)
  .add("MyOaths - HeaderCard - Rank", () => <RankCard />)
  .add("MyOaths - Header", () => <HeaderBox />)
  .add("MyOaths - TakeOath", () => <TakeOathBox />)
  .add("MyOaths - TakeOathModal", () => <TakeOathModal />)
  .add("MyOaths - YourOaths", () => <YourOathsBox />)
  .add("Section - Ranking", () => <OathRankingSection />);
