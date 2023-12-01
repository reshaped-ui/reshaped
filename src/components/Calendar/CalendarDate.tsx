import React from "react";
import Actionable from "components/Actionable";
import type * as T from "./Calendar.types";
import s from "./Calendar.module.css";

const CalendarDate = (props: T.DateProps) => {
	const { date, active, disabled, onClick } = props;
	const buttonClassNames = [s["date-button"], active && s["date-button--active"]];

	return (
		<td className={s.date}>
			{date && (
				<Actionable
					className={buttonClassNames}
					disabled={disabled}
					fullWidth
					onClick={onClick}
					insetFocus
				>
					{date.getDate()}
				</Actionable>
			)}
		</td>
	);
};

export default CalendarDate;
