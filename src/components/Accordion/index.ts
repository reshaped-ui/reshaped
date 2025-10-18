import Accordion from "./Accordion";
import AccordionTrigger from "./AccordionTrigger";
import AccordionContent from "./AccordionContent";

const AccordionRoot = Accordion as typeof Accordion & {
	Trigger: typeof AccordionTrigger;
	Content: typeof AccordionContent;
};

AccordionRoot.Trigger = AccordionTrigger;
AccordionRoot.Content = AccordionContent;

export default AccordionRoot;
export type { Props as AccordionProps } from "./Accordion.types";
