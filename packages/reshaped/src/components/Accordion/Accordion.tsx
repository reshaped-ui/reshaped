import * as T from "./Accordion.types";
import AccordionControlled from "./AccordionControlled";
import AccordionUncontrolled from "./AccordionUncontrolled";

const Accordion: React.FC<T.Props> = (props) => {
	const { active } = props;

	if (active !== undefined) return <AccordionControlled {...props} />;
	return <AccordionUncontrolled {...props} />;
};

Accordion.displayName = "Accordion";

export default Accordion;
