import type * as G from "types/global";

export type Size = "small" | "medium" | "large" | "xlarge";

type BaseProps = {
	/** Name of the input element */
	name: string;
	/** Amount of characters in the pin */
	valueLength?: number;
	/** Character pattern used in the input value */
	pattern?: "alphabetic" | "numeric" | "alphanumeric";
	/** Component size */
	size?: G.Responsive<Size>;
	/** Input fields render variant */
	variant?: "outline" | "faded";
	/** Callback when the input value changes */
	onChange?: G.ChangeHandler<string>;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"input">;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
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
