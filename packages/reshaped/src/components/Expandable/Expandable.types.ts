import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Orientation = "vertical" | "horizontal";

export type Props = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Control the visibility of the content. Collapsed content stays mounted and is hidden with the `hidden` attribute */
	active?: boolean;
	/** Axis the content expands along. Horizontal orientation expands to the content width without wrapping the content
	 * @default "vertical"
	 */
	orientation?: Orientation;
	/** Callback after the content close transition is complete */
	onAfterClose?: () => void;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element. Passing `aria-label` or `aria-labelledby` renders it as a region landmark */
	attributes?: Attributes<"div">;
};
