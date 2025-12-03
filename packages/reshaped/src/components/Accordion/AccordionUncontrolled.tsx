"use client";

import React from "react";

import * as T from "./Accordion.types";
import AccordionControlled from "./AccordionControlled";

const AccordionUncontrolled: React.FC<T.UncontrolledProps> = (props) => {
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
