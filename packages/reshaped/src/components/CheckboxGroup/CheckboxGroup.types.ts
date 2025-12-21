import type { CheckboxProps } from "components/Checkbox";
import type React from "react";
import type * as G from "types/global";

type BaseProps = {
	/** Component id attribute */
	id?: string;
	/** Node for inserting checkboxes or custom layout components */
	children?: React.ReactNode;
	/** Show an error state, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Disable the component from form submission */
	disabled?: boolean;
	/** Component name attribute */
	name: string;
	/** Callback when the component selection changes */
	onChange?: G.ChangeHandler<string[]>;
};

export type ControlledProps = BaseProps & {
	/** Component value, enables controlled mode */
	value: string[];
	/** Default value, enables uncontrolled mode */
	defaultValue?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Component value, enables uncontrolled mode */
	value?: never;
	/** Default value, enables uncontrolled mode */
	defaultValue?: string[];
};

export type Props = ControlledProps | UncontrolledProps;

export type Context = {
	onChange: CheckboxProps["onChange"];
	hasError?: boolean;
	disabled?: boolean;
	name: string;
	value?: string[];
};
