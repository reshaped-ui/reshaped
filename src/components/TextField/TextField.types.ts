import type { FormControlProps } from "components/FormControl";
import type { IconProps } from "components/Icon";
import type React from "react";
import type * as G from "types/global";

type Size = G.Responsive<"small" | "medium" | "large" | "xlarge">;

export type BaseProps = {
	/** Unique identifier for the text field */
	id?: string;
	/** Name of the text field input element */
	name: string;
	/** Component size
	 * @default "medium"
	 */
	size?: Size;
	/** Disable the text field user interaction */
	disabled?: boolean;
	/** Render in the focused state */
	focused?: boolean;
	/** Enable multiline text field wrapping */
	multiline?: boolean;
	/** Change border radius to be fully rounded */
	rounded?: boolean;
	/** Placeholder text when there is no value */
	placeholder?: string;
	/** Icon of the text field at the start position */
	icon?: SlotProps["icon"];
	/** Icon of the text field at the end position */
	endIcon?: SlotProps["icon"];
	/** Node for inserting content before the text field value */
	startSlot?: SlotProps["slot"];
	/** Node for inserting content after the text field value */
	endSlot?: SlotProps["slot"];
	/** Node for inserting text content before the text field value */
	prefix?: React.ReactNode;
	/** Node for inserting text content after the text field value */
	suffix?: React.ReactNode;
	/** Padding inline end, base unit token number multiplier */
	startSlotPadding?: number;
	/** Padding inline start, base unit token number multiplier */
	endSlotPadding?: number;
	/** Component render variant
	 * @default "outline"
	 */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Callback when the text field value changes */
	onChange?: G.ChangeHandler<string>;
	/** Callback when the text field is focused */
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	/** Callback when the text field is blurred */
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"input">;
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
