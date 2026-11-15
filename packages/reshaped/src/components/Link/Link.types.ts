import type { ActionableProps } from "@/components/Actionable";
import type { IconProps } from "@/components/Icon";

export type Props = Pick<
	ActionableProps,
	| "attributes"
	| "className"
	| "disabled"
	| "children"
	| "href"
	| "onClick"
	| "type"
	| "stopPropagation"
	| "render"
	| "fullWidth"
> & {
	/** Icon at the start position.
	 * Turns the link into an inline-flex element, so it moves to the next line as a whole instead of wrapping together with the text
	 */
	icon?: IconProps["svg"];
	/** Link color, based on the color tokens, inherit uses the text color of the parent
	 * @default "primary"
	 */
	color?: "inherit" | "critical" | "primary" | "positive" | "warning";
	/** Link render variant
	 * @default "underline"
	 */
	variant?: "plain" | "underline";
};
