import type React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { FormControlProps } from "@/components/FormControl";
import type { IconProps } from "@/components/Icon";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

export type BaseProps = {
	/** Id of the input element, generated automatically when not passed. Ignored when FormControl provides its own id */
	id?: string;
	/** Name of the text field input element */
	name: string;
	/** Component size
	 * @default "medium"
	 */
	size?: Size;
	/** Disable the text field user interaction and form submission, always true inside a disabled FormControl */
	disabled?: boolean;
	/** Render with the focus ring while the input is not focused, for example while a related dropdown is open */
	focused?: boolean;
	/** Let the slots and the input wrap onto multiple lines, for example when startSlot renders a list of selected values.
	 * The input itself stays single-line, use TextArea for multiline text
	 */
	multiline?: boolean;
	/** Change border radius to be fully rounded */
	rounded?: boolean;
	/** Placeholder text when there is no value */
	placeholder?: string;
	/** Icon of the text field at the start position, clicking it focuses the input. Use startSlot for interactive content */
	icon?: SlotProps["icon"];
	/** Icon of the text field at the end position, clicking it focuses the input. Use endSlot for interactive content */
	endIcon?: SlotProps["icon"];
	/** Node for inserting content before the text field value, rendered after the icon and before the prefix.
	 * Each item of an array or a fragment is rendered as a separate slot, so they can wrap when multiline is used
	 */
	startSlot?: SlotProps["slot"];
	/** Node for inserting content after the text field value, rendered last after the endIcon and the suffix.
	 * Use it for field actions like buttons
	 */
	endSlot?: SlotProps["slot"];
	/** Node for inserting text content before the text field value, separated from it with a divider, like a currency */
	prefix?: React.ReactNode;
	/** Node for inserting text content after the text field value, separated from it with a divider, like a unit */
	suffix?: React.ReactNode;
	/** Padding between the start edge of the field and the startSlot, base unit token number multiplier.
	 * Lower it for slots with their own background, like buttons. Has no effect when icon is also passed
	 * @default 2
	 */
	startSlotPadding?: number;
	/** Padding between the end edge of the field and the endSlot, base unit token number multiplier.
	 * Lower it for slots with their own background, like buttons
	 * @default 2
	 */
	endSlotPadding?: number;
	/** Component render variant. "faded" replaces the border with a faded background, "ghost" has no border and background
	 * but keeps the focus ring and the error outline, "headless" removes all of them for rendering inside custom layouts
	 * @default "outline"
	 */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Callback when the text field value changes, receives an object with name, value and event, not the native event */
	onChange?: G.ChangeHandler<string>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Additional attributes for the input element, like type, aria-label, onFocus or onBlur.
	 * Attributes controlled with the component props, like name, disabled or onChange, are ignored.
	 * Inside FormControl, its id and aria attributes take priority
	 */
	inputAttributes?: Attributes<"input">;
} & Pick<FormControlProps, "hasError">;

export type ControlledProps = BaseProps & {
	/** Value of the text field, enables controlled mode */
	value: string;
	/** Default value of the text field, enables uncontrolled mode */
	defaultValue?: never;
};
export type UncontrolledProps = BaseProps & {
	/** Value of the text field, enables controlled mode */
	value?: never;
	/** Default value of the text field, enables uncontrolled mode */
	defaultValue?: string;
};
export type Props = ControlledProps | UncontrolledProps;

export type SlotProps = {
	id: string;
	slot?: React.ReactNode;
	icon?: IconProps["svg"];
	size: Size;
	affix?: React.ReactNode;
	position: "start" | "end";
};
