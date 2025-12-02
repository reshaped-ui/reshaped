"use client";

import React from "react";

import Text from "components/Text";
import Theme from "components/Theme";
import { classNames } from "utilities/props";

import s from "./Slider.module.css";
import { getPrecision } from "./Slider.utilities";

import type * as T from "./Slider.types";

const SliderThumb = React.forwardRef<HTMLDivElement, T.ThumbProps>((props, ref) => {
	const {
		name,
		value,
		disabled,
		active,
		position,
		max,
		min,
		step,
		onChange,
		onDragStart,
		renderValue,
		tooltipRef,
		inputRef,
		orientation,
	} = props;
	const id = React.useId();
	const thumbClassNames = classNames(s.thumb, active && s["thumb--active"]);
	const precision = getPrecision(step);
	const tooltipValue = renderValue ? renderValue({ value }) : value.toFixed(precision);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(+e.target.value, { native: true });
	};

	return (
		<>
			<input
				className={s.input}
				type="range"
				name={name}
				value={value}
				onChange={handleChange}
				disabled={disabled}
				max={max}
				min={min}
				step={step}
				aria-labelledby={id}
				aria-orientation={orientation}
				ref={inputRef}
			/>
			<div
				ref={ref}
				className={thumbClassNames}
				onMouseDown={onDragStart}
				onTouchStart={onDragStart}
				style={{ "--ts-slider-thumb-position": `${position}%` } as React.CSSProperties}
				id={id}
				aria-hidden="true"
			>
				{renderValue !== false && (
					<Theme colorMode="inverted">
						<Text
							variant="caption-1"
							weight="medium"
							className={s.tooltip}
							attributes={{ ref: tooltipRef }}
						>
							{tooltipValue}
						</Text>
					</Theme>
				)}
			</div>
		</>
	);
});

SliderThumb.displayName = "SliderThumb";

export default SliderThumb;
