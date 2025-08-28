import type React from "react";
import type { ButtonGroupProps } from "components/Button";
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
};
