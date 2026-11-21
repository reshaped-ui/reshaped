import { describe, expect, test } from "vitest";
import { page } from "vitest/browser";

import FormControl from "@/components/FormControl";
import Radio from "@/components/Radio";
import RadioGroup from "@/components/RadioGroup";
import TextField from "@/components/TextField";
import { render } from "@/tests/render";

describe("Utility components/FormControl", () => {
	test("label and helper are linked to the field", async () => {
		await render(
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<TextField name="name" />
				<FormControl.Helper>Caption</FormControl.Helper>
				<FormControl.Error>Error</FormControl.Error>
			</FormControl>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveAccessibleName("Label");
		await expect.element(input).toHaveAccessibleDescription("Caption");
		await expect.element(page.getByText("Error")).not.toBeInTheDocument();
	});

	test("hasError links the error to the field", async () => {
		await render(
			<FormControl hasError>
				<FormControl.Label>Label</FormControl.Label>
				<TextField name="name" />
				<FormControl.Helper>Caption</FormControl.Helper>
				<FormControl.Error>Error</FormControl.Error>
			</FormControl>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveAccessibleName("Label");
		await expect.element(input).toHaveAccessibleDescription("Caption Error");
	});

	test("disabled", async () => {
		await render(
			<FormControl disabled>
				<FormControl.Label>Label</FormControl.Label>
				<TextField name="name" />
			</FormControl>
		);

		await expect.element(page.getByRole("textbox")).toBeDisabled();
	});

	test("id", async () => {
		await render(
			<FormControl id="test-id" hasError>
				<FormControl.Label>Label</FormControl.Label>
				<TextField name="name" />
				<FormControl.Helper>Caption</FormControl.Helper>
				<FormControl.Error>Error</FormControl.Error>
			</FormControl>
		);
		const input = page.getByRole("textbox");
		const label = page.getByText("Label");

		await expect.element(input).toHaveAttribute("id", "test-id");
		await expect
			.element(input)
			.toHaveAttribute("aria-describedby", "test-id-caption test-id-error");
		await expect.element(label).toHaveAttribute("for", "test-id");
		await expect.element(label).toHaveAttribute("id", "test-id-label");
	});

	test("group", async () => {
		await render(
			<FormControl group>
				<FormControl.Label>Label</FormControl.Label>
				<RadioGroup name="name">
					<Radio value="1">One</Radio>
					<Radio value="2">Two</Radio>
				</RadioGroup>
				<FormControl.Helper>Caption</FormControl.Helper>
			</FormControl>
		);
		const group = page.getByRole("group");

		await expect.element(group).toHaveAccessibleDescription("Caption");

		// Group fields don't receive the FormControl attributes
		for (const radio of page.getByRole("radio").all()) {
			await expect.element(radio).not.toHaveAttribute("id");
			await expect.element(radio).not.toHaveAttribute("aria-describedby");
		}
		expect(page.getByRole("radio").all()).toHaveLength(2);
	});
});
