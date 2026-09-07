import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Orientation = "vertical" | "horizontal";

export type Props = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Control the visibility of the content */
	active?: boolean;
	/** Axis the content expands along */
	orientation?: Orientation;
	/** Callback after the content close transition is complete */
	onAfterClose?: () => void;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
