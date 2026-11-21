import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Checkbox from "@/components/Checkbox";
import CheckboxGroup from "@/components/CheckboxGroup";
import { render } from "@/tests/render";

describe("Components/CheckboxGroup", () => {
	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<CheckboxGroup name="test-name" value={["1"]} onChange={handleChange}>
				{/* checked should be ignored */}
				<Checkbox value="1" checked={false}>
					Content
				</Checkbox>

				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		);
		const inputs = page.getByRole("checkbox");

		await expect.element(inputs.nth(0)).toBeChecked();
		await userEvent.click(page.getByText("Content 2"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: ["1", "2"],
			event: expect.objectContaining({ target: inputs.nth(1).element() }),
		});

		// Still checked because it's controlled
		await expect.element(inputs.nth(0)).toBeChecked();
		await expect.element(inputs.nth(1)).not.toBeChecked();
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<CheckboxGroup name="test-name" defaultValue={["1"]} onChange={handleChange}>
				{/* checked should be ignored */}
				<Checkbox value="1" checked={false}>
					Content
				</Checkbox>

				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		);
		const inputs = page.getByRole("checkbox");

		await expect.element(inputs.nth(0)).toBeChecked();
		await userEvent.click(page.getByText("Content 2"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: ["1", "2"],
			event: expect.objectContaining({ target: inputs.nth(1).element() }),
		});

		await expect.element(inputs.nth(0)).toBeChecked();
		await expect.element(inputs.nth(1)).toBeChecked();
	});

	test("unchecking removes the value", async () => {
		const handleChange = vi.fn();
		await render(
			<CheckboxGroup name="test-name" defaultValue={["1", "2"]} onChange={handleChange}>
				<Checkbox value="1">Content</Checkbox>
				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		);
		const inputs = page.getByRole("checkbox");

		await userEvent.click(page.getByText("Content", { exact: true }));

		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ name: "test-name", value: ["2"] })
		);
		await expect.element(inputs.nth(0)).not.toBeChecked();
		await expect.element(inputs.nth(1)).toBeChecked();
	});

	test("name is passed to the inputs", async () => {
		await render(
			<CheckboxGroup name="test-name">
				<Checkbox value="1">Content</Checkbox>
				<Checkbox value="2">Content 2</Checkbox>
			</CheckboxGroup>
		);
		const inputs = page.getByRole("checkbox");

		await expect.element(inputs.nth(0)).toHaveAttribute("name", "test-name");
		await expect.element(inputs.nth(1)).toHaveAttribute("name", "test-name");
	});

	test("disabled", async () => {
		const handleChange = vi.fn();
		await render(
			<CheckboxGroup name="test-name" disabled onChange={handleChange}>
				<Checkbox value="test-value">Item 1</Checkbox>
				<Checkbox value="test-value-2">Item 2</Checkbox>
			</CheckboxGroup>
		);
		const inputs = page.getByRole("checkbox");

		await expect.element(inputs.nth(0)).toBeDisabled();
		await expect.element(inputs.nth(1)).toBeDisabled();

		await userEvent.click(page.getByText("Item 1"), { force: true });
		expect(handleChange).not.toHaveBeenCalled();
	});
});
