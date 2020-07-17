import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import Timer from './';

storiesOf('Timer', module)
.addDecorator(withInfo)
.addParameters({info: {inline: true,header: false}})
.add('Sample [Auto]', () => (<Timer />));
