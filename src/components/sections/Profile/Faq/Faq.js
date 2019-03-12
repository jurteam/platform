import React, { useContext } from "react"; // eslint-disable-line no-unused-vars

import { AppContext } from "../../../../bootstrap/AppProvider"; // context

// Components
import Accordion from "../../../common/Accordion";
import AccordionItem from "../../../common/AccordionItem";

export function Faq({faqs}) {
  const { labels } = useContext(AppContext)
  return (
    <Accordion accordionTitle={labels.faq}>
      {faqs.map((item, idx) => <AccordionItem key={`accordion-${idx}`} question={item.title}>{item.description}</AccordionItem>)}
    </Accordion>
  );
}
