import { StoryObj } from "@storybook/react-vite";
import { fn, expect, userEvent, within, type Mock, waitFor } from "storybook/test";

import Calendar from "components/Calendar";
import Text from "components/Text";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Calendar",
	component: Calendar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/calendar",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="defaultMonth: 2020 January">
				<Calendar defaultMonth={new Date(2020, 0)} range />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const grid = canvas.getByRole("grid");
		const gridCells = canvas.getAllByRole("gridcell");
		const dates = canvas.getAllByRole("checkbox");
		const [prevButton, monthButton, nextButton] = canvas.getAllByRole("button");

		expect(grid).toBeInTheDocument();
		expect(gridCells).toHaveLength(31);
		expect(dates).toHaveLength(31);

		const focusableDates = dates.filter((el) => {
			return el.getAttribute("tabIndex") === "0";
		});

		// Defaults keyboard focus to the first day of the month
		expect(focusableDates).toHaveLength(1);
		expect(focusableDates[0]).toBe(dates[0]);

		// Default Labels
		expect(dates[0]).toHaveAccessibleName("Wednesday, January 1");
		expect(prevButton).toHaveAccessibleName("Previous month");
		expect(monthButton).toHaveAccessibleName("January 2020 Select a month");
		expect(nextButton).toHaveAccessibleName("Next month");
	},
};

export const month: StoryObj<{ handleDefaultMonthChange: Mock; handleMonthChange: Mock }> = {
	name: "defaultMonth, month, onMonthChange",
	args: {
		handleDefaultMonthChange: fn(),
		handleMonthChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="defaultMonth: 2020 January">
				<Calendar defaultMonth={new Date(2020, 0)} onMonthChange={args.handleDefaultMonthChange} />
			</Example.Item>
			<Example.Item title="month: 2020 January">
				<Calendar month={new Date(2020, 0)} onMonthChange={args.handleMonthChange} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [
			prevButton,
			monthButton,
			nextButton,
			prevButtonControlled,
			monthButtonControlled,
			nextButtonControlled,
		] = canvas.getAllByRole("button");

		// Uncontrolled
		await userEvent.click(prevButton);
		expect(args.handleDefaultMonthChange).toHaveBeenCalledTimes(1);
		expect(args.handleDefaultMonthChange).toHaveBeenLastCalledWith({ date: new Date(2019, 11) });

		await userEvent.click(nextButton);
		expect(args.handleDefaultMonthChange).toHaveBeenCalledTimes(2);
		expect(args.handleDefaultMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 0) });

		await userEvent.click(monthButton);

		const [grid] = canvas.getAllByRole("grid");
		const months = within(grid)
			.getAllByRole("button")
			.filter((el) => el.hasAttribute("data-rs-date"));

		await userEvent.click(months[3]);

		expect(args.handleDefaultMonthChange).toHaveBeenCalledTimes(3);
		expect(args.handleDefaultMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 3) });

		// Controlled
		await userEvent.click(prevButtonControlled);
		expect(args.handleMonthChange).toHaveBeenCalledTimes(1);
		expect(args.handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2019, 11) });

		await userEvent.click(nextButtonControlled);
		expect(args.handleMonthChange).toHaveBeenCalledTimes(2);
		expect(args.handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 1) });

		await userEvent.click(monthButtonControlled);

		const [, gridControlled] = canvas.getAllByRole("grid");
		const monthsControlled = within(gridControlled)
			.getAllByRole("button")
			.filter((el) => el.hasAttribute("data-rs-date"));

		await userEvent.click(monthsControlled[3]);

		expect(args.handleMonthChange).toHaveBeenCalledTimes(3);
		expect(args.handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 3) });
	},
};

