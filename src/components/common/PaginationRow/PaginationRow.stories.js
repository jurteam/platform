import React from "react";

import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

import PaginationRow from './';

storiesOf('PaginationRow', module)
.addDecorator(withInfo)
.addParameters({info: {inline: true,header: false}})
.add('Sample [Auto]', () => (<PaginationRow />));
