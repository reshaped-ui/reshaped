import type { ClassName } from "@reshaped/utilities";

import type { Attributes } from "@/types/global";

export type Props = {
	/** Value of the progress bar controlling the size of the fill, clamped to the min and max boundaries
	 * @default 0
	 */
	value?: number;
	/** Upper value boundary of the progress bar
	 * @default 100
	 */
	max?: number;
	/** Lower value boundary of the progress bar
	 * @default 0
	 */
	min?: number;
	/** Component size
	 * @default "medium"
	 */
	size?: "small" | "medium";
	/** Component color scheme.
	 * Use "media" for a white bar that stays the same in light and dark mode when rendering on top of images or video
	 * @default "primary"
	 */
	color?: "primary" | "critical" | "warning" | "positive" | "media" | "neutral";
	/** Duration of the fill transition after the value changes, in milliseconds.
	 * Makes the transition linear, so a timer can be displayed by changing the value once instead of updating it continuously
	 */
	duration?: number;
	/** aria-label attribute for the root element.
	 * Progress bar should be labelled either with it or with aria-labelledby passed through attributes
	 */
	ariaLabel?: string;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element, role passed here replaces the default progressbar role */
	attributes?: Attributes<"div">;
};
