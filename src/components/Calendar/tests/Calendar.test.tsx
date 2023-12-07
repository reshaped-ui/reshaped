import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Calendar from "components/Calendar";
import Reshaped from "components/Reshaped";

beforeAll(() => {
	jest.useFakeTimers();
	jest.setSystemTime(new Date(2020, 0, 1));
});

afterAll(() => {
	jest.useRealTimers();
});

describe("Components/Calendar", () => {
	test("renders calendar for current month", () => {
		render(
			<Reshaped>
				<Calendar />
			</Reshaped>
		);

		const monthTitleEl = screen.getByText("January 2020");

		const gridEl = screen.getByRole("grid");
		const gridCellEls = screen.getAllByRole("gridcell");
		const dateEls = screen.getAllByRole("checkbox");
		const buttonEls = screen.getAllByRole("button");

		expect(monthTitleEl).toBeInTheDocument();
		expect(gridEl).toBeInTheDocument();
		expect(gridCellEls).toHaveLength(31);

		expect(dateEls).toHaveLength(31);
		expect(dateEls[0].getAttribute("aria-label")).toMatchSnapshot();
		expect(dateEls[0]).toHaveAttribute("tabIndex", "0");
		expect(dateEls[1]).toHaveAttribute("tabIndex", "-1");

		// Previous month button
		expect(buttonEls[0].getAttribute("aria-label")).toMatchSnapshot();
		// Month select button
		expect(buttonEls[1].innerHTML).toMatchSnapshot();
		// Next month button
		expect(buttonEls[2].getAttribute("aria-label")).toMatchSnapshot();
	});

	test("renders passed month", () => {
		render(
			<Reshaped>
				<Calendar defaultMonth={new Date(2022, 11)} />
			</Reshaped>
		);

		const monthTitleEl = screen.getByText("December 2022");

		expect(monthTitleEl).toBeInTheDocument();
	});

	test("supports onChange", async () => {
		const handleChange = jest.fn();

		render(
			<Reshaped>
				<Calendar onChange={handleChange} />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");

		await userEvent.click(dateEls[0], { delay: null });

		await waitFor(() => {
			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith({ value: new Date(2020, 0, 1) });
		});
	});

	test("supports single defaultValue", async () => {
		render(
			<Reshaped>
				<Calendar defaultValue={new Date(2020, 0, 5)} />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");
		const selectedDateEl = dateEls[4];

		expect(selectedDateEl).toBeInTheDocument();
		expect(selectedDateEl).toHaveAttribute("tabIndex", "0");
		expect(selectedDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[6], { delay: null });

		await waitFor(() => {
			expect(dateEls[6]).toHaveAttribute("aria-checked", "true");
		});
	});

	test("supports single value", async () => {
		render(
			<Reshaped>
				<Calendar value={new Date(2020, 0, 5)} />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");
		const selectedDateEl = dateEls[4];

		expect(selectedDateEl).toBeInTheDocument();
		expect(selectedDateEl).toHaveAttribute("tabIndex", "0");
		expect(selectedDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[6], { delay: null });

		await waitFor(() => {
			expect(dateEls[6]).toHaveAttribute("aria-checked", "false");
		});
	});

	test("supports range defaultValue", async () => {
		render(
			<Reshaped>
				<Calendar range defaultValue={{ start: new Date(2020, 0, 5), end: new Date(2020, 0, 7) }} />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");
		const startDateEl = dateEls[4];
		const endDateEl = dateEls[6];

		expect(startDateEl).toHaveAttribute("tabIndex", "0");
		expect(startDateEl).toHaveAttribute("aria-checked", "true");

		expect(endDateEl).toHaveAttribute("tabIndex", "-1");
		expect(endDateEl).toHaveAttribute("aria-checked", "true");

		await userEvent.click(dateEls[3], { delay: null });

		await waitFor(() => {
			expect(dateEls[3]).toHaveAttribute("aria-checked", "true");
			expect(dateEls[3]).toHaveAttribute("tabIndex", "0");

			expect(startDateEl).toHaveAttribute("aria-checked", "false");
			expect(startDateEl).toHaveAttribute("tabIndex", "-1");

			expect(endDateEl).toHaveAttribute("aria-checked", "false");
			expect(endDateEl).toHaveAttribute("tabIndex", "-1");
		});

		// Click before the start date
		await userEvent.click(dateEls[2], { delay: null });

		await waitFor(() => {
			expect(dateEls[2]).toHaveAttribute("aria-checked", "true");
			expect(dateEls[2]).toHaveAttribute("tabIndex", "0");

			expect(dateEls[3]).toHaveAttribute("aria-checked", "false");
			expect(dateEls[3]).toHaveAttribute("tabIndex", "-1");
		});

		await userEvent.click(dateEls[4], { delay: null });

		await waitFor(() => {
			expect(dateEls[2]).toHaveAttribute("aria-checked", "true");
			expect(dateEls[2]).toHaveAttribute("tabIndex", "0");

			expect(dateEls[4]).toHaveAttribute("aria-checked", "true");
			expect(dateEls[4]).toHaveAttribute("tabIndex", "-1");
		});
	});

	test("supports min/max boundaries", () => {
		render(
			<Reshaped>
				<Calendar min={new Date(2020, 0, 5)} max={new Date(2020, 0, 25)} />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");

		expect(dateEls).toHaveLength(21);
	});

	test("supports month selection", async () => {
		render(
			<Reshaped>
				<Calendar />
			</Reshaped>
		);

		const buttonEls = screen.getAllByRole("button");

		await userEvent.click(buttonEls[1], { delay: null });

		const monthEls = screen.getAllByRole("button").filter((el) => el.hasAttribute("data-rs-date"));

		expect(monthEls).toHaveLength(12);
	});

	test("supports custom aria labels", async () => {
		render(
			<Reshaped>
				<Calendar
					nextYearAriaLabel="Test next year"
					nextMonthAriaLabel="Test next month"
					renderDateAriaLabel={() => "Test date"}
					renderMonthAriaLabel={() => "Test month"}
					previousYearAriaLabel="Test previous year"
					previousMonthAriaLabel="Test previous month"
					monthSelectionAriaLabel="Test month selection"
				/>
			</Reshaped>
		);

		const buttonEls = screen.getAllByRole("button");
		const dateEls = screen.getAllByRole("checkbox");

		expect(buttonEls[0]).toHaveAttribute("aria-label", "Test previous month");
		expect(buttonEls[1]).toHaveTextContent("Test month selection");
		expect(buttonEls[2]).toHaveAttribute("aria-label", "Test next month");
		expect(dateEls[0]).toHaveAttribute("aria-label", "Test date");

		await userEvent.click(buttonEls[1], { delay: null });

		const yearButtonEls = screen.getAllByRole("button");

		expect(yearButtonEls[0]).toHaveAttribute("aria-label", "Test previous year");
		expect(yearButtonEls[1]).toHaveAttribute("aria-label", "Test next year");
		expect(yearButtonEls[2]).toHaveAttribute("aria-label", "Test month");
	});

	test("supports keyboard navigation", async () => {
		render(
			<Reshaped>
				<Calendar />
			</Reshaped>
		);

		const dateEls = screen.getAllByRole("checkbox");

		act(() => {
			dateEls[0].focus();
		});

		await userEvent.keyboard("{ArrowRight}", { delay: null });
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-02");

		await userEvent.keyboard("{ArrowLeft}", { delay: null });
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");

		await userEvent.keyboard("{ArrowDown}", { delay: null });
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-08");

		await userEvent.keyboard("{ArrowUp}", { delay: null });
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2020-01-01");

		await userEvent.keyboard("{ArrowUp}", { delay: null });
		expect(document.activeElement).toHaveAttribute("data-rs-date", "2019-12-25");
	});
});
