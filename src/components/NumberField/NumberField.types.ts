import type { TextFieldBaseProps } from "components/TextField";
import type * as G from "types/global";

export type BaseProps = Omit<
	TextFieldBaseProps,
	"endSlot" | "onChange" | "rounded" | "multiline"
> & {
	/** Callback when the component value is changed */
	onChange?: G.ChangeHandler<number>;
	/** aria-label attribute for the increase button */
	increaseAriaLabel: string;
	/** aria-label attribute for the decrease button */
	decreaseAriaLabel: string;
	/** Minimum value supported in the form field	 */
	min?: number;
	/** Maximum value supported in the form field */
	max?: number;
	/** Step at which the value will increase or decrease when clicking the button controls */
	step?: number;
};

export type ControlledProps = BaseProps & {
	/** Value of the form field, enables controlled mode */
	value: number | null;
	/** Default value of the form field, enables uncontrolled mode */
	defaultValue?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Value of the form field, enables controlled mode */
	value?: never;
	/** Default value of the form field, enables uncontrolled mode */
	defaultValue?: number;
};

export type Props = ControlledProps | UncontrolledProps;
