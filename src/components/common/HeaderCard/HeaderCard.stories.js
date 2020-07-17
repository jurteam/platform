import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { NavLink } from "react-router-dom";

import HeaderCard from "./";
import Avatar from "../Avatar";
import Logo from "../Logo";
import Amount from "../Amount";

const address = "0x4842e37e90e777b82dd7190499";

storiesOf("HeaderCard", module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
      header: false
    }
  })
  .add("Wallet (Recreated)", () => (
    <HeaderCard title="Wallet">
      <HeaderCard.Hero>
        <Avatar seed={address} size="xlarge" variant="rounded" />
      </HeaderCard.Hero>
      <HeaderCard.Body>{address}</HeaderCard.Body>
    </HeaderCard>
  ))
  .add("Rank (Recreated)", () => (
    <HeaderCard title="Oath Keeper Rank">
      <HeaderCard.Hero>
        <Logo />
      </HeaderCard.Hero>
      <HeaderCard.Body>
        <NavLink to="/oath-keeper/oath-takers">
          Check Oathkeeping Ranking
        </NavLink>
      </HeaderCard.Body>
    </HeaderCard>
  ))
  .add("Balance (Recreated)", () => (
    <HeaderCard title="Oath Keeper Balance">
      <HeaderCard.Hero>
        <Amount value={5500.92} />
      </HeaderCard.Hero>
      <HeaderCard.Body>View Details ⌄</HeaderCard.Body>
    </HeaderCard>
  ));
