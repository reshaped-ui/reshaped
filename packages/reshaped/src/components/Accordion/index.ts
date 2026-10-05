import Accordion from "./Accordion.js";
import AccordionContent from "./AccordionContent.js";
import AccordionTrigger from "./AccordionTrigger.js";

const AccordionRoot = Accordion as typeof Accordion & {
	Trigger: typeof AccordionTrigger;
	Content: typeof AccordionContent;
};

AccordionRoot.Trigger = AccordionTrigger;
AccordionRoot.Content = AccordionContent;

export default AccordionRoot;
export type { Props as AccordionProps } from "./Accordion.types.js";
