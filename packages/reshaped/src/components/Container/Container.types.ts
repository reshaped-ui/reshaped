import type { ViewProps } from "components/View";
import type React from "react";
import type * as G from "types/global";

export type Props = Pick<ViewProps, "align" | "justify" | "height" | "maxHeight"> & {
	/** Component inline padding */
	padding?: ViewProps["padding"];
	/** Component width, literal css value or unit token multiplier */
	width?: G.Responsive<string | number>;
	/** Component height, literal css value or unit token multiplier */
	height?: G.Responsive<string | number>;
	/** Component max height, literal css value or unit token multiplier */
	maxHeight?: G.Responsive<string | number>;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
