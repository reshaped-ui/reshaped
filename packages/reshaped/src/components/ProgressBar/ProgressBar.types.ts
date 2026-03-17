import type { Attributes, ClassName } from "@reshaped/headless";

export type Props = {
	/** Value of the progress bar controlling the size of the fill */
	value?: number;
	/** Lower value boundary of the progress bar */
	max?: number;
	/** Upper value boundary of the progress bar */
	min?: number;
	/** Component size */
	size?: "small" | "medium";
	/** Component color scheme */
	color?: "primary" | "critical" | "warning" | "positive" | "media" | "neutral";
	/** Duration of the progress bar animation in milliseconds */
	duration?: number;
	/** aria-label attribute for the root element */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
