import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Name of the input element */
	name?: string;
	/** Disable the form field from the form submission */
	disabled?: boolean;
	/** Indicate that the form field has an error */
	hasError?: boolean;
	/** Value of the input element */
	value: string;
	/** Component size */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Callback when the input value changes */
	onChange?: G.ChangeHandler<boolean>;
	/** Callback when the input is focused */
	onFocus?: (e: React.FocusEvent) => void;
	/** Callback when the input is blurred */
	onBlur?: (e: React.FocusEvent) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"label">;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"input">;
};

export type ControlledProps = BaseProps & { checked: boolean; defaultChecked?: never };
export type UncontrolledProps = BaseProps & { checked?: never; defaultChecked?: boolean };
export type Props = ControlledProps | UncontrolledProps;
