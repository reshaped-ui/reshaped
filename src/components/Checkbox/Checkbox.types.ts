import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	/** Node for inserting the label */
	children?: React.ReactNode;
	/** Component name attribute */
	name?: string;
	/** Disable the component */
	disabled?: boolean;
	/** Show an error state, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Component value used for form submission */
	value?: string;
	/** Show a indeterminate state, used for "select all" checkboxes with some of the individual checkboxes selected */
	indeterminate?: boolean;
	/** Component size
	 * @default "medium"
	 */
	size?: G.Responsive<"small" | "medium" | "large">;
	/** Callback when the component selection changes */
	onChange?: G.ChangeHandler<boolean>;
	/** Callback when the component is focused */
	onFocus?: (e: React.FocusEvent) => void;
	/** Callback when the component is blurred */
	onBlur?: (e: React.FocusEvent) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"label">;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"input">;
};

export type ControlledProps = BaseProps & {
	/** Component checked state, enables controlled mode */
	checked: boolean;
	/** Default checked state, enables uncontrolled mode */
	defaultChecked?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Component checked state, enables controlled mode */
	checked?: never;
	/** Default checked state, enables uncontrolled mode */
	defaultChecked?: boolean;
};

export type Props = ControlledProps | UncontrolledProps;
