import React from "react";

import * as keys from "constants/keys";
import useHotkeys from "hooks/useHotkeys";

import { getFocusableDates } from "./Calendar.utils";

const useCalendarKeyboardNavigation = (props: {
	monthDate: Date;
	rootRef: React.RefObject<HTMLDivElement | null>;
	changeToNextMonth: () => void;
	changeToPreviousMonth: () => void;
	verticalDelta: number;
	min?: Date;
	max?: Date;
}) => {
	const { rootRef, changeToNextMonth, changeToPreviousMonth, monthDate, verticalDelta, min, max } =
		props;
	const overflowCountRef = React.useRef(0);

	const focusDate = React.useCallback(
		(args: { delta: number; onMonthChange: () => void }) => {
			const { delta, onMonthChange } = args;
			const focusedEl = document.activeElement;

			if (!focusedEl) return;

			const focusable = getFocusableDates(rootRef.current);
			const focusableArr = Array.from(focusable) as HTMLButtonElement[];
			const currentIndex = focusableArr.findIndex((el) => el === focusedEl);
			const nextIndex = currentIndex + delta;
			const nextEl = focusableArr[nextIndex];
			const currentDateString = focusedEl.getAttribute("data-rs-date");

			if (!currentDateString) return;

			const [year, month, date] = currentDateString?.split("-").map(Number) as number[];
			let nextDate;

			if (date) {
				nextDate = new Date(year, month - 1, date + delta);
			} else if (delta > 0) {
				nextDate = new Date(year, month - 1 + delta, 1);
			} else {
				// If moving back in month navigation - check if the last date of that month is enabled
				// We increase the delta, but set date to 0 which is the last date of the previous month
				nextDate = new Date(year, month - 1 + delta + 1, 0);
			}

			const disabled = (min && nextDate < min) || (max && nextDate > max);

			if (disabled) return;

			if (nextEl) {
				// If element is found but disabled - we do nothing and still keep the current month
				nextEl.focus();
				return;
			}

			overflowCountRef.current = nextIndex < 0 ? nextIndex : nextIndex - (focusableArr.length - 1);
			onMonthChange();
		},
		[rootRef, min, max]
	);

	/**
	 * Apply focus after switching the month based on the overflow value
	 */
	React.useEffect(() => {
		const count = overflowCountRef.current;
		if (count === 0) return;

		const els = getFocusableDates(rootRef.current);
		const targetIndex = count < 0 ? els.length + count : count - 1;
		const targetEl = els[targetIndex];

		if (targetEl) targetEl.focus();

		overflowCountRef.current = 0;
	}, [monthDate, rootRef]);

	useHotkeys(
		{
			[keys.LEFT]: () => focusDate({ delta: -1, onMonthChange: changeToPreviousMonth }),
			[keys.RIGHT]: () => focusDate({ delta: 1, onMonthChange: changeToNextMonth }),
			[keys.UP]: () => focusDate({ delta: -verticalDelta, onMonthChange: changeToPreviousMonth }),
			[keys.DOWN]: () => focusDate({ delta: verticalDelta, onMonthChange: changeToNextMonth }),
		},
		[changeToNextMonth, changeToPreviousMonth, focusDate, verticalDelta],
		{ ref: rootRef, preventDefault: true }
	);
};

export default useCalendarKeyboardNavigation;
