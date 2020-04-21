import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

// TODO: put every new component in cost C => null

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
const Section = () => null;

// App Specific

const WalletCard = () => (
  <HeaderCard title="Wallet">
    <HeaderCard.Hero>
      <Avatar seed={wallet.address} />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <Text size="small">{wallet.address}</Text>
    </HeaderCard.Body>
  </HeaderCard>
);

const RankCard = () => (
  <HeaderCard title="Oath Keeper Rank">
    <HeaderCard.Hero>
      <Rank rank="2" />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <Text size="small">Check Oathkeeping Ranking</Text>
    </HeaderCard.Body>
  </HeaderCard>
);

const BalanceCard = () => (
  <HeaderCard title="Oath Keeper Balance">
    <HeaderCard.Hero>
      <Amount value="123" />
    </HeaderCard.Hero>
    <HeaderCard.Body>
      <ViewDetailsAction />
    </HeaderCard.Body>
  </HeaderCard>
);

const WithdrawOathButton = () => <Button>Withdraw</Button>;

// It will render last cell in each row of OathsTimelineView
const StatusAction = status =>
  status == "unlocked" ? <WithdrawOathButton /> : <Text>{status}</Text>;

const OathsTimelineView = oaths => "OathsTimelineView"; // TODO: write expressive version

const TakeOathAmountInput = () => null;
const TakeOathLockupSlider = () => null;
const TakeOathCancelButton = () => null;
const TakeOathSubmitButton = () => null;

const TakeOathModal = () => (
  <Modal>
    <ModalHeader>New Oath</ModalHeader>
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

const DurationSelector = () => null; // NOTE: name suggestions: RadioSelector, EnumFilter

const AverageAmountCard = () => (
  <ChartCard>
    <ChartCard.Title>Average Amount Staked</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={69.32} />
        <Delta value={-2.1} />
      </ChartCard.Metric>
      <ChartCard.LineChart data={some2dArray} />
    </Row>
    <ChartCard.Footer>
      <DurationSelector />
    </ChartCard.Footer>
  </ChartCard>
);

const AmountStakedCard = () => (
  <ChartCard>
    <ChartCard.Title>Amount Staked By Oath keeper</ChartCard.Title>
    <Row>
      <ChartCard.Metric>
        <Amount value={100000.32} />
      </ChartCard.Metric>
      <ChartCard.DonutsChart data={some2dArray} />
    </Row>
    <ChartCard.Footer>
      <DurationSelector />
    </ChartCard.Footer>
  </ChartCard>
);

const RankStatusFilter = () => <Dropdown />;
const RankAmountRangeFilter = () => <AmountRangeFilter />;
const RankDateRangeFilter = () => <DateRangeFilter />;
const RankSearchBox = () => <SearchBox />;

const RankingFilters = () => (
  <Row>
    <RankStatusFilter />
    <Expand />
    <RankAmountRangeFilter />
    <RankDateRangeFilter />
    <RankSearchBox />
  </Row>
);

const RankingTableHeaderRow = () => null;
const RankingTableRow = () => null;

const RankingTable = () => (
  <Table>
    <TableHead>
      <RankingTableHeaderRow />
    </TableHead>
    <TableBody>
      {rows.map(r => (
        <RankingTableRow key={r.address} {...r} />
      ))}
    </TableBody>
  </Table>
);

const RankingTableStats = () => null;
const RankingTablePagination = () => null;

const RankingFooter = () => (
  <Row>
    <RankingTableStats />
    <Expand />
    <RankingTablePagination />
  </Row>
);

const ActiveOathsTable = () => null;
const TakeOathButton = () => null;
const TakeOathButton = () => null;
const TakeOathButton = () => null;
const TakeOathButton = () => null;

// Sections

const HeaderSection = () => (
  <Section type="header">
    <Row>
      <WalletCard />
      <RankCard />
      <BalanceCard />
    </Row>
    <ActiveOathsTable hide={true} />
  </Section>
);

const TakeOathSection = () => (
  <Section type="main">
    <Text>Oath Keepers are Jur supporters ...</Text>
    <TakeOathButton />
  </Section>
);

const YourOathsSection = () => (
  <Section title="Your Oaths">
    {oaths ? (
      <OathsTimelineView oaths={oaths} />
    ) : (
      <Message text="You have not ..." />
    )}
    <TakeOathButton type="compact" />
  </Section>
);

const FooterSection = () => (
  <Section type="footer" title="Do you want to learn...">
    <Text>Check out article ...</Text>
  </Section>
);

const RankingTableSection = () => (
  <Section>
    <RankingFilters />
    <RankingTable />
    <RankingFooter />
  </Section>
);

// Screens

const MyOathsScreen = () => (
  <Screen>
    <HeaderSection />
    <TakeOathSection />
    <YourOathsSection />
    <FooterSection />
  </Screen>
);

const OathRankingScreen = () => (
  <Screen>
    <HeaderSection />
    <RankingTableSection />
  </Screen>
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
  .add("Navigation - In Profile", () => <MenuItem type="compact" />)
  .add("Screen - MyOaths", () => <MyOathsScreen />)
  .add("MyOaths - HeaderCard - Balance", () => <BalanceCard />)
  .add("MyOaths - HeaderCard - Rank", () => <RankCard />)
  .add("MyOaths - Header", () => <HeaderSection />)
  .add("MyOaths - TakeOath", () => <TakeOathSection />)
  .add("MyOaths - TakeOathModal", () => <TakeOathModal />)
  .add("MyOaths - YourOaths", () => <YourOathsSection />)
  .add("Screen - Ranking", () => <OathRankingScreen />);
