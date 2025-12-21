import React from "react";

import { classNames } from "utilities/props";

import s from "./Progress.module.css";

import type * as T from "./Progress.types";

const Progress: React.FC<T.Props> = (props) => {
	const {
		value = 0,
		min = 0,
		max = 100,
		color = "primary",
		size = "medium",
		duration,
		ariaLabel,
		className,
		attributes,
	} = props;
	const rootClassNames = classNames(
		s.root,
		className,
		color && s[`--color-${color}`],
		size && s[`--size-${size}`],
		!!duration && s["--duration"]
	);
	const total = max - min;
	const normalizedValue = value - min;
	const resolvedValue = Math.max(min, Math.min(max, normalizedValue));
	const width = (resolvedValue / total) * 100;
	const translate = `${width - 100}%`;

	return (
		<div
			role="progressbar"
			{...attributes}
			className={rootClassNames}
			aria-label={ariaLabel || attributes?.["aria-label"]}
			aria-valuemax={max}
			aria-valuemin={min}
			aria-valuenow={value}
		>
			<div
				className={s.value}
				style={
					{
						"--rs-progress-value": translate,
						"--rs-progress-duration": duration ? `${duration}ms` : undefined,
					} as React.CSSProperties
				}
			/>
		</div>
	);
};

Progress.displayName = "Progress";

export default Progress;
