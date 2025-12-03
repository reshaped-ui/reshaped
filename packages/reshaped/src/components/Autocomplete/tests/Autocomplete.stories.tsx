import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { fn, expect, Mock, within, waitFor, userEvent, fireEvent } from "storybook/test";

import Autocomplete from "components/Autocomplete";
import Badge from "components/Badge";
import FormControl from "components/FormControl";
import useToggle from "hooks/useToggle";
import { sleep } from "utilities/helpers";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Autocomplete",
	component: Autocomplete,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/autocomplete",
		},
	},
};

export const active: StoryObj<{
	handleOpen: Mock;
	handleClose: Mock;
}> = {
	name: "active, onOpen, onClose",
	args: {
		handleClose: fn(),
		handleOpen: fn(),
	},
	render: (args) => {
		const toggle = useToggle(true);

		return (
			<Example>
				<Example.Item title="active, onOpen, onClose">
					<FormControl>
						<FormControl.Label>Label</FormControl.Label>
						<Autocomplete
							name="fruit"
							placeholder="Pick your food"
							active={toggle.active}
							onOpen={() => {
								args.handleOpen();
								toggle.activate();
							}}
							onClose={() => {
								args.handleClose();
								toggle.deactivate();
							}}
							onChange={(args) => console.log(args)}
						>
							{["Pizza", "Pie", "Ice-cream"].map((v) => {
								return (
									<Autocomplete.Item key={v} value={v}>
										{v}
									</Autocomplete.Item>
								);
							})}
						</Autocomplete>
					</FormControl>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		// const input = canvas.getByRole("combobox");
		const list = await canvas.findByRole("listbox");
		expect(list).toBeInTheDocument();
		expect(args.handleOpen).not.toHaveBeenCalled();
		await userEvent.click(document.body);
		await waitFor(() => {
			expect(args.handleClose).toHaveBeenCalledTimes(1);
			expect(args.handleClose).toHaveBeenLastCalledWith();
		});
		// TODO: Flaky behavior in node env tests, works in the browser
		// await sleep(500);
		// await userEvent.click(input);
		// await waitFor(() => {
		// 	expect(args.handleOpen).toHaveBeenCalledTimes(1);
		// 	expect(args.handleOpen).toHaveBeenLastCalledWith();
		// });
	},
};

export const base: StoryObj<{
	handleInput: Mock;
	handleItemSelect: Mock;
	handleBackspace: Mock;
}> = {
	name: "onInput, onItemSelect, onBackspace",
	args: {
		handleInput: fn(),
		handleBackspace: fn(),
		handleItemSelect: fn(),
	},
	render: (args) => {
		const [value, setValue] = React.useState("");

		return (
			<Example>
				<Example.Item title="Base">
					<FormControl>
						<FormControl.Label>Food</FormControl.Label>
						<Autocomplete
							name="fruit"
							placeholder="Pick your food"
							value={value}
							onChange={(args) => setValue(args.value)}
							onBackspace={args.handleBackspace}
							onItemSelect={args.handleItemSelect}
						>
							{["Pizza", "Pie", "Ice-cream"].map((v) => {
								return (
									<Autocomplete.Item key={v} value={v}>
										{v}
									</Autocomplete.Item>
								);
							})}
						</Autocomplete>
					</FormControl>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);

		const input = canvas.getByRole("combobox");

		// Reset the focus
		document.body.focus();

		// Test keyboard selection after focusing the input
		input.focus();

		let options: HTMLElement[] = [];

		await waitFor(() => {
			options = canvas.getAllByRole("option");
		});

		expect(options).toHaveLength(3);

		await waitFor(() => {
			expect(options[0]).toHaveAttribute("tabindex", "0");
		});

		expect(options[1]).toHaveAttribute("tabindex", "-1");

		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{Enter}");

		expect(input).toHaveValue("Pie");
		expect(args.handleItemSelect).toHaveBeenCalledTimes(1);
		expect(args.handleItemSelect).toHaveBeenCalledWith({
			value: "Pie",
			data: undefined,
		});

		// Give browser time to focus on the input
		await sleep(100);

		// Test click selection after opening with down arrow
		await userEvent.keyboard("{ArrowDown}");

		await waitFor(() => {
			options = canvas.getAllByRole("option");
		});

		await userEvent.click(options[0]);

		expect(input).toHaveValue("Pizza");
		expect(args.handleItemSelect).toHaveBeenCalledTimes(2);
		expect(args.handleItemSelect).toHaveBeenCalledWith({
			value: "Pizza",
		});

		input.focus();

		await userEvent.keyboard("{Backspace}");

		await waitFor(() => {
			expect(args.handleBackspace).toHaveBeenCalledTimes(1);
			expect(args.handleBackspace).toHaveBeenCalledWith();
		});
	},
};

export const itemData: StoryObj<{
	handleItemSelect: Mock;
}> = {
	name: "item data",
	args: {
		handleItemSelect: fn(),
	},
	render: (args) => {
		return (
			<Example>
				<Example.Item title="item data">
					<FormControl>
						<FormControl.Label>Label</FormControl.Label>
						<Autocomplete
							name="fruit"
							placeholder="Pick your food"
							onItemSelect={args.handleItemSelect}
							active
						>
							{["Pizza", "Pie", "Ice-cream"].map((v, i) => {
								return (
									<Autocomplete.Item key={v} value={v} data={i === 1 ? { foo: true } : undefined}>
										{v}
									</Autocomplete.Item>
								);
							})}
						</Autocomplete>
					</FormControl>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const options = await canvas.findAllByRole("option");

		await userEvent.click(options[0]);

		expect(args.handleItemSelect).toHaveBeenLastCalledWith({ value: "Pizza" });

		await userEvent.click(options[1]);

		expect(args.handleItemSelect).toHaveBeenLastCalledWith({ value: "Pie", data: { foo: true } });
	},
};

export const itemDisabled: StoryObj = {
	name: "item disabled",
	render: () => {
		return (
			<Example>
				<Example.Item title="item disabled">
					<FormControl>
						<FormControl.Label>Label</FormControl.Label>
						<Autocomplete name="fruit" placeholder="Pick your food" active>
							{["Pizza", "Pie", "Ice-cream"].map((v, i) => {
								return (
									<Autocomplete.Item key={v} value={v} disabled={i === 1}>
										{v}
									</Autocomplete.Item>
								);
							})}
						</Autocomplete>
					</FormControl>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const input = canvas.getByRole("combobox");
		const options = await canvas.findAllByRole("option");

		await fireEvent.click(options[1]);

		expect(options[1]).toBeDisabled();
		// Check that focus stays on input when clicking on disabled elements
		expect(document.activeElement).toBe(input);
	},
};

export const multiselect = {
	name: "test: multiselect",
	render: () => {
		const options = [
			"Pizza",
			"Pie",
			"Ice-cream",
			"Fries",
			"Salad",
			"Option 4",
			"Option 5",
			"Option 6",
		];

		const inputRef = React.useRef<HTMLInputElement>(null);
		const [values, setValues] = React.useState<string[]>([
			"Option 4",
			"Option 5",
			"Option 6",
			"Pizza",
			"Ice-cream",
		]);
		const [query, setQuery] = React.useState("");

		const handleDismiss = (dismissedValue: string) => {
			const nextValues = values.filter((value) => value !== dismissedValue);
			setValues(nextValues);
			inputRef.current?.focus();
		};

		const valuesNode = values.map((value) => (
			<Badge dismissAriaLabel="Dismiss value" onDismiss={() => handleDismiss(value)} key={value}>
				{value}
			</Badge>
		));

		return (
			<FormControl>
				<FormControl.Label>Food</FormControl.Label>
				<Autocomplete
					name="fruit"
					value={query}
					placeholder="Pick your food"
					startSlot={valuesNode}
					multiline
					inputAttributes={{ ref: inputRef }}
					onChange={(args) => setQuery(args.value)}
					onBackspace={() => {
						if (query.length === 0) {
							setValues((prev) => prev.slice(0, -1));
						}
					}}
					onItemSelect={(args) => {
						setQuery("");
						setValues((prev) => [...prev, args.value]);
					}}
				>
					{options.map((v) => {
						if (!v.toLowerCase().includes(query.toLowerCase())) return;
						if (values.includes(v)) return;

						return (
							<Autocomplete.Item key={v} value={v}>
								{v}
							</Autocomplete.Item>
						);
					})}
				</Autocomplete>
			</FormControl>
		);
	},
};
