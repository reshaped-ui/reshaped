import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ViewProps } from "@/components/View";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = Pick<ViewProps, "align" | "justify" | "height" | "maxHeight"> & {
	/** Component inline padding */
	padding?: ViewProps["padding"];
	/** Component width, literal css value or unit token multiplier */
	width?: G.Responsive<string | number>;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
