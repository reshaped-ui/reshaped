"use client";

import React from "react";
import CalendarControlled from "./CalendarControlled";
import type * as T from "./Calendar.types";

const CalendarUncontrolled = (props: T.UncontrolledProps & T.BaseProps) => {
	const { onChange, defaultValue, ...controlledProps } = props;
	const [value, setValue] = React.useState(defaultValue || null);

	const handleChange: T.ControlledProps["onChange"] = (args) => {
		setValue(args.value);
		onChange?.(args);
	};

	return <CalendarControlled {...controlledProps} value={value} onChange={handleChange} />;
};

export default CalendarUncontrolled;
