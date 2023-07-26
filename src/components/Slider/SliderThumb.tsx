"use client";

import React from "react";
import { classNames } from "utilities/helpers";
import Theme from "components/Theme";
import Text from "components/Text";
import type * as T from "./Slider.types";
import s from "./Slider.module.css";

const SliderThumb = (props: T.ThumbProps, ref: React.Ref<HTMLDivElement>) => {
	const { name, value, disabled, active, position, max, min, onChange, onDragStart, renderValue } =
		props;
	const id = React.useId();
	const thumbClassNames = classNames(s.thumb, active && s["thumb--active"]);
	const tooltipValue = renderValue ? renderValue({ value }) : value;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(+e.target.value);
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
				aria-labelledby={id}
			/>
			<div
				ref={ref}
				className={thumbClassNames}
				onMouseDown={onDragStart}
				onTouchStart={onDragStart}
				style={{ insetInlineStart: `${position}%` }}
				id={id}
				aria-hidden="true"
			>
				<Theme className={s.tooltip} colorMode="inverted">
					<Text variant="caption-1" weight="medium">
						{tooltipValue}
					</Text>
				</Theme>
			</div>
		</>
	);
};

export default React.forwardRef(SliderThumb);
