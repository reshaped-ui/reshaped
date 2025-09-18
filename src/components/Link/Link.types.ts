import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";

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
> & {
	/** Icon at the start position */
	icon?: IconProps["svg"];
	/** Link color, based on the color tokens
	 * @default "primary"
	 */
	color?: "inherit" | "critical" | "primary" | "positive" | "warning";
	/** Link render variant
	 * @default "underline"
	 */
	variant?: "plain" | "underline";
};
