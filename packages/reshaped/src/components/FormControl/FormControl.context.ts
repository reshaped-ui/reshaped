"use client";

import React from "react";

import type * as T from "./FormControl.types";

const FormControlContext = React.createContext({ attributes: {} } as T.Context);

export const Provider = FormControlContext.Provider;
export const useFormControlPrivate = () => React.useContext(FormControlContext);
export const useFormControl = () => {
	const { attributes, required, hasError, disabled } = useFormControlPrivate();

	return { attributes, required, hasError, disabled };
};
