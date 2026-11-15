import type React from "react";

export type Props = {
	/** Node for inserting the form field together with FormControl.Label, FormControl.Helper and FormControl.Error */
	children: React.ReactNode;
	/** Size of the label and caption text, to be used together with the other form component sizes.
	 * It doesn't change the size of the field, set the field size on the field component itself
	 * @default "medium"
	 */
	size?: "medium" | "large";
	/** Custom gap between the field and the label and captions, base unit token number multiplier
	 * @default 1, or 1.5 when size is "large"
	 */
	gap?: number;
	/** Show an error state and mark the field as invalid. When set on FormControl, it applies to the form field
	 * rendered inside and displays FormControl.Error, which renders nothing otherwise
	 */
	hasError?: boolean;
	/** Show a required indicator in FormControl.Label and set aria-required on the field.
	 * It doesn't add the native required attribute, so the browser form validation is not triggered
	 */
	required?: boolean;
	/** Disable the form field rendered inside and apply disabled styles to the label and the helper.
	 * The field can't opt out by passing disabled={false} itself
	 */
	disabled?: boolean;
	/** Render as a fieldset with a legend when a single label is used for multiple form fields, like a RadioGroup.
	 * Fields inside a group don't receive the id and aria attributes, the captions describe the fieldset instead
	 */
	group?: boolean;
	/** Custom id for the form field element, the label and the captions use it as a prefix for their own ids.
	 * Generated automatically when not passed
	 */
	id?: string;
};

export type LabelProps = {
	/** Node for inserting the label text */
	children: React.ReactNode;
};

export type CaptionProps = {
	/** Node for inserting the caption text */
	children: React.ReactNode;
};

export type PrivateCaptionProps = CaptionProps & {
	variant?: "error";
	disabled?: boolean;
};

type Attributes = {
	[K in keyof React.HTMLAttributes<HTMLElement>]?: React.HTMLAttributes<HTMLElement>[K];
};

export type Context = {
	required?: boolean;
	group?: boolean;
	id: string;
	attributes: Attributes;
	helperRef: (el: HTMLElement | null) => void;
	errorRef: (el: HTMLElement | null) => void;
} & Pick<Props, "hasError" | "disabled" | "size">;
