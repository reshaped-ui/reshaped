"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import useElementId from "hooks/useElementId";
import AccordionContext from "./Accordion.context";
import * as T from "./Accordion.types";

const AccordionControlled: React.FC<T.ControlledProps> = (props) => {
	const { children, onToggle, active, iconPosition, iconSize, className, attributes } = props;
	const rootClassNames = classNames(className);
	const id = useElementId();

	const value = React.useMemo(
		() => ({
			triggerId: `${id}-trigger`,
			contentId: `${id}-content`,
			active,
			onToggle,
			iconPosition,
			iconSize,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[active]
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
