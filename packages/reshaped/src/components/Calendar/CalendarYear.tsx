import React from "react";

import Actionable from "components/Actionable";
import { onNextFrame } from "utilities/animation";

import s from "./Calendar.module.css";
import { getMonthNames } from "./Calendar.utils";

import type * as T from "./Calendar.types";

const MONTHS_PER_ROW = 3;

const CalendarYear: React.FC<T.YearProps> = (props) => {
	const { renderMonthLabel, renderMonthAriaLabel, monthDate, min, max, onMonthClick } = props;
	const rootRef = React.useRef<HTMLTableElement>(null);
	const monthNames = getMonthNames({ renderMonthLabel });
	const rows = [];

	for (let i = 0; i < monthNames.length; i += MONTHS_PER_ROW) {
		const chunk = monthNames.slice(i, i + MONTHS_PER_ROW);
		rows.push(chunk);
	}

	React.useEffect(() => {
		const focusableEl = rootRef.current?.querySelector(
			'[tabIndex="0"]'
		) as HTMLButtonElement | null;

		// Waitinf for key press events to finish before focusing the month
		// To avoid it trigger the month click
		onNextFrame(() => {
			focusableEl?.focus();
		});
	}, []);

	return (
		<table ref={rootRef} role="grid" className={s.selection}>
			<tbody>
				{rows.map((row, i) => (
					<tr key={i} className={s.row}>
						{row.map((name, j) => {
							const monthIndex = i * MONTHS_PER_ROW + j;
							const date = new Date(monthDate.getFullYear(), monthIndex);
							const isOutsideMinBound =
								min && min.getFullYear() >= date.getFullYear() && min.getMonth() > date.getMonth();
							const isOutsideMaxBound =
								max && max.getFullYear() <= date.getFullYear() && max.getMonth() < date.getMonth();
							const disabled = isOutsideMaxBound || isOutsideMinBound;

							return (
								<td key={name} role={disabled ? "presentation" : "gridcell"} className={s.cell}>
									<Actionable
										fullWidth
										insetFocus
										className={s["cell-button"]}
										disabled={disabled}
										onClick={() => onMonthClick(monthIndex)}
										attributes={{
											tabIndex: monthIndex === monthDate.getMonth() ? 0 : -1,
											"aria-hidden": disabled,
											"aria-label": renderMonthAriaLabel
												? renderMonthAriaLabel({ month: monthIndex })
												: name,
											"data-rs-date": `${monthDate.getFullYear()}-${(monthIndex + 1)
												.toString()
												.padStart(2, "0")}`,
										}}
									>
										{name}
									</Actionable>
								</td>
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

CalendarYear.displayName = "CalendarYear";

export default CalendarYear;
