import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import FormControl from "@/components/FormControl";
import TextArea from "@/components/TextArea";
import { render } from "@/tests/render";

describe("Components/TextArea", () => {
	test("base", async () => {
		await render(<TextArea name="test-name" inputAttributes={{ "aria-label": "Label" }} />);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveAttribute("name", "test-name");
		await expect.element(input).toHaveAccessibleName("Label");
	});

	test("placeholder", async () => {
		await render(
			<TextArea
				name="test-name"
				placeholder="Placeholder"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveValue("");
		await expect.element(input).toHaveAttribute("placeholder", "Placeholder");
	});

	test("id", async () => {
		await render(
			<TextArea name="test-name" id="test-id" inputAttributes={{ "aria-label": "Label" }} />
		);

		await expect.element(page.getByRole("textbox")).toHaveAttribute("id", "test-id");
	});

	test("disabled", async () => {
		const handleChange = vi.fn();
		await render(
			<TextArea
				name="test-name"
				disabled
				onChange={handleChange}
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toBeDisabled();
		await userEvent.click(input, { force: true });
		await userEvent.keyboard("2");

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(input).toHaveValue("");
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<TextArea
				name="test-name"
				defaultValue="value"
				onChange={handleChange}
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveValue("value");

		input.element().focus();
		await userEvent.keyboard("2");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input.element() }),
		});
		await expect.element(input).toHaveValue("2value");
	});

	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<TextArea
				name="test-name"
				value="value"
				onChange={handleChange}
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveValue("value");

		input.element().focus();
		await userEvent.keyboard("2");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input.element() }),
		});
		await expect.element(input).toHaveValue("value");
	});

	test("className, attributes", async () => {
		await render(
			<TextArea
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				name="name"
				inputAttributes={{ id: "test-input-id", "aria-label": "Label" }}
			/>
		);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(page.getByRole("textbox")).toHaveAttribute("id", "test-input-id");
	});

	test("FormControl", async () => {
		await render(
			<FormControl hasError>
				<FormControl.Label>Name</FormControl.Label>
				<TextArea name="name" />
				<FormControl.Helper>Helper</FormControl.Helper>
				<FormControl.Error>This field is required</FormControl.Error>
			</FormControl>
		);
		const input = page.getByRole("textbox");

		await expect.element(input).toHaveAccessibleName("Name");
		await expect.element(input).toHaveAccessibleDescription("Helper This field is required");
	});
});
