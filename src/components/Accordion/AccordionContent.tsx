"use client";

import React from "react";
import Expandable from "components/_private/Expandable";
import AccordionContext from "./Accordion.context";
import type * as T from "./Accordion.types";

const AccordionContent: React.FC<T.ContentProps> = (props) => {
	const { children } = props;
	const { active, triggerId, contentId } = React.useContext(AccordionContext);

	return (
		<Expandable active={active} attributes={{ "aria-labelledby": triggerId, id: contentId }}>
			{children}
		</Expandable>
	);
};

AccordionContent.displayName = "Accordion.Content";

export default AccordionContent;
