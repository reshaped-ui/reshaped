import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Size = "small" | "medium" | "large" | "xlarge";

type BaseProps = {
	/** Name of the input element */
	name: string;
	/** Amount of characters in the pin
	 * @default 4
	 */
	valueLength?: number;
	/** Character pattern used in the input value, characters that don't match it are ignored.
	 * Letters are limited to the latin alphabet, "numeric" also enables the numeric keyboard on mobile
	 * @default "numeric"
	 */
	pattern?: "alphabetic" | "numeric" | "alphanumeric";
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<Size>;
	/** Input fields render variant
	 * @default "outline"
	 */
	variant?: "outline" | "faded";
	/** Callback when the input value changes, called on every change with a value that can be shorter than valueLength.
	 * Compare the value length with valueLength to find out when the whole pin is entered
	 */
	onChange?: G.ChangeHandler<string>;
	/** Additional attributes for the input element, like aria-label or autoComplete, which is "one-time-code" by default.
	 * There are no disabled and hasError props: pass disabled here or use FormControl disabled,
	 * the error state is only shown inside FormControl with hasError
	 */
	inputAttributes?: Attributes<"input">;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
};

export type ControlledProps = BaseProps & {
	/** Value of the input element, enables controlled mode */
	value: string;
	/** Default value of the input element, enables uncontrolled mode */
	defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Value of the input element, enables controlled mode */
	value?: never;
	/** Default value of the input element, enables uncontrolled mode */
	defaultValue?: string;
};

export type Props = ControlledProps | UncontrolledProps;