export const uncontrolled: StoryObj<{ handleChange: Mock }> = {
	name: "defaultValue, range",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="defaultValue">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					defaultValue={new Date(2020, 0, 10)}
					onChange={args.handleChange}
				/>
			</Example.Item>
			<Example.Item title="defaultValue, range">
				<Calendar
					range
					defaultMonth={new Date(2020, 0)}
					defaultValue={{ start: new Date(2020, 0, 10), end: new Date(2020, 0, 15) }}
					onChange={args.handleChange}
				/>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [singleCalendar, rangeCalendar] = canvas.getAllByRole("grid");
		const singleCalendarDates = within(singleCalendar).getAllByRole("checkbox");
		const rangeCalendarDates = within(rangeCalendar).getAllByRole("checkbox");

		await userEvent.click(singleCalendarDates[7]);

		expect(singleCalendarDates[7]).toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenLastCalledWith({ value: new Date(2020, 0, 8) });

		await userEvent.click(rangeCalendarDates[7]);

		expect(rangeCalendarDates[7]).toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(2);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 8), end: null },
		});

		// While selecting end value, clicking on a date < start value should change the start value
		await userEvent.click(rangeCalendarDates[6]);

		expect(rangeCalendarDates[6]).toBeChecked();
		expect(rangeCalendarDates[7]).not.toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(3);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: null },
		});

		await userEvent.click(rangeCalendarDates[10]);

		expect(args.handleChange).toHaveBeenCalledTimes(4);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: new Date(2020, 0, 11) },
		});

		for (let i = 6; i < 10; i++) {
			expect(rangeCalendarDates[i]).toBeChecked();
		}
	},
};

export const controlled: StoryObj<{ handleChange: Mock }> = {
	name: "value, range",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="value">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					value={new Date(2020, 0, 10)}
					onChange={args.handleChange}
				/>
			</Example.Item>
			<Example.Item title="defaultValue, range">
				<Calendar
					range
					defaultMonth={new Date(2020, 0)}
					value={{ start: new Date(2020, 0, 10), end: new Date(2020, 0, 15) }}
					onChange={args.handleChange}
				/>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [singleCalendar, rangeCalendar] = canvas.getAllByRole("grid");
		const singleCalendarDates = within(singleCalendar).getAllByRole("checkbox");
		const rangeCalendarDates = within(rangeCalendar).getAllByRole("checkbox");

		await userEvent.click(singleCalendarDates[7]);

		expect(singleCalendarDates[7]).not.toBeChecked();
		expect(singleCalendarDates[9]).toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenLastCalledWith({ value: new Date(2020, 0, 8) });

		await userEvent.click(rangeCalendarDates[7]);

		expect(rangeCalendarDates[7]).not.toBeChecked();
		expect(rangeCalendarDates[9]).toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(2);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 8), end: null },
		});

		// While selecting end value, clicking on a date < start value should change the start value
		await userEvent.click(rangeCalendarDates[6]);

		expect(rangeCalendarDates[6]).not.toBeChecked();
		expect(rangeCalendarDates[9]).toBeChecked();
		expect(args.handleChange).toHaveBeenCalledTimes(3);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: null },
		});

		// In controlled mode, clicking on a date > startValue still changes startValue since we're not updating the state
		await userEvent.click(rangeCalendarDates[10]);

		expect(args.handleChange).toHaveBeenCalledTimes(4);
		expect(args.handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 11), end: null },
		});

		expect(rangeCalendarDates[6]).not.toBeChecked();
		expect(rangeCalendarDates[9]).toBeChecked();
	},
};

export const monthsToRender: StoryObj = {
	name: "monthsToRender",
	render: () => (
		<Example>
			<Example.Item title="monthsToRender: 2">
				<Calendar defaultMonth={new Date(2020, 0)} monthsToRender={2} range />
			</Example.Item>
		</Example>
	),
};

export const renderDateSlot: StoryObj = {
	name: "renderDateSlot",
	render: () => (
		<Example>
			<Example.Item title="renderDateSlot">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					defaultValue={new Date(2020, 0, 10)}
					renderDateSlot={(args) => {
						return (
							<Text
								color={
									args.selected
										? undefined
										: args.date.getDate() < 15
											? "positive"
											: "neutral-faded"
								}
								variant="caption-2"
							>
								{args.date.getDate() < 15 ? "$150" : "$200"}
							</Text>
						);
					}}
				/>
			</Example.Item>
		</Example>
	),
};

export const selectedDates: StoryObj = {
	name: "selectedDates",
	render: () => (
		<Example>
			<Example.Item title="selectedDates: [4,8]">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					value={null}
					selectedDates={[new Date(2020, 0, 4), new Date(2020, 0, 8)]}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox");

		expect(dates[3]).toBeChecked();
		expect(dates[7]).toBeChecked();
	},
};

