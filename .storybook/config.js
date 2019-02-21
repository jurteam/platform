import { configure, addDecorator } from '@storybook/react';
import requireContext from 'require-context.macro';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());

const req = requireContext('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);