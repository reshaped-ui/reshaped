"use client";

import React from "react";
import { classNames } from "utilities/props";
import useElementId from "hooks/useElementId";
import AccordionContext from "./Accordion.context";
import * as T from "./Accordion.types";
import useHandlerRef from "hooks/useHandlerRef";

const AccordionControlled: React.FC<T.ControlledProps> = (props) => {
	const { children, onToggle, active, iconPosition, iconSize, className, attributes } = props;
	const rootClassNames = classNames(className);
	const id = useElementId();
	const onToggleRef = useHandlerRef(onToggle);

	const value = React.useMemo(
		() => ({
			triggerId: `${id}-trigger`,
			contentId: `${id}-content`,
			active,
			onToggle: onToggleRef.current,
			iconPosition,
			iconSize,
		}),
		[active, iconPosition, iconSize, id, onToggleRef]
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