export const disabledDates: StoryObj = {
	name: "disabledDates",
	render: () => (
		<Example>
			<Example.Item title="disabledDates: [4,8]">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					value={null}
					disabledDates={[new Date(2020, 0, 4), new Date(2020, 0, 8)]}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox", { hidden: true });

		expect(dates[3]).toBeDisabled();
		expect(dates[7]).toBeDisabled();
	},
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => (
		<Example>
			<Example.Item title="min: 4, max: 20">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					min={new Date(2020, 0, 4)}
					max={new Date(2020, 0, 20)}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const dates = canvas.getAllByRole("checkbox");

		expect(dates).toHaveLength(17);
	},
};

export const firstWeekDay: StoryObj = {
	name: "firstWeekDay",
	render: () => (
		<Example>
			<Example.Item title="firstWeekDay: 3 (Wed)">
				<Calendar defaultMonth={new Date(2020, 0)} firstWeekDay={3} />
			</Example.Item>
		</Example>
	),
};

export const translation = {
	name: "render functions",
	render: () => (
		<Example>
			<Example.Item title="translated to NL">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					renderMonthLabel={({ date }) => date.toLocaleDateString("nl", { month: "short" })}
					renderSelectedMonthLabel={({ date }) =>
						date.toLocaleDateString("nl", { month: "long", year: "numeric" })
					}
					renderWeekDay={({ date }) => date.toLocaleDateString("nl", { weekday: "short" })}
				/>
			</Example.Item>
		</Example>
	),
};

export const ariaLabels: StoryObj = {
	name: "aria labels",
	render: () => (
		<Example>
			<Example.Item title="aria labels">
				<Calendar
					defaultMonth={new Date(2020, 0)}
					nextYearAriaLabel="Test next year"
					nextMonthAriaLabel="Test next month"
					renderDateAriaLabel={() => "Test date"}
					renderMonthAriaLabel={() => "Test month"}
					previousYearAriaLabel="Test previous year"
					previousMonthAriaLabel="Test previous month"
					monthSelectionAriaLabel="Test month selection"
				/>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const buttonEls = canvas.getAllByRole("button");
		const dateEls = canvas.getAllByRole("checkbox");

		expect(buttonEls[0]).toHaveAttribute("aria-label", "Test previous month");
		expect(buttonEls[1]).toHaveTextContent("Test month selection");
		expect(buttonEls[2]).toHaveAttribute("aria-label", "Test next month");
		expect(dateEls[0]).toHaveAttribute("aria-label", "Test date");

		await userEvent.click(buttonEls[1], { delay: null });

		const yearButtonEls = canvas.getAllByRole("button");

		expect(yearButtonEls[0]).toHaveAttribute("aria-label", "Test previous year");
		expect(yearButtonEls[1]).toHaveAttribute("aria-label", "Test next year");
		expect(yearButtonEls[2]).toHaveAttribute("aria-label", "Test month");
	},
};

export const monthSelection: StoryObj = {
	name: "test: month selection",
	render: () => (
		<Example>
			<Example.Item title="month selection">
				<Calendar defaultMonth={new Date(2020, 1)} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		let buttons = canvas.getAllByRole("button");
		let monthButton = buttons[1];

		expect(monthButton).toHaveAccessibleName("February 2020 Select a month");

		await userEvent.click(monthButton);

		let months = canvas.getAllByRole("button").filter((el) => el.hasAttribute("data-rs-date"));

		expect(months).toHaveLength(12);

		await userEvent.click(months[0]);

		buttons = canvas.getAllByRole("button");
		months = buttons.filter((el) => el.hasAttribute("data-rs-date"));
		monthButton = buttons[1];

		expect(months).toHaveLength(0);
		expect(monthButton).toHaveAccessibleName("January 2020 Select a month");
	},
};

export const keyboardNavigation: StoryObj = {
	name: "test: keyboard navigation",
	render: () => (
		<Example>
			<Example.Item title="keyboard navigation">
				<Calendar defaultMonth={new Date(2020, 0)} />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const buttons = canvas.getAllByRole("button");

		buttons[2].focus();

		await userEvent.keyboard("{Tab/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");

		await userEvent.keyboard("{ArrowRight/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-02");
		});

		await userEvent.keyboard("{Shift>}{Tab/}{/Shift}");
		await userEvent.keyboard("{Tab/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-02");
		});

		await userEvent.keyboard("{ArrowLeft/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");
		});

		await userEvent.keyboard("{ArrowDown/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-08");
		});

		await userEvent.keyboard("{ArrowUp/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");
		});

		await userEvent.keyboard("{ArrowUp/}");
		waitFor(() => {
			expect(document.activeElement).toHaveAttribute("data-rs-date", "2019-12-25");
		});
	},
};
