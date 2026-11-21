import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Radio from "@/components/Radio";
import { render } from "@/tests/render";

describe("Components/Radio", () => {
	test("name, value", async () => {
		await render(
			<Radio name="test-name" value="test-value">
				Content
			</Radio>
		);
		const input = page.getByRole("radio");

		await expect.element(input).toHaveAttribute("value", "test-value");
		await expect.element(input).toHaveAttribute("name", "test-name");
		await expect.element(input).not.toBeChecked();
	});

	test("checked, controlled", async () => {
		await render(
			<Radio name="test-name" value="test-value" checked onChange={() => {}}>
				Content
			</Radio>
		);

		await expect.element(page.getByRole("radio")).toBeChecked();
	});

	test("checked false, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Radio name="test-name" value="test-value" checked={false} onChange={handleChange}>
				Content
			</Radio>
		);
		const input = page.getByRole("radio");

		await expect.element(input).not.toBeChecked();
		await userEvent.click(page.getByText("Content"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: true,
			event: expect.objectContaining({ target: input.element() }),
		});

		// Still not checked because it's controlled
		await expect.element(input).not.toBeChecked();
	});

	test("defaultChecked, uncontrolled", async () => {
		await render(
			<Radio name="test-name" value="test-value" defaultChecked>
				Content
			</Radio>
		);

		await expect.element(page.getByRole("radio")).toBeChecked();
	});

	test("defaultChecked false, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<Radio name="test-name" value="test-value" onChange={handleChange}>
				Content
			</Radio>
		);
		const input = page.getByRole("radio");

		await expect.element(input).not.toBeChecked();
		await userEvent.click(page.getByText("Content"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: true,
			event: expect.objectContaining({ target: input.element() }),
		});

		await expect.element(input).toBeChecked();
	});

	test("disabled doesn't trigger onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<Radio name="test-name" value="test-value" disabled onChange={handleChange}>
				Content
			</Radio>
		);
		const input = page.getByRole("radio");

		await expect.element(input).toBeDisabled();
		await userEvent.click(page.getByText("Content"), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(input).not.toBeChecked();
	});

	test("hasError sets aria-invalid", async () => {
		await render(
			<Radio name="test-name" value="test-value" hasError>
				Content
			</Radio>
		);

		await expect.element(page.getByRole("radio")).toHaveAttribute("aria-invalid", "true");
	});

	test("className, attributes", async () => {
		await render(
			<Radio
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				inputAttributes={{ "aria-describedby": "test-description" }}
				value="value"
			>
				Content
			</Radio>
		);
		const el = page.getByTestId("root");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
		await expect
			.element(page.getByRole("radio"))
			.toHaveAttribute("aria-describedby", "test-description");
	});
});
