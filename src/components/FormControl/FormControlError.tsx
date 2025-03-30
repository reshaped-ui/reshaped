"use client";

import { useFormControlPrivate } from "./FormControl.context";
import FormControlCaption from "./FormControlCaption";
import type * as T from "./FormControl.types";

const FormControlError = (props: T.CaptionProps) => {
	const { children } = props;
	const { hasError } = useFormControlPrivate();

	if (!hasError) return null;
	return <FormControlCaption variant="error">{children}</FormControlCaption>;
};

FormControlError.displayName = "FormControl.Error";

export default FormControlError;
