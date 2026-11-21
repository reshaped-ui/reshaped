import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Badge from "@/components/Badge";
import { render } from "@/tests/render";

describe("Components/Badge", () => {
	test("onDismiss, dismissAriaLabel", async () => {
		const handleDismiss = vi.fn();
		await render(
			<Badge onDismiss={handleDismiss} dismissAriaLabel="Dismiss">
				Badge
			</Badge>
		);
		const dismissTrigger = page.getByRole("button", { name: "Dismiss" });

		await expect.element(dismissTrigger).toHaveAccessibleName("Dismiss");

		await userEvent.click(dismissTrigger);

		expect(handleDismiss).toHaveBeenCalledTimes(1);
		expect(handleDismiss).toHaveBeenCalledWith();
	});

	test("onDismiss doesn't trigger onClick", async () => {
		const handleClick = vi.fn();
		const handleDismiss = vi.fn();
		await render(
			<Badge onClick={handleClick} onDismiss={handleDismiss} dismissAriaLabel="Dismiss">
				Badge
			</Badge>
		);

		await userEvent.click(page.getByRole("button", { name: "Dismiss", exact: true }));

		expect(handleDismiss).toHaveBeenCalledTimes(1);
		expect(handleClick).not.toHaveBeenCalled();
	});

	test("href", async () => {
		await render(
			<Badge href="https://reshaped.so" dismissAriaLabel="Dismiss">
				Badge
			</Badge>
		);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "https://reshaped.so");
	});

	test("href, onDismiss", async () => {
		const handleDismiss = vi.fn();
		const initialHash = window.location.hash;
		await render(
			<Badge href="#badge-dismiss" onDismiss={handleDismiss} dismissAriaLabel="Dismiss">
				Badge
			</Badge>
		);

		await expect.element(page.getByRole("link")).toHaveAttribute("href", "#badge-dismiss");

		await userEvent.click(page.getByRole("button", { name: "Dismiss" }));

		expect(handleDismiss).toHaveBeenCalledTimes(1);
		// Dismissing the badge shouldn't follow the link
		expect(window.location.hash).toBe(initialHash);
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<Badge onClick={handleClick}>Badge</Badge>);
		const button = page.getByRole("button");

		await userEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
		expect(button.element().contains(handleClick.mock.calls[0][0].target)).toBe(true);
	});

	test("renders a span without onClick or href", async () => {
		await render(<Badge>Badge</Badge>);

		await expect.element(page.getByRole("button")).not.toBeInTheDocument();
		await expect.element(page.getByRole("link")).not.toBeInTheDocument();
	});

	test("className, attributes", async () => {
		await render(
			<Badge
				color="primary"
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
			/>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
