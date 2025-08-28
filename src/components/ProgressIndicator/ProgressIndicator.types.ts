import type * as G from "types/global";

export type Props = {
	/** Total amount of progress indicator dots */
	total: number;
	/** Index of the active progress indicator dot */
	activeIndex?: number;
	/** Component size */
	size?: "small" | "medium";
	/** Component color scheme */
	color?: "primary" | "media";
	/** aria-label attribute for the root element */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};
