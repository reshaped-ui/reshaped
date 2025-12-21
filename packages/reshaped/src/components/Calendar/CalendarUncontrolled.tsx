"use client";

import React from "react";

import CalendarControlled from "./CalendarControlled";

import type * as T from "./Calendar.types";

const CalendarUncontrolled: React.FC<T.UncontrolledProps & T.BaseProps> = (props) => {
	const { onChange, defaultValue, range, ...controlledProps } = props;
	const [value, setValue] = React.useState(defaultValue || null);

	if (range) {
		return (
			<CalendarControlled
				range
				{...controlledProps}
				value={value as T.ControlledRangeProps["value"]}
				onChange={(args) => {
					setValue(args.value);
					onChange?.(args);
				}}
			/>
		);
	}

	return (
		<CalendarControlled
			{...controlledProps}
			value={value as T.ControlledSingleProps["value"]}
			onChange={(args) => {
				setValue(args.value);
				onChange?.(args);
			}}
		/>
	);
};

CalendarUncontrolled.displayName = "CalendarUncontrolled";

export default CalendarUncontrolled;
