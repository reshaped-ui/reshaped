import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Pagination from "@/components/Pagination";
import { render } from "@/tests/render";

describe("Components/Pagination", () => {
	test("rendering", async () => {
		await render(
			<Pagination
				total={10}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		);
		const buttons = page.getByRole("button");
		const prevButton = page.getByLabelText("Previous");
		const nextButton = page.getByLabelText("Next");
		const firstPageButton = page.getByLabelText("Page 1", { exact: true });

		await expect.element(prevButton).toBeInTheDocument();
		expect(buttons.all()).toHaveLength(8);

		expect(prevButton.element()).toBe(buttons.first().element());
		await expect.element(prevButton).toBeDisabled();
		expect(nextButton.element()).toBe(buttons.last().element());
		await expect.element(nextButton).not.toBeDisabled();

		expect(firstPageButton.element()).toBe(buttons.nth(1).element());
		await expect.element(firstPageButton).toHaveAttribute("aria-current", "true");
	});

	test("defaultPage, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<Pagination
				total={10}
				defaultPage={2}
				onChange={handleChange}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		);
		const page2 = page.getByRole("button", { name: "2", exact: true });
		const page3 = page.getByRole("button", { name: "3", exact: true });

		await expect.element(page2).toHaveAttribute("aria-current", "true");

		await userEvent.click(page3);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ page: 3 });

		await expect.element(page2).toHaveAttribute("aria-current", "false");
		await expect.element(page3).toHaveAttribute("aria-current", "true");
	});

	test("page, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Pagination
				total={10}
				page={2}
				onChange={handleChange}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		);
		const page2 = page.getByRole("button", { name: "2", exact: true });
		const page3 = page.getByRole("button", { name: "3", exact: true });

		await expect.element(page2).toHaveAttribute("aria-current", "true");

		await userEvent.click(page3);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({ page: 3 });

		// Stays the same because it's controlled
		await expect.element(page2).toHaveAttribute("aria-current", "true");
		await expect.element(page3).toHaveAttribute("aria-current", "false");
	});

	test("previous and next buttons", async () => {
		const handleChange = vi.fn();
		await render(
			<Pagination
				total={10}
				defaultPage={9}
				onChange={handleChange}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
				pageAriaLabel={(args) => `Page ${args.page}`}
			/>
		);
		const prevButton = page.getByLabelText("Previous");
		const nextButton = page.getByLabelText("Next");

		await userEvent.click(nextButton);

		expect(handleChange).toHaveBeenLastCalledWith({ page: 10 });
		await expect
			.element(page.getByLabelText("Page 10", { exact: true }))
			.toHaveAttribute("aria-current", "true");
		await expect.element(nextButton).toBeDisabled();

		await userEvent.click(prevButton);

		expect(handleChange).toHaveBeenLastCalledWith({ page: 9 });
		await expect
			.element(page.getByLabelText("Page 9", { exact: true }))
			.toHaveAttribute("aria-current", "true");
		expect(handleChange).toHaveBeenCalledTimes(2);
	});

	test("className, attributes", async () => {
		await render(
			<Pagination
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				total={10}
				previousAriaLabel="Previous"
				nextAriaLabel="Next"
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
