"use client";

import { useElementId } from "@reshaped/headless";
import React from "react";

import { useFormControl } from "../FormControl";

import SelectCustom from "./SelectCustom";
import SelectNative from "./SelectNative";

import type * as T from "./Select.types";

const Select: React.FC<T.Props> = (passedProps) => {
	const formControl = useFormControl();
	const internalId = useElementId(passedProps.id);
	const props = {
		...passedProps,
		id: formControl?.attributes?.id || passedProps.inputAttributes?.id || internalId,
		disabled: formControl?.disabled || passedProps.disabled,
		hasError: formControl?.hasError || passedProps.hasError,
		inputAttributes: { ...passedProps.inputAttributes, ...formControl?.attributes },
	};
	const { children } = props;

	const hasNativeOptions = React.Children.toArray(children).some((child) => {
		return React.isValidElement(child) && (child.type === "option" || child.type === "optgroup");
	});

	if (hasNativeOptions) {
		return <SelectNative {...(props as T.NativeProps)}>{children}</SelectNative>;
	}

	return <SelectCustom {...(props as T.CustomProps)} />;
};

Select.displayName = "Select";

export default Select;
