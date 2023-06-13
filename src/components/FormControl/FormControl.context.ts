"use client";

import React from "react";
import type * as T from "./FormControl.types";

const FormControlContext = React.createContext<T.Context>({
	attributes: {
		id: "",
		"aria-describedby": "",
	},
	required: undefined,
	hasError: false,
	hasSuccess: false,
});

export const Provider = FormControlContext.Provider;
export const useFormControlPrivate = () => React.useContext(FormControlContext);
export const useFormControl = () => {
	const { attributes, required, hasError, hasSuccess, disabled } = useFormControlPrivate();

	return { attributes, required, hasError, hasSuccess, disabled };
};
