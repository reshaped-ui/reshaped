"use client";

import React from "react";

import Expandable from "components/_private/Expandable";
import View from "components/View";

import AccordionContext from "./Accordion.context";

import type * as T from "./Accordion.types";

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
