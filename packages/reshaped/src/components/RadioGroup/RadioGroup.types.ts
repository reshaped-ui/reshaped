import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { RadioProps } from "@/components/Radio";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type BaseProps = {
	/** Unique identifier for the radio group. Currently not applied, since the component renders no element of its own */
	id?: string;
	/** Node for inserting radios or custom layout components. The component renders no element of its own, so radios can be nested at any depth */
	children?: React.ReactNode;
	/** Disable all radios in the group */
	disabled?: boolean;
	/** Name attribute applied to all radios in the group, replaces their own name */
	name: string;
	/** Show an error state for all radios in the group, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Callback when the selection changes, `value` is the value of the selected radio */
	onChange?: G.ChangeHandler<string>;
	/** Additional classname for the root element. Currently not applied, since the component renders no element of its own */
	className?: ClassName;
	/** Additional attributes for the root element. Currently not applied, since the component renders no element of its own */
	attributes?: Attributes<"div">;
};

export type ControlledProps = BaseProps & {
	/** Value of the selected radio, enables controlled mode. Pass `null` when no radio is selected, since `undefined` switches the component to uncontrolled mode */
	value: string | null;
	/** Value of the radio selected by default, enables uncontrolled mode */
	defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Value of the selected radio, enables controlled mode */
	value?: never;
	/** Value of the radio selected by default, enables uncontrolled mode */
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
