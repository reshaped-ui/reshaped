"use client";

import React from "react";
import useElementId from "hooks/useElementId";
import { Provider } from "./FormControl.context";
import { getCaptionId } from "./FormControl.utilities";
import type * as T from "./FormControl.types";
import FormControlLabel from "./FormControlLabel";
import FormControlHelper from "./FormControlHelper";
import FormControlError from "./FormControlError";

const FormControl: React.FC<T.Props> & {
	Label: typeof FormControlLabel;
	Helper: typeof FormControlHelper;
	Error: typeof FormControlError;
} = (props) => {
	const { children, id: passedId, required, hasError, group, disabled, size } = props;
	const id = useElementId(passedId);
	const WrapperTagName = group ? "fieldset" : "div";
	const [helperRendered, setHelperRendered] = React.useState(false);
	const [errorRendered, setErrorRendered] = React.useState(false);
	const describedby = [
		helperRendered && getCaptionId(id),
		errorRendered && getCaptionId(id, "error"),
	]
		.filter(Boolean)
		.join(" ");
	const attributes = { id, "aria-describedby": describedby };

	const errorRef = () => {
		setErrorRendered(true);
	};

	const helperRef = () => {
		setHelperRendered(true);
	};

	return (
		<WrapperTagName>
			<Provider
				value={{ required, hasError, errorRef, helperRef, attributes, group, disabled, size }}
			>
				{children}
			</Provider>
		</WrapperTagName>
	);
};

FormControl.Label = FormControlLabel;
FormControl.Helper = FormControlHelper;
FormControl.Error = FormControlError;
FormControl.displayName = "FormControl";

export default FormControl;
