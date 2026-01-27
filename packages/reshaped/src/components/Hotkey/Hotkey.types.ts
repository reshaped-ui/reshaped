import type { Attributes, ClassName } from "@reshaped/headless";
import type React from "react";

export type Props = {
	/** Node for inserting children */
	children: React.ReactNode;
	/** Highlight the component, can be used to show when hotkey is pressed */
	active?: boolean;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"span">;
};
