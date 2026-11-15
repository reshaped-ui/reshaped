import type { ClassName } from "@reshaped/utilities";

import type * as G from "@/types/global";
import type { Attributes } from "@/types/global";

export type Props = {
	/** Name of the input element, ignored inside CheckboxGroup or RadioGroup, which pass their own name */
	name?: string;
	/** Value of the input element that is used for form submission.
	 * Required inside CheckboxGroup or RadioGroup, where it's compared with the group value to resolve the checked state
	 */
	value?: string;
	/** Checked state of the input element, enables controlled mode.
	 * Not needed inside CheckboxGroup or RadioGroup, where the checked state is resolved from the group value
	 */
	checked?: boolean;
	/** Default checked state of the input element, enables uncontrolled mode. Ignored inside CheckboxGroup */
	defaultChecked?: boolean;
	/** Disable the input element, always true inside a disabled FormControl, CheckboxGroup or RadioGroup */
	disabled?: boolean;
	/** Callback when the checked state changes, receives an object with name, value, checked and event.
	 * Inside CheckboxGroup or RadioGroup, it's called before the group onChange
	 */
	onChange?: G.ChangeHandler<boolean>;
	/** Type of the input element */
	type: "checkbox" | "radio";
	/** Additional classname for the root element */
	className?: ClassName;
	/** Additional attributes for the input element */
	attributes?: Attributes<"input">;
};
