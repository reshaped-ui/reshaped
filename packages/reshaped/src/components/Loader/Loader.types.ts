import type * as G from "types/global";

export type Props = {
	/** Component size */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Component color, based on the color tokens */
	color?: "primary" | "critical" | "positive" | "inherit";
	/** aria-label attribute for the root element */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"span">;
};
