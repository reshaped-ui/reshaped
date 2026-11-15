import React from "react";
import type { ClassName } from "@reshaped/utilities";

import type { FormControlProps } from "@/components/FormControl";
import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

type Size = G.Responsive<"medium" | "large" | "xlarge">;

type BaseProps = {
	/** Id of the textarea element, generated automatically when not passed. Ignored when FormControl provides its own id */
	id?: string;
	/** Name of the text area input element */
	name: string;
	/** Component size
	 * @default "medium"
	 */
	size?: Size;
	/** Component render variant. "faded" replaces the border with a faded background, "ghost" has no border and background
	 * but keeps the focus ring and the error outline, "headless" removes all of them for rendering inside custom layouts
	 * @default "outline"
	 */
	variant?: "outline" | "faded" | "ghost" | "headless";
	/** Disable the text area user interaction and form submission, always true inside a disabled FormControl */
	disabled?: boolean;
	/** Placeholder text when there is no value */
	placeholder?: string;
	/** Callback when the text area value changes, receives an object with name, value and event, not the native event */
	onChange?: G.ChangeHandler<string, React.ChangeEvent<HTMLTextAreaElement>>;
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the root element */
	attributes?: Attributes<"div">;
	/** Additional attributes for the textarea element, like aria-label, ref, onFocus, onBlur or rows, which is 3 by default.
	 * Attributes controlled with the component props, like name, disabled or onChange, are ignored.
	 * Inside FormControl, its id and aria attributes take priority
	 */
	inputAttributes?: Attributes<"textarea">;
	/** Resizing behavior, the text area can be resized vertically by the user when not passed.
	 * "none" removes the resize handle, "auto" also removes it and grows the height together with the value,
	 * never getting smaller than the rows attribute
	 */
	resize?: "none" | "auto";
} & Pick<FormControlProps, "hasError">;

export type ControlledProps = BaseProps & { value: string; defaultValue?: never };
export type UncontrolledProps = BaseProps & { value?: never; defaultValue?: string };
export type Props = ControlledProps | UncontrolledProps;
