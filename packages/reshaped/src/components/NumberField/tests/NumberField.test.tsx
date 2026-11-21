import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import FormControl from "@/components/FormControl";
import NumberField from "@/components/NumberField";
import { render } from "@/tests/render";

const getInput = () => page.getByRole("textbox");
const getIncrease = () => page.getByRole("button", { name: "Increase" });
const getDecrease = () => page.getByRole("button", { name: "Decrease" });

describe("Components/NumberField", () => {
	test("base", async () => {
		await render(
			<NumberField
				name="test-name"
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);

		await expect.element(getInput()).toHaveAttribute("name", "test-name");
		await expect.element(getInput()).toHaveAccessibleName("Label");
		await expect.element(getIncrease()).toBeInTheDocument();
		await expect.element(getDecrease()).toBeInTheDocument();
	});

	test("disabled", async () => {
		const handleChange = vi.fn();
		await render(
			<NumberField
				name="test-name"
				onChange={handleChange}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				disabled
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);

		await expect.element(getInput()).toBeDisabled();

		await userEvent.click(getIncrease(), { force: true });
		expect(handleChange).not.toHaveBeenCalled();

		await userEvent.click(getDecrease(), { force: true });
		expect(handleChange).not.toHaveBeenCalled();
	});

	test("defaultValue, uncontrolled", async () => {
		const handleChange = vi.fn();
		await render(
			<NumberField
				name="test-name"
				defaultValue={2}
				onChange={handleChange}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		await expect.element(input).toHaveValue("2");

		input.element().focus();
		await userEvent.keyboard("3");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 23 });
		await expect.element(input).toHaveValue("23");

		await userEvent.click(getIncrease());

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 24 });
		await expect.element(input).toHaveValue("24");

		await userEvent.click(getDecrease());

		expect(handleChange).toHaveBeenCalledTimes(3);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 23 });
		await expect.element(input).toHaveValue("23");
	});

	test("value, controlled", async () => {
		const handleChange = vi.fn();
		await render(
			<NumberField
				name="test-name"
				value={2}
				onChange={handleChange}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		await expect.element(input).toHaveValue("2");

		input.element().focus();
		await userEvent.keyboard("3");

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 23 });
		await expect.element(input).toHaveValue("23");

		await userEvent.click(getIncrease());

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 24 });
		await expect.element(input).toHaveValue("23");

		await userEvent.click(getDecrease());

		expect(handleChange).toHaveBeenCalledTimes(3);
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 22 });
		await expect.element(input).toHaveValue("23");
	});

	test("min, max", async () => {
		await render(
			<NumberField
				name="test-name"
				defaultValue={6}
				min={5}
				max={10}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		await expect.element(input).toHaveValue("6");

		// Controls get aria-disabled at the limits, so the extra clicks need force
		for (let i = 0; i < 5; i++) await userEvent.click(getIncrease(), { force: true });

		await expect.element(input).toHaveValue("10");
		await expect.element(getIncrease()).toHaveAttribute("aria-disabled", "true");

		for (let i = 0; i < 6; i++) await userEvent.click(getDecrease(), { force: true });

		await expect.element(input).toHaveValue("5");
		await expect.element(getDecrease()).toHaveAttribute("aria-disabled", "true");
		await expect.element(getIncrease()).not.toHaveAttribute("aria-disabled");
	});

	test("min, max, clamp on blur", async () => {
		const handleChange = vi.fn();
		const handleBlur = vi.fn();
		await render(
			<>
				<NumberField
					name="test-name"
					defaultValue={6}
					min={5}
					max={10}
					onChange={handleChange}
					increaseAriaLabel="Increase"
					decreaseAriaLabel="Decrease"
					inputAttributes={{ "aria-label": "Label", onBlur: handleBlur }}
				/>
				<button type="button">Focusable</button>
			</>
		);
		const input = getInput();
		const button = page.getByRole("button", { name: "Focusable" });

		await userEvent.clear(input);
		await userEvent.type(input, "11");
		await expect.element(input).toHaveValue("11");
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 11 });

		await userEvent.click(button);
		await expect.element(input).toHaveValue("10");
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 10 });
		expect(handleBlur).toHaveBeenCalledTimes(1);

		await userEvent.clear(input);
		await userEvent.type(input, "3");
		await expect.element(input).toHaveValue("3");

		await userEvent.click(button);
		await expect.element(input).toHaveValue("5");
		expect(handleChange).toHaveBeenLastCalledWith({ name: "test-name", value: 5 });
		expect(handleBlur).toHaveBeenCalledTimes(2);
	});

	test("step", async () => {
		await render(
			<NumberField
				name="test-name"
				defaultValue={6}
				step={0.5}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		await expect.element(input).toHaveValue("6");
		await expect.element(input).toHaveAttribute("inputmode", "decimal");

		await userEvent.click(getIncrease());
		await expect.element(input).toHaveValue("6.5");

		await userEvent.click(getDecrease());
		await userEvent.click(getDecrease());
		await expect.element(input).toHaveValue("5.5");
	});

	test("className, attributes", async () => {
		await render(
			<NumberField
				className="test-classname"
				attributes={{ id: "test-id", "data-testid": "root" }}
				name="name"
				inputAttributes={{ id: "test-input-id", "aria-label": "Label" }}
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
			/>
		);
		const root = page.getByTestId("root");

		await expect.element(root).toHaveClass("test-classname");
		await expect.element(root).toHaveAttribute("id", "test-id");
		await expect.element(getInput()).toHaveAttribute("id", "test-input-id");
		await expect.element(getIncrease()).toHaveAttribute("aria-controls", "test-input-id");
	});

	test("FormControl", async () => {
		await render(
			<FormControl disabled>
				<FormControl.Label>Label</FormControl.Label>
				<NumberField name="name" increaseAriaLabel="Increase" decreaseAriaLabel="Decrease" />
				<FormControl.Helper>Helper</FormControl.Helper>
			</FormControl>
		);
		const input = getInput();

		await expect.element(input).toHaveAccessibleName("Label");
		await expect.element(input).toHaveAccessibleDescription("Helper");
		await expect.element(input).toBeDisabled();
		await expect.element(getIncrease()).toHaveAttribute("aria-disabled", "true");
	});

	test("keyboard", async () => {
		await render(
			<NumberField
				name="name"
				increaseAriaLabel="Increase"
				decreaseAriaLabel="Decrease"
				inputAttributes={{ "aria-label": "Label" }}
			/>
		);
		const input = getInput();

		input.element().focus();

		await userEvent.keyboard("-");
		await expect.element(input).toHaveValue("-");

		await userEvent.keyboard("1");
		await expect.element(input).toHaveValue("-1");

		await userEvent.keyboard("-");
		await expect.element(input).toHaveValue("-1");

		await userEvent.keyboard("2");
		await expect.element(input).toHaveValue("-12");

		await userEvent.keyboard("{ArrowUp}");
		await expect.element(input).toHaveValue("-11");

		await userEvent.keyboard("{ArrowDown}");
		await expect.element(input).toHaveValue("-12");

		await userEvent.keyboard(".");
		await expect.element(input).toHaveValue("-12.");

		await userEvent.keyboard("3");
		await expect.element(input).toHaveValue("-12.3");

		await userEvent.keyboard(".");
		await expect.element(input).toHaveValue("-12.3");

		await userEvent.keyboard("-");
		await expect.element(input).toHaveValue("-12.3");

		await userEvent.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}{ArrowUp}");
		await expect.element(input).toHaveValue("-7.3");

		await userEvent.keyboard("{ArrowDown}");
		await expect.element(input).toHaveValue("-8.3");
	});
});
