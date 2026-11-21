import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import ToggleButton from "@/components/ToggleButton";
import ToggleButtonGroup from "@/components/ToggleButtonGroup";
import { render } from "@/tests/render";

const isWithin = (el: Element) => (target: Node) => el.contains(target);

describe("Components/ToggleButtonGroup", () => {
	test("single, uncontrolled, onChange", async () => {
		const handleChange = vi.fn();
		const handleItemChange = vi.fn();
		await render(
			<ToggleButtonGroup onChange={handleChange}>
				<ToggleButton value="1" onChange={handleItemChange}>
					Button 1
				</ToggleButton>
				<ToggleButton value="2">Button 2</ToggleButton>
			</ToggleButtonGroup>
		);
		const button1 = page.getByRole("button", { name: "Button 1" });
		const button2 = page.getByRole("button", { name: "Button 2" });

		await userEvent.click(button1);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["1"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button1.element())) }),
		});
		await expect.element(button1).toHaveAttribute("aria-pressed", "true");

		await userEvent.click(button2);

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["2"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button2.element())) }),
		});
		await expect.element(button1).toHaveAttribute("aria-pressed", "false");
		await expect.element(button2).toHaveAttribute("aria-pressed", "true");

		// Group handles the change instead of the item
		expect(handleItemChange).not.toHaveBeenCalled();
	});

	test("single, controlled, onChange", async () => {
		const handleChange = vi.fn();
		const handleItemChange = vi.fn();
		await render(
			<ToggleButtonGroup onChange={handleChange} value={[]}>
				<ToggleButton value="3" onChange={handleItemChange}>
					Button 3
				</ToggleButton>
				<ToggleButton value="4">Button 4</ToggleButton>
			</ToggleButtonGroup>
		);
		const button3 = page.getByRole("button", { name: "Button 3" });
		const button4 = page.getByRole("button", { name: "Button 4" });

		await userEvent.click(button3);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["3"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button3.element())) }),
		});

		await userEvent.click(button4);

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["4"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button4.element())) }),
		});

		// Value is controlled, so nothing gets selected
		await expect.element(button3).toHaveAttribute("aria-pressed", "false");
		await expect.element(button4).toHaveAttribute("aria-pressed", "false");
		expect(handleItemChange).not.toHaveBeenCalled();
	});

	test("selectionMode multiple, uncontrolled, onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<ToggleButtonGroup onChange={handleChange} selectionMode="multiple">
				<ToggleButton value="1">Button 1</ToggleButton>
				<ToggleButton value="2">Button 2</ToggleButton>
			</ToggleButtonGroup>
		);
		const button1 = page.getByRole("button", { name: "Button 1" });
		const button2 = page.getByRole("button", { name: "Button 2" });

		await userEvent.click(button1);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["1"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button1.element())) }),
		});

		await userEvent.click(button2);

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["1", "2"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button2.element())) }),
		});
		await expect.element(button1).toHaveAttribute("aria-pressed", "true");
		await expect.element(button2).toHaveAttribute("aria-pressed", "true");

		await userEvent.click(button1);

		expect(handleChange).toHaveBeenCalledTimes(3);
		expect(handleChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["2"] }));
		await expect.element(button1).toHaveAttribute("aria-pressed", "false");
	});

	test("selectionMode multiple, controlled, onChange", async () => {
		const handleChange = vi.fn();
		await render(
			<ToggleButtonGroup onChange={handleChange} value={[]} selectionMode="multiple">
				<ToggleButton value="3">Button 3</ToggleButton>
				<ToggleButton value="4">Button 4</ToggleButton>
			</ToggleButtonGroup>
		);
		const button3 = page.getByRole("button", { name: "Button 3" });
		const button4 = page.getByRole("button", { name: "Button 4" });

		await userEvent.click(button3);

		expect(handleChange).toHaveBeenCalledTimes(1);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["3"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button3.element())) }),
		});

		await userEvent.click(button4);

		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenLastCalledWith({
			value: ["4"],
			event: expect.objectContaining({ target: expect.toSatisfy(isWithin(button4.element())) }),
		});
	});

	test("keyboard navigation", async () => {
		await render(
			<ToggleButtonGroup defaultValue={["2"]}>
				<ToggleButton value="1">Button 1</ToggleButton>
				<ToggleButton value="2">Button 2</ToggleButton>
				<ToggleButton value="3">Button 3</ToggleButton>
			</ToggleButtonGroup>
		);
		const button1 = page.getByRole("button", { name: "Button 1" });
		const button2 = page.getByRole("button", { name: "Button 2" });
		const button3 = page.getByRole("button", { name: "Button 3" });

		// Only the selected button is reachable with tab
		await expect.element(button1).toHaveAttribute("tabindex", "-1");
		await expect.element(button2).toHaveAttribute("tabindex", "0");

		await userEvent.tab();
		await expect.element(button2).toHaveFocus();

		await userEvent.keyboard("{ArrowRight}");
		await expect.element(button3).toHaveFocus();

		await userEvent.keyboard("{ArrowLeft}");
		await userEvent.keyboard("{ArrowLeft}");
		await expect.element(button1).toHaveFocus();
	});

	test("className, attributes", async () => {
		await render(
			<ToggleButtonGroup className="test-classname" attributes={{ id: "test-id" }}>
				<ToggleButton>Button 1</ToggleButton>
				<ToggleButton>Button 1</ToggleButton>
			</ToggleButtonGroup>
		);
		const el = page.getByRole("group");

		await expect.element(el).toHaveClass("test-classname");
		await expect.element(el).toHaveAttribute("id", "test-id");
	});
});
