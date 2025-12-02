"use client";

import React from "react";

import { classNames } from "utilities/props";

import s from "./ProgressIndicator.module.css";

import type * as T from "./ProgressIndicator.types";

const VISIBLE_ITEMS = 7;
const HALF_ITEMS = Math.floor(VISIBLE_ITEMS / 2);

const ProgressIndicator: React.FC<T.Props> = (props) => {
	const { total, activeIndex = 0, color = "primary", ariaLabel, className, attributes } = props;
	const rootClassName = classNames(s.root, className, color && s[`--color-${color}`]);
	const barAttributes = ariaLabel
		? {
				"aria-label": ariaLabel,
				role: "progressbar",
				"aria-valuenow": activeIndex,
				"aria-valuemin": 0,
				"aria-valuemax": total - 1,
			}
		: {};

	const transformIndex =
		total > VISIBLE_ITEMS
			? Math.min(total - VISIBLE_ITEMS, Math.max(0, activeIndex - HALF_ITEMS))
			: 0;

	return (
		<div {...attributes} className={rootClassName}>
			<div
				{...barAttributes}
				className={s.container}
				style={
					{
						"--rs-progress-indicator-mod": transformIndex,
					} as React.CSSProperties
				}
			>
				{Array.from({ length: total }).map((_, i) => {
					const itemClassName = classNames(
						s.item,
						i === activeIndex && s["item--active"],
						(i < activeIndex - (HALF_ITEMS - 1) || i > activeIndex + (HALF_ITEMS - 1)) &&
							s["item--variant-secondary"]
					);

					return <div className={itemClassName} key={i} />;
				})}
			</div>
		</div>
	);
};

ProgressIndicator.displayName = "ProgressIndicator";

export default ProgressIndicator;
