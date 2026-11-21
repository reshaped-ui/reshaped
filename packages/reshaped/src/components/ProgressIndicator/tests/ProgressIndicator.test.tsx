import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import ProgressIndicator from "@/components/ProgressIndicator";
import { render } from "@/tests/render";

describe("Components/ProgressIndicator", () => {
	test("ariaLabel", async () => {
		await render(<ProgressIndicator total={10} ariaLabel="Progress" />);
		const progress = page.getByRole("progressbar");

		await expect.element(progress).toHaveAttribute("aria-valuenow", "0");
		await expect.element(progress).toHaveAttribute("aria-valuemin", "0");
		await expect.element(progress).toHaveAttribute("aria-valuemax", "9");
		await expect.element(progress).toHaveAccessibleName("Progress");
	});

	test("activeIndex", async () => {
		const screen = await render(<ProgressIndicator total={10} ariaLabel="Progress" />);
		const progress = page.getByRole("progressbar");

		await screen.rerender(<ProgressIndicator total={10} activeIndex={5} ariaLabel="Progress" />);

		await expect.element(progress).toHaveAttribute("aria-valuenow", "5");
	});

	test("no progressbar role without ariaLabel", async () => {
		await render(<ProgressIndicator total={10} />);

		await expect.element(page.getByRole("progressbar")).not.toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<ProgressIndicator
				total={10}
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
