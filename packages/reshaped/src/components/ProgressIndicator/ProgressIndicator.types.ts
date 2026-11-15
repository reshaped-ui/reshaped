import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Props = {
	/** Total amount of progress indicator dots.
	 * Only 7 dots fit into the component at once, the rest slide into view as activeIndex changes
	 */
	total: number;
	/** Zero-based index of the active progress indicator dot, controlled by the parent component
	 * @default 0
	 */
	activeIndex?: number;
	/** Has no effect, the component is always rendered in the same size */
	size?: "small" | "medium";
	/** Component color scheme.
	 * Use "media" for white dots when rendering on top of images or dark backgrounds
	 * @default "primary"
	 */
	color?: "primary" | "media";
	/** aria-label attribute for the element wrapping the dots.
	 * Passing it also adds the progressbar role and aria-value attributes, without it no role or value is exposed to screen readers
	 */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};
