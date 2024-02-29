import FormControlClient from "./FormControl.client";
import FormControlLabel from "./FormControlLabel";
import FormControlError from "./FormControlError";
import FormControlHelper from "./FormControlHelper";
import type * as T from "./FormControl.types";

/**
 * Keeping the compound component composition inside a server component to make sure
 * frameworks like Next.js won't require use client to be added on the product side
 */

const FormControl = FormControlClient as React.ComponentType<T.Props> & {
	Label: React.ComponentType<T.LabelProps>;
	Helper: React.ComponentType<T.CaptionProps>;
	Error: React.ComponentType<T.CaptionProps>;
};

FormControl.Label = FormControlLabel;
FormControl.Helper = FormControlHelper;
FormControl.Error = FormControlError;

export default FormControl;
