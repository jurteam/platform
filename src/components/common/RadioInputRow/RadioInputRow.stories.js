import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import RadioInputRow from './';

storiesOf('RadioInputRow', module)
.addDecorator(withInfo)
.addParameters({info: {inline: true,header: false}})
.add('Sample [Auto]', () => (<RadioInputRow />));
