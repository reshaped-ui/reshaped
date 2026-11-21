import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";

import Autocomplete from "@/components/Autocomplete";
import Badge from "@/components/Badge";
import FormControl from "@/components/FormControl";
import useToggle from "@/hooks/useToggle";
import { Example } from "@/utilities/storybook";

export default {
	title: "Components/Autocomplete",
	component: Autocomplete,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/autocomplete",
		},
	},
};

export const active: StoryObj = {
	name: "active",
	render: () => {
		const toggle = useToggle(true);
		const [value, setValue] = React.useState("");

		return (
			<Example>
				<Example.Item title="active">
					<FormControl>
						<FormControl.Label>Label</FormControl.Label>
						<Autocomplete
							name="fruit"
							placeholder="Pick your food"
							active={toggle.active}
							value={value}
							onChange={(args) => setValue(args.value)}
							onOpen={toggle.activate}
							onClose={toggle.deactivate}
						>
							{["Pizza", "Pie", "Ice-cream"].map((v) => {
								if (!v.toLowerCase().includes(value.toLowerCase())) return;
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement.ownerDocument.body);
		const list = await canvas.findByRole("listbox");

		expect(list).toBeInTheDocument();
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
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
		const options = await canvas.findAllByRole("option");

		expect(options[1]).toBeDisabled();
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
