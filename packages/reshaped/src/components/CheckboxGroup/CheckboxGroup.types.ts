import type React from "react";

import type { CheckboxProps } from "@/components/Checkbox";
import type * as G from "@/types/global";

type BaseProps = {
	/** Component id attribute. Currently not applied, since the component renders no element of its own */
	id?: string;
	/** Node for inserting checkboxes or custom layout components. The component renders no element of its own, so checkboxes can be nested at any depth */
	children?: React.ReactNode;
	/** Show an error state for all checkboxes in the group, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Disable all checkboxes in the group */
	disabled?: boolean;
	/** Name attribute applied to all checkboxes in the group, replaces their own name */
	name: string;
	/** Callback when the component selection changes, `value` is an array of all selected checkbox values */
	onChange?: G.ChangeHandler<string[]>;
};

export type ControlledProps = BaseProps & {
	/** Values of the selected checkboxes, enables controlled mode */
	value: string[];
	/** Values of the checkboxes selected by default, enables uncontrolled mode */
	defaultValue?: never;
};

export type UncontrolledProps = BaseProps & {
	/** Values of the selected checkboxes, enables controlled mode */
	value?: never;
	/** Values of the checkboxes selected by default, enables uncontrolled mode */
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
