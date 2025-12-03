import type React from "react";
import type * as G from "types/global";

export type Props = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Highlight the component, can be used to show when hotkey is pressed */
	active?: boolean;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"span">;
};
