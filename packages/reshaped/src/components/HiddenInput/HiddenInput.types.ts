import React from "react";

import type * as G from "types/global";

export type Props = {
	/** Name of the input element */
	name?: string;
	/** Value of the input element that is used for form submission */
	value?: string;
	/** Checked state of the input element, enables controlled mode */
	checked?: boolean;
	/** Default checked state of the input element, enables uncontrolled mode */
	defaultChecked?: boolean;
	/** Disable the input element */
	disabled?: boolean;
	/** Callback when the input value changes */
	onChange?: G.ChangeHandler<boolean>;
	/** Callback when the input or label is focused */
	onFocus?: (e: React.FocusEvent) => void;
	/** Callback when the input or label is blurred */
	onBlur?: (e: React.FocusEvent) => void;
	/** Type of the input element */
	type: "checkbox" | "radio";
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the input element */
	attributes?: G.Attributes<"input">;
};
