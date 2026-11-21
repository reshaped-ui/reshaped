import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Checkbox from "@/components/Checkbox";
import { render } from "@/tests/render";

describe("Components/Checkbox", () => {
	test("name, value", async () => {
		await render(
			<Checkbox name="test-name" value="test-value">
				Content
			</Checkbox>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toHaveAttribute("value", "test-value");
		await expect.element(input).toHaveAttribute("name", "test-name");
		await expect.element(input).not.toBeChecked();
	});

	test("checked, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Checkbox name="test-name" value="test-value" checked onChange={handleChange}>
				Content
			</Checkbox>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByText("Content"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input.element() }),
		});

		// Still checked because it's controlled
		await expect.element(input).toBeChecked();
	});

	test("defaultChecked, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<Checkbox name="test-name" value="test-value" defaultChecked onChange={handleChange}>
				Content
			</Checkbox>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByText("Content"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input.element() }),
		});

		await expect.element(input).not.toBeChecked();
	});

	test("disabled doesn't trigger onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<Checkbox name="test-name" value="test-value" disabled onChange={handleChange}>
				Content
			</Checkbox>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeDisabled();
		await userEvent.click(page.getByText("Content"), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(input).not.toBeChecked();
	});

	test("indeterminate", async () => {
		await render(
			<Checkbox name="test-name" value="test-value" indeterminate>
				Content
			</Checkbox>
		);
		const input = page.getByRole("checkbox");

		await expect.poll(() => (input.element() as HTMLInputElement).indeterminate).toBe(true);
	});

	test("hasError sets aria-invalid", async () => {
		await render(
			<Checkbox name="test-name" value="test-value" hasError>
				Content
			</Checkbox>
		);

		await expect.element(page.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
	});

	test("className, attributes", async () => {
		await render(
			<Checkbox
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				inputAttributes={{ "aria-describedby": "test-description" }}
			>
				Content
			</Checkbox>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
		await expect
			.element(page.getByRole("checkbox"))
			.toHaveAttribute("aria-describedby", "test-description");
	});
});
