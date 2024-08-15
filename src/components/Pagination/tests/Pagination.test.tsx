import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Pagination from "components/Pagination";

const fixtures = {
	nextAriaLabel: "Next page",
	previousAriaLabel: "Previous page",
	className: "test-className",
	id: "test-id",
};

describe("Components/Pagination", () => {
	test("renders component correctly", () => {
		render(
			<Pagination
				total={10}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		);

		const elsButton = screen.getAllByRole("button");
		const elsPage = elsButton.slice(1, -1);
		const prevButton = screen.getByLabelText(fixtures.previousAriaLabel);
		const nextButton = screen.getByLabelText(fixtures.nextAriaLabel);
		const firstPageButton = screen.getByLabelText("Page 1");

		expect(elsButton.length).toBe(8);
		expect(prevButton).toBeInTheDocument();
		expect(prevButton).toEqual(elsButton[0]);
		expect(prevButton).toBeDisabled();
		expect(nextButton).toBeInTheDocument();
		expect(nextButton).toEqual(elsButton[7]);
		expect(nextButton).not.toBeDisabled();

		expect(firstPageButton).toBeInTheDocument();
		expect(firstPageButton).toEqual(elsPage[0]);
		expect(firstPageButton).toHaveAttribute("aria-current", "true");
	});

	test("truncation works correctly", async () => {
		render(
			<Pagination
				total={100}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		);

		let elsButton = screen.getAllByRole("button");
		let elsPage = elsButton.slice(1, -1);
		const prevButton = screen.getByLabelText(fixtures.previousAriaLabel);
		const nextButton = screen.getByLabelText(fixtures.nextAriaLabel);

		expect(elsPage.length).toBe(6);
		expect(elsPage[0]).toHaveAttribute("aria-current", "true");
		expect(prevButton).toBeDisabled();
		expect(nextButton).not.toBeDisabled();

		await userEvent.click(elsPage[4]);

		elsButton = screen.getAllByRole("button");
		elsPage = elsButton.slice(1, -1);

		expect(elsPage.length).toBe(5);
		expect(elsPage[2]).toHaveAttribute("aria-current", "true");
		expect(prevButton).not.toBeDisabled();
		expect(nextButton).not.toBeDisabled();

		await userEvent.click(elsPage[4]);

		elsButton = screen.getAllByRole("button");
		elsPage = elsButton.slice(1, -1);

		expect(elsPage.length).toBe(6);
		expect(elsPage[5]).toHaveAttribute("aria-current", "true");
		expect(prevButton).not.toBeDisabled();
		expect(nextButton).toBeDisabled();
	});

	test("truncation gets disabled", () => {
		render(
			<Pagination
				total={4}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		);

		const elsButton = screen.getAllByRole("button");

		// 4 pages + 2 navigation controls
		expect(elsButton.length).toBe(6);
	});

	test("works as uncontrolled", async () => {
		const handleChange = jest.fn();
		render(
			<Pagination
				total={10}
				defaultPage={2}
				onChange={handleChange}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
			/>
		);

		let elsButton = screen.getAllByRole("button");
		let elsPage = elsButton.slice(1, -1);

		await userEvent.click(elsPage[1]);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ page: 2 });

		expect(elsPage[1]).toHaveAttribute("aria-current", "true");
	});

	test("works as controlled", async () => {
		const handleChange = jest.fn();
		render(
			<Pagination
				total={10}
				page={1}
				onChange={handleChange}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
			/>
		);

		let elsButton = screen.getAllByRole("button");
		let elsPage = elsButton.slice(1, -1);

		await userEvent.click(elsPage[1]);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ page: 2 });

		expect(elsPage[0]).toHaveAttribute("aria-current", "true");
	});

	test("works with className and attributes", () => {
		const { container } = render(
			<Pagination
				total={10}
				previousAriaLabel={fixtures.previousAriaLabel}
				nextAriaLabel={fixtures.nextAriaLabel}
				className={fixtures.className}
				attributes={{ id: fixtures.id }}
			/>
		);

		expect(container.firstChild).toHaveClass(fixtures.className);
		expect(container.firstChild).toHaveAttribute("id", fixtures.id);
	});
});
