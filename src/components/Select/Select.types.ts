import React from "react";
import type * as G from "types/global";
import type { FormControlProps } from "components/FormControl";
import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

type Option = {
	/** Option text label */
	label: string;
	/** Option value used in the form submission */
	value: string;
	/** Disable the option from the selection */
	disabled?: boolean;
};

export type ButtonTriggerProps = {
	/** Callback when the button is clicked */
	onClick?: () => void;
	/** Node for inserting children */
	children?: React.ReactNode;
	/** Additional attributes for the input element */
	inputAttributes?: ActionableProps["attributes"];
	/** Callback when the input is focused */
	onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	/** Callback when the input is blurred */
	onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	/** Options for the select */
	options?: never;
	/** Callback when the input value changes */
	onChange?: never;
};

export type SelectTriggerProps = {
	/** Options for the select */
	options: Option[];
	/** Callback when the input value changes */
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLSelectElement>>;
	/** Callback when the input is focused */
	onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	/** Callback when the input is blurred */
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"select">;
	/** Callback when the button is clicked */
	onClick?: never;
	/** Node for inserting children */
	children?: never;
};

type BaseProps = ((ButtonTriggerProps | SelectTriggerProps) &
	Pick<FormControlProps, "hasError">) & {
	/** Unique identifier for the select */
	id?: string;
	/** Name of the input element */
	name: string;
	/** Component size */
	size?: Size;
	/** Component render variant */
	variant?: "outline" | "faded" | "headless";
	/** Disable the select user interaction and form submission */
	disabled?: boolean;
	/** Placeholder text when there is no value selected */
	placeholder?: string;
	/** Icon to display in the select start position */
	icon?: IconProps["svg"];
	/** Node for inserting content before the select value */
	startSlot?: React.ReactNode;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
};

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;
