import type { Attributes, ClassName } from "@reshaped/headless";
import type React from "react";

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"ul">;
};

export type ItemProps = {
	/** Node for rendering custom item markers */
	markerSlot?: React.ReactNode | null;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the item element */
	className?: ClassName;
	/** Additional attributes for the item element */
	attributes?: Attributes<"li">;
};
