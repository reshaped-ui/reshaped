import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Calendar from "@/components/Calendar";
import { render } from "@/tests/render";

const getMonthButtons = () => page.getByRole("grid").getByRole("button");

const expectFocusedDate = (date: string) =>
	expect.poll(() => document.activeElement?.getAttribute("data-rs-date")).toBe(date);

describe("Components/Calendar", () => {
	test("base", async () => {
		await render(<Calendar defaultMonth={new Date(2020, 0)} range />);
		const dates = page.getByRole("checkbox");

		await expect.element(page.getByRole("grid")).toBeInTheDocument();
		expect(page.getByRole("gridcell").all()).toHaveLength(31);
		expect(dates.all()).toHaveLength(31);

		// Defaults keyboard focus to the first day of the month
		const focusableDates = dates.elements().filter((el) => el.getAttribute("tabindex") === "0");
		expect(focusableDates).toHaveLength(1);
		expect(focusableDates[0]).toBe(dates.first().element());

		// Default labels
		await expect.element(dates.first()).toHaveAccessibleName("Wednesday, January 1");
		await expect.element(page.getByRole("button").nth(0)).toHaveAccessibleName("Previous month");
		await expect
			.element(page.getByRole("button").nth(1))
			.toHaveAccessibleName("January 2020 Select a month");
		await expect.element(page.getByRole("button").nth(2)).toHaveAccessibleName("Next month");
	});

	test("defaultMonth, onMonthChange", async () => {
		const handleMonthChange = vi.fn();
		await render(<Calendar defaultMonth={new Date(2020, 0)} onMonthChange={handleMonthChange} />);

		await userEvent.click(page.getByRole("button", { name: "Previous month" }));
		expect(handleMonthChange).toHaveBeenCalledTimes(1);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2019, 11) });
		await expect
			.element(page.getByRole("button", { name: "Select a month" }))
			.toHaveAccessibleName("December 2019 Select a month");

		await userEvent.click(page.getByRole("button", { name: "Next month" }));
		expect(handleMonthChange).toHaveBeenCalledTimes(2);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 0) });

		await userEvent.click(page.getByRole("button", { name: "Select a month" }));
		await userEvent.click(getMonthButtons().nth(3));

		expect(handleMonthChange).toHaveBeenCalledTimes(3);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 3) });
		await expect
			.element(page.getByRole("button", { name: "Select a month" }))
			.toHaveAccessibleName("April 2020 Select a month");
	});

	test("month, onMonthChange", async () => {
		const handleMonthChange = vi.fn();
		await render(<Calendar month={new Date(2020, 0)} onMonthChange={handleMonthChange} />);

		await userEvent.click(page.getByRole("button", { name: "Previous month" }));
		expect(handleMonthChange).toHaveBeenCalledTimes(1);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2019, 11) });

		// Month is controlled, so it stays on January
		await expect
			.element(page.getByRole("button", { name: "Select a month" }))
			.toHaveAccessibleName("January 2020 Select a month");

		await userEvent.click(page.getByRole("button", { name: "Next month" }));
		expect(handleMonthChange).toHaveBeenCalledTimes(2);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 1) });

		await userEvent.click(page.getByRole("button", { name: "Select a month" }));
		await userEvent.click(getMonthButtons().nth(3));

		expect(handleMonthChange).toHaveBeenCalledTimes(3);
		expect(handleMonthChange).toHaveBeenLastCalledWith({ date: new Date(2020, 3) });
	});

	test("defaultValue", async () => {
		const handleChange = vi.fn();
		await render(
			<Calendar
				defaultMonth={new Date(2020, 0)}
				defaultValue={new Date(2020, 0, 10)}
				onChange={handleChange}
			/>
		);
		const dates = page.getByRole("checkbox");

		await expect.element(dates.nth(9)).toBeChecked();
		await userEvent.click(dates.nth(7));

		await expect.element(dates.nth(7)).toBeChecked();
		await expect.element(dates.nth(9)).not.toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({ value: new Date(2020, 0, 8) });
	});

	test("defaultValue, range", async () => {
		const handleChange = vi.fn();
		await render(
			<Calendar
				range
				defaultMonth={new Date(2020, 0)}
				defaultValue={{ start: new Date(2020, 0, 10), end: new Date(2020, 0, 15) }}
				onChange={handleChange}
			/>
		);
		const dates = page.getByRole("checkbox");

		await userEvent.click(dates.nth(7));

		await expect.element(dates.nth(7)).toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 8), end: null },
		});

		// While selecting end value, clicking on a date < start value should change the start value
		await userEvent.click(dates.nth(6));

		await expect.element(dates.nth(6)).toBeChecked();
		await expect.element(dates.nth(7)).not.toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: null },
		});

		await userEvent.click(dates.nth(10));

		expect(handleChange).toHaveBeenCalledTimes(3);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: new Date(2020, 0, 11) },
		});

		for (let i = 6; i < 11; i++) {
			await expect.element(dates.nth(i)).toBeChecked();
		}
		await expect.element(dates.nth(11)).not.toBeChecked();
	});

	test("value", async () => {
		const handleChange = vi.fn();
		await render(
			<Calendar
				defaultMonth={new Date(2020, 0)}
				value={new Date(2020, 0, 10)}
				onChange={handleChange}
			/>
		);
		const dates = page.getByRole("checkbox");

		await userEvent.click(dates.nth(7));

		await expect.element(dates.nth(7)).not.toBeChecked();
		await expect.element(dates.nth(9)).toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({ value: new Date(2020, 0, 8) });
	});

	test("value, range", async () => {
		const handleChange = vi.fn();
		await render(
			<Calendar
				range
				defaultMonth={new Date(2020, 0)}
				value={{ start: new Date(2020, 0, 10), end: new Date(2020, 0, 15) }}
				onChange={handleChange}
			/>
		);
		const dates = page.getByRole("checkbox");

		await userEvent.click(dates.nth(7));

		await expect.element(dates.nth(7)).not.toBeChecked();
		await expect.element(dates.nth(9)).toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 8), end: null },
		});

		// While selecting end value, clicking on a date < start value should change the start value
		await userEvent.click(dates.nth(6));

		await expect.element(dates.nth(6)).not.toBeChecked();
		await expect.element(dates.nth(9)).toBeChecked();
		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 7), end: null },
		});

		// In controlled mode, clicking on a date > startValue still changes startValue since we're not updating the state
		await userEvent.click(dates.nth(10));

		expect(handleChange).toHaveBeenCalledTimes(3);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: { start: new Date(2020, 0, 11), end: null },
		});

		await expect.element(dates.nth(6)).not.toBeChecked();
		await expect.element(dates.nth(9)).toBeChecked();
	});

	test("disabledDates can't be selected", async () => {
		const handleChange = vi.fn();
		await render(
			<Calendar
				defaultMonth={new Date(2020, 0)}
				disabledDates={[new Date(2020, 0, 4)]}
				onChange={handleChange}
			/>
		);
		const disabledDate = page.getByRole("checkbox", { includeHidden: true }).nth(3);

		await expect.element(disabledDate).toBeDisabled();
		await userEvent.click(disabledDate, { force: true });

		expect(handleChange).not.toHaveBeenCalled();
	});

	test("aria labels", async () => {
		await render(
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
		);
		const buttons = page.getByRole("button");

		await expect.element(buttons.nth(0)).toHaveAttribute("aria-label", "Test previous month");
		await expect.element(buttons.nth(1)).toHaveTextContent("Test month selection");
		await expect.element(buttons.nth(2)).toHaveAttribute("aria-label", "Test next month");
		await expect
			.element(page.getByRole("checkbox").first())
			.toHaveAttribute("aria-label", "Test date");

		await userEvent.click(buttons.nth(1));

		await expect.element(buttons.nth(0)).toHaveAttribute("aria-label", "Test previous year");
		await expect.element(buttons.nth(1)).toHaveAttribute("aria-label", "Test next year");
		await expect.element(buttons.nth(2)).toHaveAttribute("aria-label", "Test month");
	});

	test("month selection", async () => {
		await render(<Calendar defaultMonth={new Date(2020, 1)} />);
		const monthButton = page.getByRole("button", { name: "Select a month" });

		await expect.element(monthButton).toHaveAccessibleName("February 2020 Select a month");
		await userEvent.click(monthButton);

		await expect.element(getMonthButtons().first()).toBeInTheDocument();
		expect(
			getMonthButtons()
				.elements()
				.filter((el) => el.hasAttribute("data-rs-date"))
		).toHaveLength(12);

		await userEvent.click(getMonthButtons().first());

		await expect.element(getMonthButtons().first()).not.toBeInTheDocument();
		await expect.element(monthButton).toHaveAccessibleName("January 2020 Select a month");
	});

	test("keyboard navigation", async () => {
		await render(<Calendar defaultMonth={new Date(2020, 0)} />);

		page.getByRole("button", { name: "Next month" }).element().focus();

		await userEvent.tab();
		await expectFocusedDate("2020-01-01");

		await userEvent.keyboard("{ArrowRight}");
		await expectFocusedDate("2020-01-02");

		// Focus returns to the last focused date
		await userEvent.tab({ shift: true });
		await userEvent.tab();
		await expectFocusedDate("2020-01-02");

		await userEvent.keyboard("{ArrowLeft}");
		await expectFocusedDate("2020-01-01");

		await userEvent.keyboard("{ArrowDown}");
		await expectFocusedDate("2020-01-08");

		await userEvent.keyboard("{ArrowUp}");
		await expectFocusedDate("2020-01-01");

		// Moves to the previous month
		await userEvent.keyboard("{ArrowUp}");
		await expectFocusedDate("2019-12-25");
		await expect
			.element(page.getByRole("button", { name: "Select a month" }))
			.toHaveAccessibleName("December 2019 Select a month");
	});
});
