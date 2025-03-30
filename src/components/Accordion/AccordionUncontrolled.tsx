"use client";

import React from "react";
import AccordionControlled from "./AccordionControlled";
import * as T from "./Accordion.types";

const AccordionUncontrolled = (props: T.UncontrolledProps) => {
	const { defaultActive, onToggle, ...controlledProps } = props;
	const [active, setActive] = React.useState(defaultActive || false);

	const handleToggle: T.Props["onToggle"] = (active) => {
		setActive(active);
		onToggle?.(active);
	};

	return <AccordionControlled {...controlledProps} onToggle={handleToggle} active={active} />;
};

AccordionUncontrolled.displayName = "AccordionUncontrolled";

export default AccordionUncontrolled;
