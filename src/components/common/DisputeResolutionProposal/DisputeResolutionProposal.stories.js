import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import DisputeResolutionProposal from './';

storiesOf('DisputeResolutionProposal', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
    <DisputeResolutionProposal
      proposals={[
        {
          part_a: '0x83f456834564568346463f46',
          part_b: '0x93v846593493b49b3465b436',
          from: {
            wallet: '0x83f456834564568346463f46',
            name: 'Alice'
          },
          to: '0x93v846593493b49b3465b436',
          message: `0x55fe002aeff02f77364de339a1292923a15844b8 has not delivered the job in time causing me a lot of troubles. It's true that he has done more revisions but it was clearly mentioned in the KPI that the deadlines were important to me`,
          proposal: {
            part_a: {
              value: 2345,
              percentage: 43.54,
            },
            part_b: {
              value: 2323445,
              percentage: 60.54
            },
          },
          evidences: [
            { name: 'file1.pdf'},
            { name: 'file2.pdf'},
            { name: 'file3.pdf'}
          ]
        },
        {
          part_a: '0x93v846593493b49b3465b436',
          part_b: '0x83f456834564568346463f46',
          from: {
            wallet: '0x93v846593493b49b3465b436',
            name: 'Alice'
          },
          to: '0x83f456834564568346463f46',
          message: `0x55fe002aeff02f77364de339a1292923a15844b8 has not delivered the job in time causing me a lot of troubles. It's true that he has done more revisions but it was clearly mentioned in the KPI that the deadlines were important to me`,
          proposal: {
            part_a: {
              value: 2345,
              percentage: 43.54,
            },
            part_b: {
              value: 2323445,
              percentage: 60.54
            },
          },
          evidences: [
            { name: 'file1.pdf'},
            { name: 'file2.pdf'},
            { name: 'file3.pdf'}
          ]
        }
      ]}
    />
  ))