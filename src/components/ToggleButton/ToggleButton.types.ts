import type { ButtonProps } from "components/Button";

type BaseProps = Omit<ButtonProps, "variant" | "highlighted"> & {
	/** Component render variant
	 * @default "outline"
	 */
	variant?: ButtonProps["variant"];
	/** Component color scheme when selected
	 * @default "neutral"
	 */
	selectedColor?: ButtonProps["color"];
	/** Value of the toggle button, enables controlled mode for the ToggleButtonGroup */
	value?: string;
	/** Callback when the toggle button value changes */
	onChange?: (args: {
		checked: boolean;
		value: string;
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
};

export type ControlledProps = BaseProps & {
	/** Default value of the toggle button, enables uncontrolled mode */
	defaultChecked?: never;
	/** Value of the toggle button, enables controlled mode */
	checked: boolean;
};
export type UncontrolledProps = BaseProps & {
	/** Default value of the toggle button, enables uncontrolled mode */
	defaultChecked?: boolean;
	/** Value of the toggle button, enables controlled mode */
	checked?: never;
};
export type Props = ControlledProps | UncontrolledProps;
