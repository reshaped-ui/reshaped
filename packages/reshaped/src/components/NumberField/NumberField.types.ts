import type { TextFieldBaseProps } from "@/components/TextField";
import type * as G from "@/types/global";

export type BaseProps = Omit<
	TextFieldBaseProps,
	"endSlot" | "onChange" | "rounded" | "multiline"
> & {
	/** Callback when the value changes from typing a number, using the controls or pressing the arrow keys.
	 * Receives an object with name and value, without an event. It's not called when the field is cleared
	 */
	onChange?: G.ChangeHandler<number>;
	/** aria-label attribute for the increase button */
	increaseAriaLabel: string;
	/** aria-label attribute for the decrease button */
	decreaseAriaLabel: string;
	/** Minimum value supported in the form field, disables the decrease control when reached.
	 * Lower values can still be typed, they are replaced with the minimum value on blur
	 */
	min?: number;
	/** Maximum value supported in the form field, disables the increase control when reached.
	 * Higher values can still be typed, they are replaced with the maximum value on blur
	 */
	max?: number;
	/** Step at which the value will increase or decrease when clicking the button controls or pressing the arrow keys
	 * @default 1
	 */
	step?: number;
};

export type ControlledProps = BaseProps & {
	/** Value of the form field, enables controlled mode. Pass null to render an empty field */
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
