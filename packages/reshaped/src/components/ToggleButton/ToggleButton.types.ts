import type { ButtonProps } from "@/components/Button";

type BaseProps = Omit<ButtonProps, "variant" | "highlighted"> & {
	/** Component render variant
	 * @default "outline"
	 */
	variant?: ButtonProps["variant"];
	/** Component color scheme when selected, uses the color value when not passed */
	selectedColor?: ButtonProps["color"];
	/** Component variant when selected, uses the variant value when not passed */
	selectedVariant?: ButtonProps["variant"];
	/** Value of the toggle button, passed to the onChange handler.
	 * Required inside ToggleButtonGroup, where the group value defines if the button is checked
	 */
	value?: string;
	/** Callback when the toggle button checked state changes.
	 * Not called inside ToggleButtonGroup, use the group onChange instead
	 */
	onChange?: (args: {
		checked: boolean;
		value: string;
		event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
	}) => void;
};

export type ControlledProps = BaseProps & {
	/** Default checked state of the toggle button, enables uncontrolled mode */
	defaultChecked?: never;
	/** Checked state of the toggle button, enables controlled mode */
	checked: boolean;
};
export type UncontrolledProps = BaseProps & {
	/** Default checked state of the toggle button, enables uncontrolled mode */
	defaultChecked?: boolean;
	/** Checked state of the toggle button, enables controlled mode */
	checked?: never;
};
export type Props = ControlledProps | UncontrolledProps;
