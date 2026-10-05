"use client";

import { useFormControlPrivate } from "./FormControl.context.js";
import type * as T from "./FormControl.types.js";
import FormControlCaption from "./FormControlCaption.js";

const FormControlHelper: React.FC<T.CaptionProps> = (props) => {
	const { children } = props;
	const { disabled } = useFormControlPrivate();

	return <FormControlCaption disabled={disabled}>{children}</FormControlCaption>;
};

FormControlHelper.displayName = "FormControl.Helper";

export default FormControlHelper;
