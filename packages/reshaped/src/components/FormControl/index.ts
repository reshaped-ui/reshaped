import FormControl from "./FormControl.js";
import FormControlError from "./FormControlError.js";
import FormControlHelper from "./FormControlHelper.js";
import FormControlLabel from "./FormControlLabel.js";

const FormControlRoot = FormControl as typeof FormControl & {
	Label: typeof FormControlLabel;
	Helper: typeof FormControlHelper;
	Error: typeof FormControlError;
};

FormControlRoot.Label = FormControlLabel;
FormControlRoot.Helper = FormControlHelper;
FormControlRoot.Error = FormControlError;

export default FormControlRoot;
export { useFormControl } from "./FormControl.context.js";
export type { Props as FormControlProps } from "./FormControl.types.js";
