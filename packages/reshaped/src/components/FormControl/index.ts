import FormControl from "./FormControl";
import FormControlError from "./FormControlError";
import FormControlHelper from "./FormControlHelper";
import FormControlLabel from "./FormControlLabel";

const FormControlRoot = FormControl as typeof FormControl & {
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
