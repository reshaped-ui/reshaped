import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Icon svg component or node. `null` renders an empty box of the icon size,
	 * which keeps the content aligned with the items rendering an icon
	 */
	svg: React.ReactElement | React.ComponentType | null;
	/** Icon size, literal css value or unit token multiplier
	 * @default "1em"
	 */
	size?: G.Responsive<number | string>;
	/** Icon color, based on the color tokens. Text color of the parent is used when not passed.
	 * Svg has to use `currentColor` for its fill or stroke to pick it up
	 */
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
	className?: ClassName;
	/** Additional attributes for the root element. Icon is always rendered with `aria-hidden`,
	 * so the accessible label should be added to the element wrapping it
	 */
	attributes?: Attributes<"span">;
};
