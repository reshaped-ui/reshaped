import React from "react";

import type { ViewProps } from "components/View";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting content */
	children?: React.ReactNode;
	/** Node for inserting background content behind the scrim */
	backgroundSlot?: React.ReactNode;
	/** Component content position */
	position?: "full" | "top" | "bottom" | "start" | "end";
	/** Additional classname for the scrim element */
	scrimClassName?: G.ClassName;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
} & Pick<ViewProps, "paddingInline" | "paddingBlock" | "padding" | "borderRadius">;
