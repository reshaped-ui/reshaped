import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Icon svg component or node */
	svg: React.ReactElement | React.ComponentType | null;
	/** Icon size, literal css value or unit token multiplier */
	size?: G.Responsive<number | string>;
	/** Icon color, based on the color tokens */
	color?:
		| "neutral"
		| "neutral-faded"
		| "positive"
		| "critical"
		| "warning"
		| "primary"
		| "disabled";
	/** Use the width of the svg asset instead of providing a square bounding box */
	autoWidth?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"span">;
};
