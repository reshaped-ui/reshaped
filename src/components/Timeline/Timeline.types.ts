import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"ul">;
};

export type ItemProps = {
	/** Node for rendering custom item markers */
	markerSlot?: React.ReactNode | null;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional classname for the item element */
	className?: G.ClassName;
	/** Additional attributes for the item element */
	attributes?: G.Attributes<"li">;
};
