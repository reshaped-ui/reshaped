import React from "react";

import type { Attributes, ClassName } from "@reshaped/headless";
import type { ViewProps } from "components/View";

export type Props = {
	/** Node for inserting content */
	children?: React.ReactNode;
	/** Node for inserting background content behind the scrim */
	backgroundSlot?: React.ReactNode;
	/** Component content position */
	position?: "full" | "top" | "bottom" | "start" | "end";
	/** Additional classname for the scrim element */
	scrimClassName?: ClassName;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
} & Pick<ViewProps, "paddingInline" | "paddingBlock" | "padding" | "borderRadius">;
