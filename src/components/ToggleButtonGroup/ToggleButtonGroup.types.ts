import type React from "react";
import type { ButtonGroupProps, ButtonProps } from "components/Button";
import type { ToggleButtonProps } from "components/ToggleButton";

type BaseProps = {
	/** Selection mode for the toggle button group
	 * @default "single"
	 */
	selectionMode?: "single" | "multiple";
	/** Callback when the toggle button group value changes */
	onChange?: (args: {
		value: string[];
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
	/** Component color scheme for all buttons in the group
	 * Individual button colors take priority over this
	 * @default "neutral"
	 */
	color?: ButtonProps["color"];
	/** Component color scheme for selected buttons in the group
	 * Individual button colors take priority over this
	 */
	selectedColor?: ButtonProps["color"];
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
	value?: string[];
	color?: ButtonProps["color"];
	selectedColor?: ButtonProps["color"];
};
