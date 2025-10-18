import FormControl from "./FormControl";
import FormControlLabel from "./FormControlLabel";
import FormControlHelper from "./FormControlHelper";
import FormControlError from "./FormControlError";
import type * as T from "./FormControl.types";

const FormControlRoot = FormControl as React.FC<T.Props> & {
	Label: typeof FormControlLabel;
	Helper: typeof FormControlHelper;
	Error: typeof FormControlError;
};

FormControlRoot.Label = FormControlLabel;
FormControlRoot.Helper = FormControlHelper;
FormControlRoot.Error = FormControlError;

export default FormControlRoot;
export { useFormControl } from "./FormControl.context";
export type { Props as FormControlProps } from "./FormControl.types";
