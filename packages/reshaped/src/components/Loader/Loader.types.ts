import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Component size
	 * @default "small"
	 */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Component color, based on the color tokens.
	 * Use "inherit" to apply the text color of the parent, for example on top of colored backgrounds
	 * @default "primary"
	 */
	color?: "primary" | "critical" | "positive" | "inherit";
	/** aria-label attribute for the root element.
	 * Passing it also turns the loader into an assertive live region, so the label is announced by screen readers
	 */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"span">;
};
