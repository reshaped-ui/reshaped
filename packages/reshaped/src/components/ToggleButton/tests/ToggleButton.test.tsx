import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import ToggleButton from "@/components/ToggleButton";
import { render } from "@/tests/render";

const isWithin = (el: Element) => (target: Node) => el.contains(target);

describe("Components/ToggleButton", () => {
	test("defaultChecked, onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<ToggleButton defaultChecked onChange={handleChange} value="1">
				Button
			</ToggleButton>
		);
		const button = page.getByRole("button");

		await expect.element(button).toHaveAttribute("aria-pressed", "true");
		await userEvent.click(button);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			checked: false,
			value: "1",
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button.element())) }),
		});
		await expect.element(button).toHaveAttribute("aria-pressed", "false");

		await userEvent.click(button);

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			checked: true,
			value: "1",
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button.element())) }),
		});
		await expect.element(button).toHaveAttribute("aria-pressed", "true");
	});

	test("checked, onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<ToggleButton checked onChange={handleChange} value="2">
				Button
			</ToggleButton>
		);
		const button = page.getByRole("button");

		await userEvent.click(button);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			checked: false,
			value: "2",
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button.element())) }),
		});

		await userEvent.click(button);

		// Stayed checked after the first click
		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			checked: false,
			value: "2",
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button.element())) }),
		});
		await expect.element(button).toHaveAttribute("aria-pressed", "true");
	});

	test("onClick", async () => {
		const handleClick = vi.fn();
		await render(<ToggleButton onClick={handleClick}>Button</ToggleButton>);
		const button = page.getByRole("button");

		await userEvent.click(button);

		expect(handleClick).toHaveBeenCalledOnce();
		expect(button.element().contains(handleClick.mock.lastCall?.[0].target)).toBe(true);
	});

	test("disabled doesn't trigger onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<ToggleButton disabled onChange={handleChange}>
				Button
			</ToggleButton>
		);
		const button = page.getByRole("button");

		await expect.element(button).toBeDisabled();
		await userEvent.click(button, { force: true });

		expect(handleChange).not.toHaveBeenCalled();
		await expect.element(button).toHaveAttribute("aria-pressed", "false");
	});
});
