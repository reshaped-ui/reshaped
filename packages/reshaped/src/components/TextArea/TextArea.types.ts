import React from "react";

import { type FormControlProps } from "components/FormControl";

import type * as G from "types/global";

type Size = G.Responsive<"medium" | "large" | "xlarge">;

type BaseProps = {
	/** Unique identifier for the text area */
	id?: string;
	/** Name of the text area input element */
	name: string;
	/** Component size
	 * @default "medium"
	 */
	size?: Size;
	/** Component render variant
	 * @default "outline"
	 */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Disable the text area user interaction */
	disabled?: boolean;
	/** Placeholder text when there is no value */
	placeholder?: string;
	/** Callback when the text area value changes */
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLTextAreaElement>>;
	/** Callback when the text area is focused */
	onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	/** Callback when the text area is blurred */
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	/** Additional classname for the root element */
	className?: G.ClassName;
	/** Additional attributes for the root element */
	attributes?: G.Attributes<"div">;
	/** Additional attributes for the input element */
	inputAttributes?: G.Attributes<"textarea">;
	/** Enable or disable the text area resizing, supports auto-sizing */
	resize?: "none" | "auto";
} & Pick<FormControlProps, "hasError">;

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;
