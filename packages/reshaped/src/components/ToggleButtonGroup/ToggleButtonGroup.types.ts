import type { ButtonGroupProps } from "components/Button";
import type { ToggleButtonProps } from "components/ToggleButton";
import type React from "react";

type BaseProps = {
	/** Selection mode for the toggle button group
	 * @default "single"
	 */
	selectionMode?: "single" | "multiple";
	/** Component color scheme applied to each button
	 * @default "neutral"
	 */
	color?: ToggleButtonProps["color"];
	/** Component color scheme for the selected button
	 * @default "neutral"
	 */
	selectedColor?: ToggleButtonProps["selectedColor"];
	/** Callback when the toggle button group value changes */
	onChange?: (args: {
		value: string[];
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
} & ButtonGroupProps;

export type ControlledProps = BaseProps & {
	/** Selected values in the group, enables controlled mode */
	value: string[];
	/** Default selected values in the group, enables uncontrolled mode */
	defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Selected values in the group, enables controlled mode */
	value?: never;
	/** Default selected values in the group, enables uncontrolled mode */
	defaultValue?: string[];
};
export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: ToggleButtonProps["onChange"];
	selectedColor?: ToggleButtonProps["selectedColor"];
	color?: ToggleButtonProps["color"];
	value?: string[];
};
