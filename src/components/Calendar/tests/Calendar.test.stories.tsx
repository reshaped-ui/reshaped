import { StoryObj } from "@storybook/react";
import { expect, userEvent, fn, waitFor } from "@storybook/test";
import Calendar from "components/Calendar";

export default {
	title: "Components/Calendar/tests",
	component: Calendar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/calendar",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => <Calendar defaultMonth={new Date(2020, 0, 1)} />,
	play: async ({ canvas }) => {
		const monthTitleEl = canvas.getByText("January 2020");

		const gridEl = canvas.getByRole("grid");
		const gridCellEls = canvas.getAllByRole("gridcell");
		const dateEls = canvas.getAllByRole("checkbox");
		const buttonEls = canvas.getAllByRole("button");

		expect(monthTitleEl).toBeInTheDocument();
		expect(gridEl).toBeInTheDocument();
		expect(gridCellEls).toHaveLength(31);

		expect(dateEls).toHaveLength(31);
		expect(dateEls[0].getAttribute("aria-label")).toBe("Wednesday, January 1");
		expect(dateEls[0]).toHaveAttribute("tabIndex", "0");
		expect(dateEls[1]).toHaveAttribute("tabIndex", "-1");

		// Previous month button
		expect(buttonEls[0].getAttribute("aria-label")).toBe("Previous month");
		// Month select button
		expect(buttonEls[1].innerHTML).toContain("Select a month");
		// Next month button
		expect(buttonEls[2].getAttribute("aria-label")).toBe("Next month");
	},
};

export const onChange: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "onChange",
	args: {
		handleChange: fn(),
	},
	render: (args) => <Calendar defaultMonth={new Date(2020, 0)} onChange={args.handleChange} />,
	play: async ({ canvas, args }) => {
		const dateEls = canvas.getAllByRole("checkbox");

		await userEvent.click(dateEls[1]);

		expect(args.handleChange).toHaveBeenCalledTimes(1);

		// TODO: https://github.com/storybookjs/storybook/issues/30503
		// expect(args.handleChange).toHaveBeenCalledWith({ value: new Date(2020, 0, 2) });
	},
};

export const defaultValue: StoryObj = {
	name: "defaultValue",
	render: () => <Calendar defaultMonth={new Date(2020, 0)} defaultValue={new Date(2020, 0, 5)} />,
	play: async ({ canvas }) => {
		const dateEls = canvas.getAllByRole("checkbox");
		const selectedDateEl = dateEls[4];

		expect(selectedDateEl).toBeInTheDocument();
		expect(selectedDateEl).toHaveAttribute("tabIndex", "0");
		expect(selectedDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[6], { delay: null });

		expect(dateEls[6]).toHaveAttribute("aria-checked", "true");
	},
};

export const value: StoryObj = {
	name: "value",
	render: () => <Calendar defaultMonth={new Date(2020, 0)} value={new Date(2020, 0, 5)} />,
	play: async ({ canvas }) => {
		const dateEls = canvas.getAllByRole("checkbox");
		const selectedDateEl = dateEls[4];

		expect(selectedDateEl).toBeInTheDocument();
		expect(selectedDateEl).toHaveAttribute("tabIndex", "0");
		expect(selectedDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[6], { delay: null });

		expect(dateEls[6]).toHaveAttribute("aria-checked", "false");
	},
};

export const range: StoryObj = {
	name: "defaultValue, range",
	render: () => (
		<Calendar
			defaultMonth={new Date(2020, 0)}
			range
			defaultValue={{ start: new Date(2020, 0, 5), end: new Date(2020, 0, 7) }}
		/>
	),
	play: async ({ canvas }) => {
		const dateEls = canvas.getAllByRole("checkbox");
		const startDateEl = dateEls[4];
		const endDateEl = dateEls[6];

		expect(startDateEl).toHaveAttribute("tabIndex", "0");
		expect(startDateEl).toHaveAttribute("aria-checked", "true");

		expect(endDateEl).toHaveAttribute("tabIndex", "-1");
		expect(endDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[3], { delay: null });

		expect(dateEls[3]).toHaveAttribute("aria-checked", "true");
		expect(dateEls[3]).toHaveAttribute("tabIndex", "0");

		expect(startDateEl).toHaveAttribute("aria-checked", "false");
		expect(startDateEl).toHaveAttribute("tabIndex", "-1");

		expect(endDateEl).toHaveAttribute("aria-checked", "false");
		expect(endDateEl).toHaveAttribute("tabIndex", "-1");

		// Click before the start date
		await userEvent.click(dateEls[2], { delay: null });

		expect(dateEls[2]).toHaveAttribute("aria-checked", "true");
		expect(dateEls[2]).toHaveAttribute("tabIndex", "0");

		expect(dateEls[3]).toHaveAttribute("aria-checked", "false");
		expect(dateEls[3]).toHaveAttribute("tabIndex", "-1");

		await userEvent.click(dateEls[4], { delay: null });

		expect(dateEls[2]).toHaveAttribute("aria-checked", "true");
		expect(dateEls[2]).toHaveAttribute("tabIndex", "0");

		expect(dateEls[4]).toHaveAttribute("aria-checked", "true");
		expect(dateEls[4]).toHaveAttribute("tabIndex", "-1");
	},
};

export const minMax: StoryObj = {
	name: "min, max",
	render: () => (
		<Calendar
			min={new Date(2020, 0, 5)}
			max={new Date(2020, 0, 25)}
			defaultMonth={new Date(2020, 0)}
		/>
	),
	play: async ({ canvas }) => {
		const dateEls = canvas.getAllByRole("checkbox");

		expect(dateEls).toHaveLength(21);
	},
};

export const monthSelection: StoryObj = {
	name: "month selection",
	render: () => <Calendar defaultMonth={new Date(2020, 0)} />,
	play: async ({ canvas }) => {
		const buttonEls = canvas.getAllByRole("button");

		await userEvent.click(buttonEls[1], { delay: null });

		const monthEls = canvas.getAllByRole("button").filter((el) => el.hasAttribute("data-rs-date"));

		expect(monthEls).toHaveLength(12);
	},
};

export const ariaLabels: StoryObj = {
	name: "aria labels",
	render: () => (
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

export const keyboardNavigation: StoryObj = {
	name: "keyboard navigation",
	render: () => <Calendar defaultMonth={new Date(2020, 0)} />,
	play: async ({ canvas }) => {
		const user = userEvent.setup();
		const dateEls = canvas.getAllByRole("checkbox");

		dateEls[0].focus();

		await user.keyboard("{ArrowRight/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-02");

		await user.keyboard("{ArrowLeft/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");

		await user.keyboard("{ArrowDown/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-08");

		await user.keyboard("{ArrowUp/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");

		await user.keyboard("{ArrowUp/}");
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2019-12-25");
	},
};
