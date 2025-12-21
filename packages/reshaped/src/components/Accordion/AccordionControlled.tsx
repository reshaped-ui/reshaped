"use client";

import React from "react";

import useElementId from "hooks/useElementId";
import useHandlerRef from "hooks/useHandlerRef";
import { classNames } from "utilities/props";

import AccordionContext from "./Accordion.context";
import * as T from "./Accordion.types";

const AccordionControlled: React.FC<T.ControlledProps> = (props) => {
	const { children, onToggle, active, iconPosition, iconSize, gap, className, attributes } = props;
	const rootClassNames = classNames(className);
	const id = useElementId();
	const onToggleRef = useHandlerRef(onToggle);

	const value = React.useMemo(
		() => ({
			triggerId: `${id}-trigger`,
			contentId: `${id}-content`,
			active,
			// eslint-disable-next-line react-hooks/refs
			onToggle: onToggleRef.current,
			iconPosition,
			iconSize,
			gap,
		}),
		[active, iconPosition, iconSize, id, onToggleRef, gap]
	);

	return (
		<div {...attributes} className={rootClassNames}>
			<AccordionContext.Provider value={value}>
				{/* Wrap multiple children with a single element to avoid parent flexbox affecting contents of the accordion */}
				{children}
			</AccordionContext.Provider>
		</div>
	);
};

AccordionControlled.displayName = "AccordionControlled";

export default AccordionControlled;
