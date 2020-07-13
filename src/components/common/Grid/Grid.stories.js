import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Grid from './';

storiesOf('Grid', module)
.addDecorator(withInfo)
.addParameters({info: {inline: true,header: false}})
.add('Sample [Auto]', () => (<Grid />));
