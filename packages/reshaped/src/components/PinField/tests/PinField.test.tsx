import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import FormControl from "@/components/FormControl";
import PinField from "@/components/PinField";
import { render } from "@/tests/render";

const getInput = () => page.getByRole("textbox");

const expectSelection = async (start: number, end: number) => {
	const el = getInput().element() as HTMLInputElement;

	await expect.poll(() => [el.selectionStart, el.selectionEnd]).toEqual([start, end]);
};

describe("Components/PinField", () => {
	test("base", async () => {
		await render(<PinField name="test-name" inputAttributes={{ "aria-label": "Label" }} />);
		const input = getInput();

		await expect.element(input).toBeInTheDocument();
		await expect.element(input).toHaveAttribute("name", "test-name");
		await expect.element(input).toHaveAttribute("autocomplete", "one-time-code");
		await expect.element(input).toHaveAttribute("inputmode", "numeric");
		await expect.element(input).toHaveAttribute("maxlength", "4");
	});

	test("valueLength", async () => {
		await render(
			<PinField name="test-name" valueLength={6} inputAttributes={{ "aria-label": "Label" }} />
		);

		await expect.element(getInput()).toHaveAttribute("maxlength", "6");
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<PinField
				name="test-name"
				onChange={handleChange}
				defaultValue="12"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		input.element().focus();
		await userEvent.keyboard("3");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			value: "123",
			name: "test-name",
			event: expect.objectContaining({ target: input.element() }),
		});
		await expect.element(input).toHaveValue("123");
	});

	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<PinField
				name="test-name"
				onChange={handleChange}
				value="12"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		input.element().focus();
		await userEvent.keyboard("3");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenCalledWith({
			value: "123",
			name: "test-name",
			event: expect.objectContaining({ target: input.element() }),
		});
		await expect.element(input).toHaveValue("12");
	});

	test("pattern", async () => {
		const handleChange = vi.fn();
		await render(
			<PinField
				name="test-name"
				pattern="alphabetic"
				defaultValue="ab"
				onChange={handleChange}
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		input.element().focus();
		await userEvent.keyboard("3");

		await expect.element(input).toHaveValue("ab");
		expect(handleChange).toHaveBeenCalledTimes(0);

		await userEvent.keyboard("c");

		await expect.element(input).toHaveValue("abc");
		expect(handleChange).toHaveBeenCalledTimes(1);
	});

	test("className, attributes", async () => {
		await render(
			<PinField
				name="test-name"
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				inputAttributes={{ "aria-label": "Label", id: "test-input-id" }}
			/>
		);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(page.getByLabelText("Label")).toHaveAttribute("id", "test-input-id");
	});

	test("FormControl", async () => {
		await render(
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<PinField name="test-name" />
			</FormControl>
		);

		await expect.element(getInput()).toHaveAccessibleName("Label");
	});

	test("keyboard navigation", async () => {
		await render(<PinField name="test-name" inputAttributes={{ "aria-label": "Label" }} />);
		const input = getInput();

		input.element().focus();
		await expectSelection(0, 0);

		await userEvent.keyboard("1");
		await expectSelection(1, 1);

		await userEvent.keyboard("234");
		await expectSelection(3, 4);

		// Move back to the first character
		await userEvent.keyboard("{ArrowLeft}");
		await expectSelection(2, 3);
		await userEvent.keyboard("{ArrowLeft}");
		await expectSelection(1, 2);
		await userEvent.keyboard("{ArrowLeft}");
		await expectSelection(0, 1);

		// Move to the third character
		await userEvent.keyboard("{ArrowRight}");
		await expectSelection(1, 2);
		await userEvent.keyboard("{ArrowRight}");
		await expectSelection(2, 3);

		await expect.element(input).toHaveValue("1234");
		await userEvent.keyboard("{Backspace}");
		await expect.element(input).toHaveValue("124");
		await expectSelection(2, 3);

		// Switched to type mode
		await userEvent.keyboard("{ArrowRight}");
		await expectSelection(3, 3);

		// Can't move further
		await userEvent.keyboard("{ArrowRight}");
		await expectSelection(3, 3);
	});
});
