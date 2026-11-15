import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { ActionableProps } from "@/components/Actionable";
import type { DropdownMenuProps } from "@/components/DropdownMenu";
import type { FlyoutTriggerAttributes } from "@/components/Flyout";
import type { IconProps } from "@/components/Icon";
import type { MenuItemProps } from "@/components/MenuItem";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

type RenderSingleValue = (args: { value: string }) => React.ReactNode;
type RenderMultipleValues = (args: { value: string[] }) => React.ReactNode;

/**
 * Attributes passed to the renderTrigger function, they have to be applied
 * to the custom trigger element for it to control the dropdown
 */
export type TriggerRenderAttributes = Omit<FlyoutTriggerAttributes, "onClick"> & {
	// Widened from the Flyout signature since we also pass the Select onClick event through it
	onClick?: ActionableProps["onClick"];
	/** Currently selected value, falls back to the placeholder when there is no selection */
	children?: React.ReactNode;
};

type TriggerRenderState = {
	/** Indicates that the dropdown is currently displayed */
	active: boolean;
	/** Indicates that the select is disabled, either with its own property or by FormControl */
	disabled?: boolean;
	/** Indicates that the select has an error, either with its own property or by FormControl */
	hasError?: boolean;
};

type RenderSingleTrigger = (
	attributes: TriggerRenderAttributes,
	props: TriggerRenderState & { value: string }
) => React.ReactNode;

type RenderMultipleTrigger = (
	attributes: TriggerRenderAttributes,
	props: TriggerRenderState & { value: string[] }
) => React.ReactNode;

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
	/** Value of the option, passed to onChange and used as the select value when the option is selected */
	value: string;
};

export type GroupProps = {
	/** Text label displayed above the options of the group */
	label?: string;
	/** Node for inserting the Select.Option components of the group */
	children: React.ReactNode;
};

type BaseFragment = {
	/** Id of the select element when using native options, or of the hidden input holding the value otherwise.
	 * Generated automatically when not passed. Ignored when FormControl provides its own id
	 */
	id?: string;
	/** Name of the input element */
	name: string;
	/** Component size, also applied to the Select.Option components
	 * @default "medium"
	 */
	size?: Size;
	/** Component render variant. "faded" replaces the border with a faded background, "ghost" has no border and background
	 * but keeps the focus ring and the error outline, "headless" removes all of them for rendering inside custom layouts
	 * @default "outline"
	 */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Disable the select user interaction and form submission, always true inside a disabled FormControl */
	disabled?: boolean;
	/** Placeholder text when there is no value selected, with native options it's rendered as an option with an empty value.
	 * Without a placeholder and a value, Select.Option based select displays its first option while the value stays empty
	 */
	placeholder?: string;
	/** Icon to display in the select start position, startSlot is not rendered when the icon is passed */
	icon?: IconProps["svg"];
	/** Node for inserting content before the select value, not rendered when the icon is passed */
	startSlot?: React.ReactNode;
	/** Position of the selected checkmark icon in Select.Option components.
	 * Options that pass their own startSlot or endSlot render it instead of the checkmark on that side
	 * @default "start"
	 */
	selectedIconPosition?: "start" | "end";
	/** Show an error state, automatically inherited when component is used inside FormControl */
	hasError?: boolean;
	/** Callback when the trigger is clicked */
	onClick?: ActionableProps["onClick"];
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Options of the select. Pass Select.Option and Select.Group components to render a custom dropdown,
	 * or native option and optgroup elements as direct children to render a native select
	 */
	children?: React.ReactNode;
};

export type CustomFragment = {
	/** Additional attributes for the hidden input element holding the value for the form submission.
	 * They are not applied to the trigger button, so an aria-label passed here doesn't label the select
	 */
	inputAttributes?: Attributes<"input">;
} & Pick<DropdownMenuProps, "position" | "width" | "fallbackPositions" | "positionRef">;

export type NativeFragment = {
	/** Additional attributes for the select element, like aria-label, ref, onFocus or onBlur */
	inputAttributes?: Attributes<"select">;
};

export type NativeControlledFragment = {
	/** Value of the selected option, enables controlled mode */
	value: string;
	/** Default value of the selected option, enables uncontrolled mode */
	defaultValue?: never;
	/** Not supported with native option elements, only with Select.Option components */
	renderValue?: never;
	/** Not supported with native option elements, only with Select.Option components */
	renderTrigger?: never;
	/** Callback when the selected value changes, receives an object with name, value and the native change event.
	 * Value is an empty string when the placeholder option is selected
	 */
	onChange?: SelectChangeHandler<string>;
};
export type NativeUncontrolledFragment = {
	/** Value of the selected option, enables controlled mode */
	value?: never;
	/** Default value of the selected option, enables uncontrolled mode */
	defaultValue?: string;
	/** Not supported with native option elements, only with Select.Option components */
	renderValue?: never;
	/** Not supported with native option elements, only with Select.Option components */
	renderTrigger?: never;
	/** Callback when the selected value changes, receives an object with name, value and the native change event.
	 * Value is an empty string when the placeholder option is selected
	 */
	onChange?: SelectChangeHandler<string>;
};

