import React, { Component } from "react";

import PageLayout from "../PageLayout";
import Main from "../Main";
import Aside from "../Aside";
import ProfileMenu from "../ProfileMenu";
import Accordion from "../Accordion";
import AccordionItem from "../AccordionItem";

const faqs = [
  {
    question: "Sed finibus dui sagittis metus feugiat varius.",
    answer:
      "Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam."
  },
  {
    question: "Sed finibus dui sagittis metus feugiat varius.",
    answer:
      "Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam."
  },
  {
    question: "Sed finibus dui sagittis metus feugiat varius.",
    answer:
      "Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam."
  },
  {
    question: "Sed finibus dui sagittis metus feugiat varius.",
    answer:
      "Sed mattis libero non molestie maximus. Praesent et est in augue placerat interdum. Quisque accumsan arcu leo, eu porta 	enim molestie eu. Nulla eu sodales enim. Nam hendrerit quam nec mi aliquet blandit. Nullam pellentesque gravida cursus. 	Maecenas mollis, dui nec tempor accumsan, justo enim tempor libero, vitae finibus erat ligula convallis est. Quisque non enim 	posuere, facilisis nunc ac, tempor turpis. Mauris eu vehicula diam, vel tincidunt velit. Integer sit amet ex vel lorem dapibus 	tincidunt. Curabitur euismod est vel augue commodo malesuada. Nunc eget nunc non metus dignissim ultrices non eget 	purus. In non nunc a libero hendrerit hendrerit sit amet vehicula elit. Ut mattis, urna et pulvinar efficitur, erat turpis porttitor 	neque, sit amet tincidunt sem nibh ac quam."
  }
];

export class ProfileFaq extends Component {
  render() {
    return (
      <PageLayout showBreadcrumbs={false}>
        <Aside>
          <ProfileMenu
            menuList={[
              {
                id: 0,
                label: "Profile Settings",
                to: "/profile"
              },
              {
                id: 1,
                label: "Privacy",
                to: "/privacy"
              },
              {
                id: 2,
                label: `FAQ's`,
                to: "/faq"
              },
              {
                id: 3,
                label: `Term of Service`,
                to: "/terms"
              }
            ]}
          />
        </Aside>
        <Main>
          <Accordion accordionTitle="FAQ's">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </Main>
      </PageLayout>
    );
  }
}
