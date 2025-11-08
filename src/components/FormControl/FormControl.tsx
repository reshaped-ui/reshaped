"use client";

import React from "react";

import useElementId from "hooks/useElementId";

import { Provider } from "./FormControl.context";
import { getCaptionId } from "./FormControl.utilities";

import type * as T from "./FormControl.types";

const FormControl: React.FC<T.Props> = (props) => {
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

FormControl.displayName = "FormControl";

export default FormControl;
