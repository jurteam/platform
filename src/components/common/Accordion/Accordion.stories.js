import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Accordion from './';
import AccordionItem from '../AccordionItem';

storiesOf('Accordion', module)
  .addDecorator(withInfo)
  .addParameters({ 
    info: { 
      inline: true,
      header: false
    }
  })
  .add('Default', () => (
  <Accordion accordionTitle="FAQ's">
    <AccordionItem title="Sed finibus dui sagittis metus feugiat varius.">
      Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam.
    </AccordionItem>
    <AccordionItem title="In eget diam sed sapien vestibulum molestie pharetra sed nisi.">
    Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam.
    </AccordionItem>
    <AccordionItem title="Sed finibus dui sagittis metus feugiat varius.">
      Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam.
    </AccordionItem>
    <AccordionItem title="In eget diam sed sapien vestibulum molestie pharetra sed nisi.">
    Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam.
    </AccordionItem>
  </Accordion>
))