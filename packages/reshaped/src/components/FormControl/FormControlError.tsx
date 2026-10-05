"use client";

import { useFormControlPrivate } from "./FormControl.context.js";
import type * as T from "./FormControl.types.js";
import FormControlCaption from "./FormControlCaption.js";

const FormControlError: React.FC<T.CaptionProps> = (props) => {
	const { children } = props;
	const { hasError } = useFormControlPrivate();

	if (!hasError) return null;
	return <FormControlCaption variant="error">{children}</FormControlCaption>;
};

FormControlError.displayName = "FormControl.Error";

export default FormControlError;
