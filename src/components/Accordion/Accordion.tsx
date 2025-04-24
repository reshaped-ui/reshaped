import AccordionControlled from "./AccordionControlled";
import AccordionUncontrolled from "./AccordionUncontrolled";
import AccordionTrigger from "./AccordionTrigger";
import AccordionContent from "./AccordionContent";
import * as T from "./Accordion.types";

const Accordion: React.FC<T.Props> & {
	Trigger: typeof AccordionTrigger;
	Content: typeof AccordionContent;
} = (props) => {
	const { active } = props;

	if (active !== undefined) return <AccordionControlled {...props} />;
	return <AccordionUncontrolled {...props} />;
};

Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;
Accordion.displayName = "Accordion";

export default Accordion;
