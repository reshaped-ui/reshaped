"use client";

import React from "react";
import Actionable from "components/Actionable";
import { classNames } from "utilities/helpers";
import { getLocalISODate } from "./Calendar.utils";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarDate = (props: T.DateProps) => {
	const {
		date,
		startValue,
		endValue,
		isActiveStart,
		isActiveEnd,
		disabled,
		focusable,
		onChange,
		range,
		hoveredDate,
		onDateHover,
		onDateHoverEnd,
		renderAriaLabel,
	} = props;

	if (!date) return <td className={s.cell} aria-hidden="true" />;

	const inRange =
		startValue &&
		startValue < date &&
		((endValue && endValue > date) || (hoveredDate && !endValue && hoveredDate > date));
	const dateClassNames = classNames([
		s.cell,
		isActiveStart && s["cell--active-start"],
		(isActiveEnd ||
			(!endValue && isActiveStart && !(hoveredDate && startValue && hoveredDate > startValue))) &&
			s["cell--active-end"],
		inRange && s["cell--in-range"],
	]);

	const handleClick = () => {
		if (!range) {
			(onChange as T.SingleProps["onChange"])?.({ value: date });
			return;
		}

		const bothDatesSelected = startValue && endValue;
		const noneDatesSelected = !startValue && !endValue;
		const selectingBeforeStart = startValue && date < startValue;
		const selectingStart = bothDatesSelected || noneDatesSelected || selectingBeforeStart;
		const start = selectingStart ? date : startValue;
		const end = !selectingStart ? date : null;

		(onChange as T.RangeProps["onChange"])?.({ value: { start, end } });
	};

	const handleMouseEnter = () => {
		onDateHover(date);
	};

	const handleMouseLeave = () => {
		onDateHoverEnd(date);
	};

	return (
		<td className={dateClassNames} role={disabled ? "presentation" : "gridcell"}>
			<Actionable
				fullWidth
				insetFocus
				className={s["cell-button"]}
				disabled={disabled}
				onClick={handleClick}
				attributes={{
					role: "checkbox",
					tabIndex: focusable ? 0 : -1,
					"aria-hidden": disabled,
					"aria-label": renderAriaLabel
						? renderAriaLabel({ date })
						: date.toLocaleDateString("en-us", { month: "long", day: "numeric", weekday: "long" }),
					"aria-checked": isActiveStart || isActiveEnd,
					"data-rs-date": getLocalISODate({ date }),
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					onFocus: handleMouseEnter,
					onBlur: handleMouseLeave,
				}}
			>
				{date.getDate()}
			</Actionable>
		</td>
	);
};

export default CalendarDate;
