import * as T from "./Accordion.types.js";
import AccordionControlled from "./AccordionControlled.js";
import AccordionUncontrolled from "./AccordionUncontrolled.js";

const Accordion: React.FC<T.Props> = (props) => {
	const { active } = props;

	if (active !== undefined) return <AccordionControlled {...props} />;
	return <AccordionUncontrolled {...props} />;
};

Accordion.displayName = "Accordion";

export default Accordion;
