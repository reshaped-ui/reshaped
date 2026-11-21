import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Radio from "@/components/Radio";
import RadioGroup from "@/components/RadioGroup";
import { render } from "@/tests/render";

describe("Components/RadioGroup", () => {
	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<RadioGroup name="test-name" value="1" onChange={handleChange}>
				{/* checked should be ignored */}
				<Radio value="1" checked={false}>
					Content
				</Radio>

				<Radio value="2">Content 2</Radio>
			</RadioGroup>
		);
		const inputs = page.getByRole("radio");

		await expect.element(inputs.nth(0)).toBeChecked();
		await userEvent.click(page.getByText("Content 2"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2",
			event: expect.objectContaining({ target: inputs.nth(1).element() }),
		});

		// Still checked because it's controlled
		await expect.element(inputs.nth(0)).toBeChecked();
		await expect.element(inputs.nth(1)).not.toBeChecked();
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<RadioGroup name="test-name" defaultValue="1" onChange={handleChange}>
				{/* checked should be ignored */}
				<Radio value="1" checked={false}>
					Content
				</Radio>

				<Radio value="2">Content 2</Radio>
			</RadioGroup>
		);
		const inputs = page.getByRole("radio");

		await expect.element(inputs.nth(0)).toBeChecked();
		await userEvent.click(page.getByText("Content 2"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2",
			event: expect.objectContaining({ target: inputs.nth(1).element() }),
		});

		await expect.element(inputs.nth(0)).not.toBeChecked();
		await expect.element(inputs.nth(1)).toBeChecked();
	});

	test("name is passed to the inputs", async () => {
		await render(
			<RadioGroup name="test-name">
				<Radio value="1">Content</Radio>
				<Radio value="2">Content 2</Radio>
			</RadioGroup>
		);
		const inputs = page.getByRole("radio");

		await expect.element(inputs.nth(0)).toHaveAttribute("name", "test-name");
		await expect.element(inputs.nth(1)).toHaveAttribute("name", "test-name");
	});

	test("disabled", async () => {
		const handleChange = vi.fn();
		await render(
			<RadioGroup name="test-name" disabled onChange={handleChange}>
				<Radio value="test-value">Content</Radio>
			</RadioGroup>
		);
		const input = page.getByRole("radio");

		await expect.element(input).toBeDisabled();
		await userEvent.click(page.getByText("Content"), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
	});
});
