"use client";

import React from "react";
import { classNames } from "@reshaped/utilities";

import useElementId from "@/hooks/useElementId";
import { Provider } from "./FormControl.context";
import type * as T from "./FormControl.types";
import { getCaptionId } from "./FormControl.utilities";
import s from "./FormControl.module.css";

const FormControl: React.FC<T.Props> = (props) => {
	const { children, id: passedId, required, hasError, group, disabled, size, gap } = props;
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
	// Group fields are labelled and described by the fieldset, so they don't receive the attributes
	const attributes = group
		? {}
		: {
				id,
				"aria-describedby": describedby || undefined,
				"aria-invalid": hasError || undefined,
				"aria-required": required || undefined,
			};

	// Stable refs, so they're only called when the captions mount and unmount
	const errorRef = React.useCallback((el: HTMLElement | null) => {
		setErrorRendered(!!el);
	}, []);

	const helperRef = React.useCallback((el: HTMLElement | null) => {
		setHelperRendered(!!el);
	}, []);

	return (
		<WrapperTagName
			aria-describedby={group ? describedby || undefined : undefined}
			className={classNames(s.root, size && s["--size-large"])}
			style={{ "--rs-form-control-gap": gap } as React.CSSProperties}
		>
			<Provider
				value={{ id, required, hasError, errorRef, helperRef, attributes, group, disabled, size }}
			>
				{children}
			</Provider>
		</WrapperTagName>
	);
};

FormControl.displayName = "FormControl";

export default FormControl;
