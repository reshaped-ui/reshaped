import type { ViewProps } from "components/View";
import type React from "react";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "paddingBlock" | "paddingInline" | "padding"> & {
	/** Show or hide the component */
	active?: boolean;
	/** Offset from the container bounds */
	offset?: G.Responsive<number>;
	/** Position based on the container bounds
	 * @default "bottom"
	 */
	position?: "top" | "top-end" | "top-start" | "bottom" | "bottom-start" | "bottom-end";
	/** CSS position style */
	positionType?: G.Responsive<"relative" | "absolute" | "fixed">;
	/** Display above the content with elevated shadow and background */
	elevated?: boolean;
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
