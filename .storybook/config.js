import { configure, addDecorator } from '@storybook/react';
import requireContext from 'require-context.macro';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

const req = requireContext('../src/components', true, /\.stories\.js$/);
require('../src/assets/scss/_base.scss');
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);