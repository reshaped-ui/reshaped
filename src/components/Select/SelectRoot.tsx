"use client";

import React from "react";
import useElementId from "hooks/useElementId";
import { useFormControl } from "components/FormControl";
import { classNames, responsiveClassNames } from "utilities/props";
import type * as T from "./Select.types";
import s from "./Select.module.css";

const SelectRoot: React.FC<T.RootProps> = (passedProps) => {
	const formControl = useFormControl();
	const internalId = useElementId(passedProps.id);
	const props = {
		...passedProps,
		id: formControl?.attributes?.id || passedProps.inputAttributes?.id || internalId,
		disabled: formControl?.disabled || passedProps.disabled,
		hasError: formControl?.hasError || passedProps.hasError,
		inputAttributes: { ...passedProps.inputAttributes, ...formControl?.attributes },
	} as T.RootProps;
	const {
		children,
		className,
		size = "medium",
		variant = "outline",
		hasError,
		disabled,
		attributes,
	} = props;

	const rootClassName = classNames(
		s.root,
		className,
		size && responsiveClassNames(s, "--size", size),
		hasError && s["--status-error"],
		disabled && s["--disabled"],
		variant && s[`--variant-${variant}`]
	);

	return (
		<div {...attributes} className={rootClassName}>
			{children(props)}
		</div>
	);
};

export default SelectRoot;
