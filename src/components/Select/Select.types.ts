import React from "react";

import { DropdownMenuProps } from "components/DropdownMenu";

import type { ActionableProps } from "components/Actionable";
import type { IconProps } from "components/Icon";
import type { MenuItemProps } from "components/MenuItem";
import type * as G from "types/global";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

type RenderSingleValue = (args: { value: string }) => React.ReactNode;
type RenderMultipleValues = (args: { value: string[] }) => React.ReactNode;

type NativeOption = {
	/** Option text label */
	label: string;
	/** Option value used in the form submission */
	value: string;
	/** Disable the option from the selection */
	disabled?: boolean;
};

export type OptionProps = Pick<
	MenuItemProps,
	| "attributes"
	| "children"
	| "className"
	| "disabled"
	| "endSlot"
	| "startSlot"
	| "icon"
	| "onClick"
> & {
	value: string;
};

export type GroupProps = {
	label?: string;
	children: React.ReactNode;
};

type BaseFragment = {
	id?: string;
	/** Name of the input element */
	name: string;
	/** Component size */
	size?: Size;
	/** Component render variant */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Disable the select user interaction and form submission */
	disabled?: boolean;
	/** Placeholder text when there is no value selected */
	placeholder?: string;
	/** Icon to display in the select start position */
	icon?: IconProps["svg"];
	/** Node for inserting content before the select value */
	startSlot?: React.ReactNode;
	/** Show an error state, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Callback when the trigger is clicked */
	onClick?: ActionableProps["onClick"];
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type CustomFragment = {
	/** Options for the select */
	options?: never;
	/** Callback when the input is focused */
	onFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	/** Callback when the input is blurred */
	onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
	// TODO: Replace / add trigger attributes in v4, currently they're passed to the Actionable component instead of the input to enable Flyout positioning
	/** Additional attributes for the trigger element */
	inputAttributes?: ActionableProps["attributes"];
} & Pick<DropdownMenuProps, "position" | "width" | "fallbackPositions" | "positionRef">;

export type NativeFragment = {
	/** Options for the select */
	/** @deprecated Use <option /> children instead */
	options?: NativeOption[];
	/** Callback when the input is focused */
	onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	/** Callback when the input is blurred */
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"select">;
};

export type NativeControlledFragment = {
	value: string;
	defaultValue?: never;
	renderValue?: never;
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLSelectElement>>;
};
export type NativeUncontrolledFragment = {
	value?: never;
	defaultValue?: string;
	renderValue?: never;
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLSelectElement>>;
};

export type CustomControlledFragment =
	| {
			multiple?: false;
			value: string;
			defaultValue?: never;
			renderValue?: RenderSingleValue;
			onChange?: G.ChangeHandler<string>;
	  }
	| {
			multiple: true;
			value: string[];
			defaultValue?: never[];
			renderValue?: RenderMultipleValues;
			onChange?: G.ChangeHandler<string[]>;
	  };
export type CustomUncontrolledFragment =
	| {
			multiple?: false;
			value?: never;
			defaultValue?: string;
			renderValue?: RenderSingleValue;
			onChange?: G.ChangeHandler<string>;
	  }
	| {
			multiple: true;
			value?: never[];
			defaultValue?: string[];
			renderValue?: RenderMultipleValues;
			onChange?: G.ChangeHandler<string[]>;
	  };

export type NativeControlledProps = BaseFragment & NativeFragment & NativeControlledFragment;
export type NativeUncontrolledProps = BaseFragment & NativeFragment & NativeUncontrolledFragment;
export type CustomControlledProps = BaseFragment & CustomFragment & CustomControlledFragment;
export type CustomUncontrolledProps = BaseFragment & CustomFragment & CustomUncontrolledFragment;

export type NativeProps = NativeControlledProps | NativeUncontrolledProps;
export type CustomProps = CustomControlledProps | CustomUncontrolledProps;

export type Props =
	| NativeControlledProps
	| NativeUncontrolledProps
	| CustomControlledProps
	| CustomUncontrolledProps;

export type TriggerProps = Pick<
	CustomControlledProps,
	| "disabled"
	| "onClick"
	| "onFocus"
	| "onBlur"
	| "inputAttributes"
	| "startSlot"
	| "icon"
	| "size"
	| "placeholder"
	| "value"
	| "name"
	| "id"
> & {
	children?: React.ReactNode;
};

export type RootProps = Omit<Props, "children"> & {
	children: (props: Omit<Props, "children">) => React.ReactNode;
};
