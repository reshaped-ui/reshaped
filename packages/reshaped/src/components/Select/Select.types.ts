import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { DropdownMenuProps } from "@/components/DropdownMenu";
import type { IconProps } from "@/components/Icon";
import type { MenuItemProps } from "@/components/MenuItem";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

type RenderSingleValue = (args: { value: string }) => React.ReactNode;
type RenderMultipleValues = (args: { value: string[] }) => React.ReactNode;

// Use a single event type across Native and Custom Select variants so that
// inline `onChange` callbacks can be contextually typed consistently across
// overloads. Native fires a real `HTMLSelectElement` change event; Custom
// never emits an event (it's always `undefined` at runtime), but the type
// stays unified to avoid contravariant mismatches during overload resolution.
type SelectChangeHandler<Value> = G.ChangeHandler<Value, React.ChangeEvent<HTMLSelectElement>>;

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
	| "size"
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
	/** Position of the selected checkmark icon in custom options */
	selectedIconPosition?: "start" | "end";
	/** Show an error state, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Callback when the trigger is clicked */
	onClick?: ActionableProps["onClick"];
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Node for inserting children */
	children?: React.ReactNode;
};

export type CustomFragment = {
	/** Additional attributes for the native input element */
	inputAttributes?: Attributes<"input">;
} & Pick<DropdownMenuProps, "position" | "width" | "fallbackPositions" | "positionRef">;

export type NativeFragment = {
	/** Additional attributes for the input element */
	inputAttributes?: Attributes<"select">;
};

export type NativeControlledFragment = {
	value: string;
	defaultValue?: never;
	renderValue?: never;
	onChange?: SelectChangeHandler<string>;
};
export type NativeUncontrolledFragment = {
	value?: never;
	defaultValue?: string;
	renderValue?: never;
	onChange?: SelectChangeHandler<string>;
};

export type CustomControlledFragment =
	| {
			multiple?: false;
			value: string;
			defaultValue?: never;
			renderValue?: RenderSingleValue;
			onChange?: SelectChangeHandler<string>;
	  }
	| {
			multiple: true;
			value: string[];
			defaultValue?: never[];
			renderValue: RenderMultipleValues;
			onChange?: SelectChangeHandler<string[]>;
	  };
export type CustomUncontrolledFragment =
	| {
			multiple?: false;
			value?: never;
			defaultValue?: string;
			renderValue?: RenderSingleValue;
			onChange?: SelectChangeHandler<string>;
	  }
	| {
			multiple: true;
			value?: never[];
			defaultValue?: string[];
			renderValue: RenderMultipleValues;
			onChange?: SelectChangeHandler<string[]>;
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
	| "attributes"
	| "className"
	| "disabled"
	| "hasError"
	| "onClick"
	| "inputAttributes"
	| "startSlot"
	| "icon"
	| "size"
	| "variant"
	| "placeholder"
	| "value"
	| "name"
	| "id"
> & {
	children?: React.ReactNode;
	triggerAttributes?: ActionableProps["attributes"];
};

export type RootProps = Omit<Props, "children"> & {
	children: (props: Omit<Props, "children">) => React.ReactNode;
};
