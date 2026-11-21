import React from "react";
import { describe, expect, test, vi } from "vitest";
import { page, userEvent } from "vitest/browser";

import Autocomplete, { type AutocompleteProps } from "@/components/Autocomplete";
import FormControl from "@/components/FormControl";
import useToggle from "@/hooks/useToggle";
import { render } from "@/tests/render";

const items = ["Pizza", "Pie", "Ice-cream"];

describe("Components/Autocomplete", () => {
	test("active, onOpen, onClose", async () => {
		const handleOpen = vi.fn();
		const handleClose = vi.fn();
		const Component = () => {
			const toggle = useToggle(true);
			const [value, setValue] = React.useState("");

			return (
				<FormControl>
					<FormControl.Label>Label</FormControl.Label>
					<Autocomplete
						name="fruit"
						placeholder="Pick your food"
						active={toggle.active}
						value={value}
						onChange={(args) => setValue(args.value)}
						onOpen={() => {
							handleOpen();
							toggle.activate();
						}}
						onClose={() => {
							handleClose();
							toggle.deactivate();
						}}
					>
						{items.map((v) => {
							if (!v.toLowerCase().includes(value.toLowerCase())) return;
							return (
								<Autocomplete.Item key={v} value={v}>
									{v}
								</Autocomplete.Item>
							);
						})}
					</Autocomplete>
				</FormControl>
			);
		};
		await render(<Component />);
		const list = page.getByRole("listbox");

		await expect.element(list).toBeInTheDocument();
		expect(handleOpen).not.toHaveBeenCalled();

		await userEvent.click(document.body);

		await vi.waitFor(() => {
			expect(handleClose).toHaveBeenCalledTimes(1);
			expect(handleClose).toHaveBeenLastCalledWith();
		});
		await expect.element(list).not.toBeInTheDocument();

		await userEvent.click(page.getByRole("combobox"));

		await vi.waitFor(() => {
			expect(handleOpen).toHaveBeenCalledTimes(1);
			expect(handleOpen).toHaveBeenLastCalledWith();
		});
		await expect.element(list).toBeInTheDocument();
	});

	test("onItemSelect, onBackspace, keyboard and click selection", async () => {
		const handleItemSelect = vi.fn();
		const handleBackspace = vi.fn();
		const Component = () => {
			const [value, setValue] = React.useState("");

			return (
				<FormControl>
					<FormControl.Label>Food</FormControl.Label>
					<Autocomplete
						name="fruit"
						placeholder="Pick your food"
						value={value}
						onChange={(args) => setValue(args.value)}
						onBackspace={handleBackspace}
						onItemSelect={handleItemSelect}
					>
						{items.map((v) => (
							<Autocomplete.Item key={v} value={v}>
								{v}
							</Autocomplete.Item>
						))}
					</Autocomplete>
				</FormControl>
			);
		};
		await render(<Component />);
		const input = page.getByRole("combobox");
		const options = page.getByRole("option");

		// Test keyboard selection after focusing the input
		input.element().focus();

		await expect.poll(() => options.elements()).toHaveLength(3);
		await expect.element(options.nth(0)).toHaveAttribute("tabindex", "0");
		await expect.element(options.nth(1)).toHaveAttribute("tabindex", "-1");

		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{Enter}");

		await expect.element(input).toHaveValue("Pie");
		expect(handleItemSelect).toHaveBeenCalledTimes(1);
		expect(handleItemSelect).toHaveBeenCalledWith({ value: "Pie", data: undefined });

		// Test click selection after opening with down arrow once the list is closed after the selection
		await expect.element(page.getByRole("listbox")).not.toBeInTheDocument();
		await expect.element(input).toHaveFocus();
		await userEvent.keyboard("{ArrowDown}");
		await expect.element(options.nth(0)).toBeVisible();

		await userEvent.click(options.nth(0));

		await expect.element(input).toHaveValue("Pizza");
		expect(handleItemSelect).toHaveBeenCalledTimes(2);
		expect(handleItemSelect).toHaveBeenLastCalledWith({ value: "Pizza" });

		input.element().focus();
		await userEvent.keyboard("{Backspace}");

		await vi.waitFor(() => {
			expect(handleBackspace).toHaveBeenCalledTimes(1);
			expect(handleBackspace).toHaveBeenCalledWith();
		});
	});

	test("item data", async () => {
		const handleItemSelect = vi.fn();
		await render(
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<Autocomplete
					name="fruit"
					placeholder="Pick your food"
					onItemSelect={handleItemSelect}
					active
				>
					{items.map((v, i) => (
						<Autocomplete.Item key={v} value={v} data={i === 1 ? { foo: true } : undefined}>
							{v}
						</Autocomplete.Item>
					))}
				</Autocomplete>
			</FormControl>
		);
		const options = page.getByRole("option");

		await userEvent.click(options.nth(0));

		expect(handleItemSelect).toHaveBeenLastCalledWith({ value: "Pizza" });

		await userEvent.click(options.nth(1));

		expect(handleItemSelect).toHaveBeenLastCalledWith({ value: "Pie", data: { foo: true } });
	});

	test("item disabled keeps the focus on the input", async () => {
		const handleItemSelect = vi.fn();
		const Component = (props: Pick<AutocompleteProps, "onItemSelect">) => (
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<Autocomplete name="fruit" placeholder="Pick your food" active {...props}>
					{items.map((v, i) => (
						<Autocomplete.Item key={v} value={v} disabled={i === 1}>
							{v}
						</Autocomplete.Item>
					))}
				</Autocomplete>
			</FormControl>
		);
		await render(<Component onItemSelect={handleItemSelect} />);
		const input = page.getByRole("combobox");
		const option = page.getByRole("option", { name: "Pie" });

		input.element().focus();
		await expect.element(option).toBeDisabled();
		await userEvent.click(option, { force: true });

		// Check that focus stays on input when clicking on disabled elements
		await expect.element(input).toHaveFocus();
		expect(handleItemSelect).not.toHaveBeenCalled();
	});
});
