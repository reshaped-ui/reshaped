import React from "react";
import Expandable from "components/_private/Expandable";
import AccordionContext from "./Accordion.context";
import type * as T from "./Accordion.types";

const AccordionContent = (props: T.ContentProps) => {
	const { children } = props;
	const { active, triggerId, contentId } = React.useContext(AccordionContext);

	return (
		<Expandable active={active} attributes={{ "aria-labelledby": triggerId, id: contentId }}>
			{children}
		</Expandable>
	);
};

export default AccordionContent;
