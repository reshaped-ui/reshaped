"use client";

import React from "react";

import SliderControlled from "./SliderControlled";

import type * as T from "./Slider.types";

const normalizeValue = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const SliderUncontrolled: React.FC<T.UncontrolledProps & T.DefaultProps> = (props) => {
	const { min, max, onChange, range } = props;
	const defaultMinValue =
		("defaultMinValue" in props && props.defaultMinValue !== undefined && props.defaultMinValue) ||
		("defaultValue" in props && props.defaultValue !== undefined && props.defaultValue) ||
		min;
	const defaultMaxValue =
		("defaultMaxValue" in props && props.defaultMaxValue !== undefined && props.defaultMaxValue) ||
		("defaultValue" in props && props.defaultValue !== undefined && props.defaultValue) ||
		(range ? max : min);
	const [minValue, setMinValue] = React.useState(normalizeValue(defaultMinValue, min, max));
	const [maxValue, setMaxValue] = React.useState(normalizeValue(defaultMaxValue, min, max));

	const handleSingleChange = (args: T.SingleChangeArgs) => {
		if (range) return;

		setMaxValue(args.value);
		onChange?.(args);
	};

	const handleRangeChange = (args: T.RangeChangeArgs) => {
		if (!range) return;

		setMinValue(args.minValue);
		setMaxValue(args.maxValue);
		onChange?.(args);
	};

	if (range) {
		return (
			<SliderControlled
				{...props}
				min={min}
				max={max}
				minValue={minValue}
				maxValue={maxValue}
				defaultMinValue={undefined}
				defaultMaxValue={undefined}
				onChange={handleRangeChange}
			/>
		);
	}

	return (
		<SliderControlled
			{...props}
			min={min}
			max={max}
			value={maxValue}
			defaultValue={undefined}
			onChange={handleSingleChange}
		/>
	);
};

SliderUncontrolled.displayName = "SliderUncontrolled";

export default SliderUncontrolled;
