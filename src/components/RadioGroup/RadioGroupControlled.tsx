"use client";

import React from "react";
import type * as TRadio from "components/Radio/Radio.types";
import Context from "./RadioGroup.context";
import type * as T from "./RadioGroup.types";

const RadioGroupControlled = (props: T.ControlledProps) => {
	const { onChange, name, disabled, value, children, hasError } = props;

	const handleChange: TRadio.Props["onChange"] = ({ event, value }) => {
		if (!value) return;
		if (onChange) onChange({ name, value, event });
	};

	return (
		<Context.Provider value={{ onChange: handleChange, disabled, value, name, hasError }}>
			{children}
		</Context.Provider>
	);
};

export default RadioGroupControlled;