export type CustomControlledFragment =
	| {
			/** Enable selection of multiple options, only supported with Select.Option components.
			 * It changes the value to an array, requires renderValue and keeps the dropdown open after an option is selected.
			 * The value is submitted with the form as a JSON string of the array
			 */
			multiple?: false;
			/** Value of the selected option, enables controlled mode */
			value: string;
			/** Default value of the selected option, enables uncontrolled mode */
			defaultValue?: never;
			/** Render function for the selected value displayed in the trigger, replaces the selected option children
			 * displayed by default. The placeholder is displayed when it returns an empty value
			 */
			renderValue?: RenderSingleValue;
			/** Render function for a custom trigger replacing the default one. Apply the attributes from the first argument
			 * to the trigger element and render attributes.children to display the selected value or the placeholder.
			 * variant, icon, startSlot, className and attributes are not applied to the custom trigger
			 */
			renderTrigger?: RenderSingleTrigger;
			/** Callback when the selected value changes, receives an object with name and value.
			 * Event is not available since Select.Option components don't trigger a native change event
			 */
			onChange?: SelectChangeHandler<string>;
	  }
	| {
			/** Enable selection of multiple options, only supported with Select.Option components.
			 * It changes the value to an array, requires renderValue and keeps the dropdown open after an option is selected.
			 * The value is submitted with the form as a JSON string of the array
			 */
			multiple: true;
			/** Values of the selected options, enables controlled mode */
			value: string[];
			/** Default values of the selected options, enables uncontrolled mode */
			defaultValue?: never[];
			/** Render function for the selected values displayed in the trigger, required for the multiple selection.
			 * The placeholder is displayed when it returns an empty value, like an empty string for an empty array
			 */
			renderValue: RenderMultipleValues;
			/** Render function for a custom trigger replacing the default one. Apply the attributes from the first argument
			 * to the trigger element and render attributes.children to display the selected value or the placeholder.
			 * variant, icon, startSlot, className and attributes are not applied to the custom trigger
			 */
			renderTrigger?: RenderMultipleTrigger;
			/** Callback when the selected value changes, receives an object with name and value.
			 * Event is not available since Select.Option components don't trigger a native change event
			 */
			onChange?: SelectChangeHandler<string[]>;
	  };
export type CustomUncontrolledFragment =
	| {
			/** Enable selection of multiple options, only supported with Select.Option components.
			 * It changes the value to an array, requires renderValue and keeps the dropdown open after an option is selected.
			 * The value is submitted with the form as a JSON string of the array
			 */
			multiple?: false;
			/** Value of the selected option, enables controlled mode */
			value?: never;
			/** Default value of the selected option, enables uncontrolled mode */
			defaultValue?: string;
			/** Render function for the selected value displayed in the trigger, replaces the selected option children
			 * displayed by default. The placeholder is displayed when it returns an empty value
			 */
			renderValue?: RenderSingleValue;
			/** Render function for a custom trigger replacing the default one. Apply the attributes from the first argument
			 * to the trigger element and render attributes.children to display the selected value or the placeholder.
			 * variant, icon, startSlot, className and attributes are not applied to the custom trigger
			 */
			renderTrigger?: RenderSingleTrigger;
			/** Callback when the selected value changes, receives an object with name and value.
			 * Event is not available since Select.Option components don't trigger a native change event
			 */
			onChange?: SelectChangeHandler<string>;
	  }
	| {
			/** Enable selection of multiple options, only supported with Select.Option components.
			 * It changes the value to an array, requires renderValue and keeps the dropdown open after an option is selected.
			 * The value is submitted with the form as a JSON string of the array
			 */
			multiple: true;
			/** Values of the selected options, enables controlled mode */
			value?: never[];
			/** Default values of the selected options, enables uncontrolled mode */
			defaultValue?: string[];
			/** Render function for the selected values displayed in the trigger, required for the multiple selection.
			 * The placeholder is displayed when it returns an empty value, like an empty string for an empty array
			 */
			renderValue: RenderMultipleValues;
			/** Render function for a custom trigger replacing the default one. Apply the attributes from the first argument
			 * to the trigger element and render attributes.children to display the selected value or the placeholder.
			 * variant, icon, startSlot, className and attributes are not applied to the custom trigger
			 */
			renderTrigger?: RenderMultipleTrigger;
			/** Callback when the selected value changes, receives an object with name and value.
			 * Event is not available since Select.Option components don't trigger a native change event
			 */
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
	/** Node for displaying the selected value, the placeholder is displayed when it's empty */
	children?: React.ReactNode;
	/** Additional attributes for the trigger button element, like aria-label or the attributes of a flyout trigger */
	triggerAttributes?: ActionableProps["attributes"];
};

export type HiddenInputProps = Pick<TriggerProps, "value" | "name" | "id" | "inputAttributes">;
