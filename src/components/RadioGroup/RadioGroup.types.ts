import type { RadioProps } from "components/Radio";
import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	/** Unique identifier for the radio group */
	id?: string;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Disable the form field from the form submission */
	disabled?: boolean;
	/** Name of the input element */
	name: string;
	/** Indicate that the form field has an error */
	hasError?: boolean;
	/** Callback when the input value changes */
	onChange?: G.ChangeHandler<string>;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps & {
	/** Value of the input element, enables controlled mode */
	value: string | null;
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

export type Context = {
	onChange: RadioProps["onChange"];
	hasError?: boolean;
	disabled?: boolean;
	name: string;
	value?: string | null;
};
