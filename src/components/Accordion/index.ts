import Accordion from "./Accordion";
import AccordionTrigger from "./AccordionTrigger";
import AccordionContent from "./AccordionContent";
import type * as T from "./Accordion.types";

const AccordionRoot = Accordion as React.FC<T.Props> & {
	Trigger: typeof AccordionTrigger;
	Content: typeof AccordionContent;
};

AccordionRoot.Trigger = AccordionTrigger;
AccordionRoot.Content = AccordionContent;

export default AccordionRoot;
export type { Props as AccordionProps } from "./Accordion.types";
