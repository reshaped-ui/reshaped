"use client";

import React from "react";
import type * as T from "./CheckboxGroup.types";
import Context from "./CheckboxGroup.context";

const CheckboxGroupControlled = (props: T.ControlledProps) => {
	const { onChange, name, disabled, value, children, hasError } = props;

	const handleChange: T.Context["onChange"] = (args) => {
		const { event, value: fieldValue, checked } = args;
		if (!fieldValue) return;

		let nextValue = [...value];

		if (checked) {
			nextValue.push(fieldValue);
		} else {
			nextValue = nextValue.filter((v) => v !== fieldValue);
		}

		if (onChange) onChange({ name, value: nextValue, event });
	};

	return (
		<Context.Provider value={{ onChange: handleChange, disabled, value, name, hasError }}>
			{children}
		</Context.Provider>
	);
};

export default CheckboxGroupControlled;
