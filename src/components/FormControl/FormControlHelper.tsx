"use client";

import { useFormControlPrivate } from "./FormControl.context";
import FormControlCaption from "./FormControlCaption";
import type * as T from "./FormControl.types";

const FormControlHelper = (props: T.CaptionProps) => {
	const { children } = props;
	const { disabled } = useFormControlPrivate();

	return <FormControlCaption disabled={disabled}>{children}</FormControlCaption>;
};

export default FormControlHelper;
