import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Direction = "start" | "end";

export type Props = {
	/** Node for inserting the content */
	children?: React.ReactNode;
	/** Identity of the currently rendered content, animating the change whenever it changes */
	id?: string | number | boolean;
	/** Side the current content slides out to, while the next one slides in from the opposite one */
	direction?: Direction;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
