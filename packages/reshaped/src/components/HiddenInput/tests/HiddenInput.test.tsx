import React, { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import CheckboxGroup from "@/components/CheckboxGroup";
import FormControl from "@/components/FormControl";
import HiddenInput from "@/components/HiddenInput";
import RadioGroup from "@/components/RadioGroup";
import { render } from "@/tests/render";

/**
 * HiddenInput is a 1px transparent input that Playwright can't click directly ("outside of the viewport"),
 * so tests interact with it through a visible label, the same way it's used in the composition story.
 */
const Label = (props: { text: string; children: React.ReactNode }) => (
	<label style={{ position: "relative", display: "block" }}>
		{props.text}
		{props.children}
	</label>
);

describe("Utility components/HiddenInput", () => {
	test("type", async () => {
		await render(
			<>
				<HiddenInput type="checkbox" name="test-checkbox-name" value="test-checkbox-value" />
				<HiddenInput type="radio" name="test-radio-name" value="test-radio-value" />
			</>
		);
		const checkbox = page.getByRole("checkbox");
		const radio = page.getByRole("radio");

		await expect.element(checkbox).toHaveAttribute("type", "checkbox");
		await expect.element(checkbox).toHaveAttribute("name", "test-checkbox-name");
		await expect.element(checkbox).toHaveAttribute("value", "test-checkbox-value");
		await expect.element(checkbox).not.toBeChecked();

		await expect.element(radio).toHaveAttribute("type", "radio");
		await expect.element(radio).toHaveAttribute("name", "test-radio-name");
		await expect.element(radio).toHaveAttribute("value", "test-radio-value");
		await expect.element(radio).not.toBeChecked();
	});

	test("checked, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<Label text="Field">
				<HiddenInput
					type="checkbox"
					name="test-name"
					value="test-value"
					checked
					onChange={handleChange}
				/>
			</Label>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByText("Field"));

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
			<Label text="Field">
				<HiddenInput
					type="checkbox"
					name="test-name"
					value="test-value"
					defaultChecked
					onChange={handleChange}
				/>
			</Label>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeChecked();
		await userEvent.click(page.getByText("Field"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "test-value",
			checked: false,
			event: expect.objectContaining({ target: input.element() }),
		});

		// Now unchecked because it's uncontrolled
		await expect.element(input).not.toBeChecked();
	});

	test("disabled", async () => {
		const handleChange = vi.fn();
		await render(
			<Label text="Field">
				<HiddenInput
					type="checkbox"
					name="test-name"
					value="test-value"
					disabled
					onChange={handleChange}
				/>
			</Label>
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toBeDisabled();
		await userEvent.click(page.getByText("Field"), { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(input).not.toBeChecked();
	});

	test("className, attributes", async () => {
		await render(
			<HiddenInput type="checkbox" className="test-classname" attributes={{ id: "test-id" }} />
		);
		const input = page.getByRole("checkbox");

		await expect.element(input).toHaveClass("test-classname");
		await expect.element(input).toHaveAttribute("id", "test-id");
	});

	test("attributes: onFocus, onBlur", async () => {
		const handleFocus = vi.fn();
		const handleBlur = vi.fn();
		await render(
			<div>
				<Label text="Field">
					<HiddenInput
						type="checkbox"
						name="test-name"
						value="test-value"
						attributes={{ onFocus: handleFocus, onBlur: handleBlur }}
					/>
				</Label>
				<button type="button">Other element</button>
			</div>
		);
		const input = page.getByRole("checkbox");

		await userEvent.click(page.getByText("Field"));

		await expect.element(input).toHaveFocus();
		expect(handleFocus).toHaveBeenCalledTimes(1);
		expect(handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target: input.element() }));

		await userEvent.click(page.getByRole("button"));

		expect(handleBlur).toHaveBeenCalledTimes(1);
		expect(handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target: input.element() }));
	});

	test("CheckboxGroup", async () => {
		const handleChange = vi.fn();
		await render(
			<CheckboxGroup name="test-name" onChange={handleChange} value={["1"]}>
				<Label text="One">
					<HiddenInput type="checkbox" value="1" />
				</Label>
				<Label text="Two">
					<HiddenInput type="checkbox" value="2" />
				</Label>
			</CheckboxGroup>
		);
		const first = page.getByRole("checkbox", { name: "One" });
		const second = page.getByRole("checkbox", { name: "Two" });

		await expect.element(first).toHaveAttribute("name", "test-name");
		await expect.element(first).toBeChecked();
		await expect.element(second).not.toBeChecked();

		await userEvent.click(page.getByText("Two"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: ["1", "2"],
			event: expect.objectContaining({ target: second.element() }),
		});

		await expect.element(first).toBeChecked();
		await expect.element(second).toBeChecked();
	});

	test("RadioGroup", async () => {
		const handleChange = vi.fn();
		await render(
			<RadioGroup name="test-name" onChange={handleChange} defaultValue="1">
				<Label text="One">
					<HiddenInput type="radio" value="1" />
				</Label>
				<Label text="Two">
					<HiddenInput type="radio" value="2" />
				</Label>
			</RadioGroup>
		);
		const first = page.getByRole("radio", { name: "One" });
		const second = page.getByRole("radio", { name: "Two" });

		await expect.element(first).toHaveAttribute("name", "test-name");
		await expect.element(first).toBeChecked();
		await expect.element(second).not.toBeChecked();

		await userEvent.click(page.getByText("Two"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2",
			event: expect.objectContaining({ target: second.element() }),
		});

		await expect.element(first).not.toBeChecked();
		await expect.element(second).toBeChecked();
	});

	test("FormControl disabled", async () => {
		await render(
			<FormControl disabled>
				<HiddenInput type="radio" value="1" />
			</FormControl>
		);

		await expect.element(page.getByRole("radio")).toBeDisabled();
	});

	test("composition with a controlled CheckboxGroup", async () => {
		const Composition = () => {
			const [value, setValue] = useState<string[]>([]);

			return (
				<CheckboxGroup name="categories" value={value} onChange={(args) => setValue(args.value)}>
					<Label text="React">
						<HiddenInput type="checkbox" value="React" />
					</Label>
				</CheckboxGroup>
			);
		};
		await render(<Composition />);
		const input = page.getByRole("checkbox", { name: "React" });

		await userEvent.click(page.getByText("React"));
		await expect.element(input).toBeChecked();

		await userEvent.click(page.getByText("React"));
		await expect.element(input).not.toBeChecked();
	});

	test("onChange without name", async () => {
		const handleChange = vi.fn();
		await render(
			<Label text="Field">
				<HiddenInput type="checkbox" value="test-value" onChange={handleChange} />
			</Label>
		);

		await userEvent.click(page.getByText("Field"));

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith(
			expect.objectContaining({ value: "test-value", checked: true })
		);
	});

	test("disabled precedence", async () => {
		await render(
			<FormControl disabled={false}>
				<CheckboxGroup name="test-name" disabled>
					<HiddenInput type="checkbox" value="test-value" />
				</CheckboxGroup>
			</FormControl>
		);

		await expect.element(page.getByRole("checkbox")).toBeDisabled();
	});
});
