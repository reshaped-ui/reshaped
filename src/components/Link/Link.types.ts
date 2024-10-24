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
> & {
	icon?: IconProps["svg"];
	color?: "inherit" | "critical" | "primary" | "positive" | "warning";
	variant?: "plain" | "underline";
};
