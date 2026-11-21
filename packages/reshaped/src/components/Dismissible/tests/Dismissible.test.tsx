import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Dismissible from "@/components/Dismissible";
import { render } from "@/tests/render";

describe("Utility components/Dismissible", () => {
	test("onClose, closeAriaLabel", async () => {
		const handleClose = vi.fn();
		await render(
			<Dismissible closeAriaLabel="Close" onClose={handleClose}>
				Content
			</Dismissible>
		);
		const button = page.getByRole("button");

		await userEvent.click(button);

		await expect.element(button).toHaveAttribute("aria-label", "Close");
		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith();
	});

	test("className, attributes", async () => {
		await render(
			<Dismissible
				closeAriaLabel="Close"
				onClose={() => {}}
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			>
				Content
			</Dismissible>
		);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
	});
});
