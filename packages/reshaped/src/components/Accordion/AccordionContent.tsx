"use client";

import React from "react";

import Expandable from "@/components/Expandable/index.js";
import View from "@/components/View/index.js";
import AccordionContext from "./Accordion.context.js";
import type * as T from "./Accordion.types.js";

const AccordionContent: React.FC<T.ContentProps> = (props) => {
	const { children } = props;
	const { active, triggerId, contentId, gap } = React.useContext(AccordionContext);

	return (
		<Expandable active={active} attributes={{ "aria-labelledby": triggerId, id: contentId }}>
			{gap ? <View paddingTop={gap}>{children}</View> : children}
		</Expandable>
	);
};

AccordionContent.displayName = "Accordion.Content";

export default AccordionContent;
