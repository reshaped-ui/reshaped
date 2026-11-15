import type React from "react";

import type { ButtonGroupProps } from "@/components/Button";
import type { ToggleButtonProps } from "@/components/ToggleButton";

type BaseProps = {
	/** Selection mode for the toggle button group.
	 * In single mode, the selected button can't be unselected by clicking it again
	 * @default "single"
	 */
	selectionMode?: "single" | "multiple";
	/** Component color scheme applied to each button
	 * @default "neutral"
	 */
	color?: ToggleButtonProps["color"];
	/** Component color scheme for the selected button, uses the button color when not passed */
	selectedColor?: ToggleButtonProps["selectedColor"];
	/** Component variant for the selected button, uses the button variant when not passed */
	selectedVariant?: ToggleButtonProps["variant"];
	/** Callback when the toggle button group value changes, value contains a single item in single selection mode */
	onChange?: (args: {
		value: string[];
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
} & ButtonGroupProps;

export type ControlledProps = BaseProps & {
	/** Selected values in the group matching the value of its toggle buttons, enables controlled mode */
	value: string[];
	/** Default selected values in the group matching the value of its toggle buttons, enables uncontrolled mode */
	defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Selected values in the group matching the value of its toggle buttons, enables controlled mode */
	value?: never;
	/** Default selected values in the group matching the value of its toggle buttons, enables uncontrolled mode */
	defaultValue?: string[];
};
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: ToggleButtonProps["onChange"];
	selectedColor?: ToggleButtonProps["selectedColor"];
	selectedVariant?: ToggleButtonProps["variant"];
	color?: ToggleButtonProps["color"];
	value?: string[];
};
