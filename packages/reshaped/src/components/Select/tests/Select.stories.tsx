import { useToggle } from "@reshaped/headless";
import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock, userEvent, within } from "storybook/test";

import Badge from "@/components/Badge";
import FormControl from "@/components/FormControl";
import MenuItem from "@/components/MenuItem";
import Modal from "@/components/Modal";
import Select, { SelectProps, SelectTrigger } from "@/components/Select";
import Text from "@/components/Text";
import IconZap from "@/icons/Zap";
import { Example, Placeholder } from "@/utilities/storybook";

export default {
	title: "Components/Select",
	component: Select,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/select",
		},
	},
};

export const base: StoryObj = {
	name: "name, id, option groups",
	render: () => (
		<Example>
			<Example.Item title="default with options">
				<Select
					name="animal"
					id="animal-1"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="default with option groups">
				<Select
					name="animal-2"
					id="animal-2"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Group label="Birds">
						<Select.Option value="pigeon">Pigeon</Select.Option>
						<Select.Option value="parrot">Parrot</Select.Option>
					</Select.Group>
					<Select.Group label="Sea Mammals">
						<Select.Option value="whale">Whale</Select.Option>
						<Select.Option value="dolphin">Dolphin</Select.Option>
					</Select.Group>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, canvasElement }) => {
		const [trigger] = canvas.getAllByRole("button");
		const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"]');
		const [hiddenInput] = Array.from(hiddenInputs);

		// Testing only options

		expect(hiddenInput).toHaveAttribute("name", "animal");
		expect(hiddenInput).toHaveAttribute("id", "animal-1");
		expect(trigger).toHaveTextContent("Select an animal");

		await userEvent.click(trigger);

		const options = within(canvasElement.ownerDocument.body).getAllByRole("option");

		expect(options).toHaveLength(2);
		expect(options[0]).toHaveTextContent("Dog");
		expect(options[1]).toHaveTextContent("Turtle");

		await userEvent.click(document.body);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, triggerWithGroups] = canvas.getAllByRole("button");
		const hiddenInputs2 = canvasElement.querySelectorAll('input[type="hidden"]');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [__, hiddenInputWithGroups] = Array.from(hiddenInputs2);

		await userEvent.click(triggerWithGroups);

		const optionsWithGroups = within(canvasElement.ownerDocument.body).getAllByRole("option");
		const optionGroups = within(canvasElement.ownerDocument.body).getAllByRole("group");

		expect(hiddenInputWithGroups).toHaveAttribute("name", "animal-2");
		expect(hiddenInputWithGroups).toHaveAttribute("id", "animal-2");
		expect(triggerWithGroups).toHaveTextContent("Select an animal");

		expect(optionGroups).toHaveLength(2);
		expect(optionGroups[0]).toHaveTextContent("Birds");
		expect(optionGroups[1]).toHaveTextContent("Sea Mammals");

		expect(optionsWithGroups).toHaveLength(4);
		expect(optionsWithGroups[0]).toHaveTextContent("Pigeon");
		expect(optionsWithGroups[1]).toHaveTextContent("Parrot");
		expect(optionsWithGroups[2]).toHaveTextContent("Whale");
		expect(optionsWithGroups[3]).toHaveTextContent("Dolphin");
	},
};

export const multiple: StoryObj<{ handleChange: Mock }> = {
	name: "multiple",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="multiple">
				<Select
					multiple
					name="animal"
					placeholder="Select an animal"
					defaultValue={["dog"]}
					onChange={args.handleChange}
					renderValue={(args) => args.value.join(", ")}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, canvasElement, args }) => {
		const [uncontrolled] = canvas.getAllByRole("button");
		const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"]');
		const [inputUncontrolled] = Array.from(hiddenInputs);

		// Uncontrolled

		expect(inputUncontrolled).toHaveValue('["dog"]');

		await userEvent.click(uncontrolled);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, uncontrolledOption] = within(canvasElement.ownerDocument.body).getAllByRole("option");

		await userEvent.click(uncontrolledOption);

		expect(inputUncontrolled).toHaveValue('["dog","turtle"]');
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "animal",
			value: ["dog", "turtle"],
		});
	},
};

export const variant: StoryObj = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<Select
					variant="faded"
					name="animal-2"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: ghost">
				<Select
					variant="ghost"
					name="animal-4"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: headless">
				<Select
					variant="headless"
					name="animal-6"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const size: StoryObj = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<Select size="small" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: medium">
				<Select size="medium" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: large">
				<Select size="large" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="size: xlarge">
				<Select size="xlarge" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const startSlot: StoryObj = {
	name: "icon,startSlot",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<Select name="animal" placeholder="Select an animal" icon={IconZap}>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>

			<Example.Item title="startSlot">
				<Select name="animal" placeholder="Select an animal" startSlot={<Placeholder h={20} />}>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const renderValue = {
	name: "renderValue",
	render: () => {
		const options = [
			{
				value: "1",
				label: "Title 1",
				subtitle: "Subtitle 1",
			},
			{
				value: "2",
				label: "Title 2",
				subtitle: "Subtitle 2",
			},
		];

		return (
			<Example>
				<Example.Item title="default renderer, single">
					<Select name="animal" defaultValue="1" placeholder="Nothing selected">
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="default renderer, multiple">
					<Select
						name="animal"
						defaultValue={["1"]}
						multiple
						placeholder="Nothing selected"
						renderValue={(args) => args.value.join(", ")}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="renderValue, single">
					<Select
						name="animal"
						defaultValue="1"
						placeholder="Nothing selected"
						renderValue={(args) => <Badge>Title {args.value}</Badge>}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>

				<Example.Item title="renderValue, multiple">
					<Select
						name="animal"
						defaultValue={["1"]}
						multiple
						placeholder="Nothing selected"
						renderValue={(args) => <Badge>Titles {args.value.join(", ")}</Badge>}
					>
						{options.map((option) => (
							<Select.Option key={option.value} value={option.value}>
								<Text weight="medium">{option.label}</Text>
								<Text weight="regular" color="neutral-faded">
									{option.subtitle}
								</Text>
							</Select.Option>
						))}
					</Select>
				</Example.Item>
			</Example>
		);
	},
};

export const error: StoryObj = {
	name: "error",
	render: () => (
		<Example>
			<Example.Item title="error">
				<Select name="animal" placeholder="Select an animal" hasError>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<Select
					name="animal-2"
					placeholder="Select an animal"
					disabled
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [native] = canvas.getAllByRole("combobox");
		const [custom] = canvas.getAllByRole("button");

		expect(native).toBeDisabled();
		expect(custom).toBeDisabled();
	},
};

export const className: StoryObj = {
	name: "className, attributes, inputAttributes",
	render: () => (
		<Example>
			<Example.Item title="default, className, attributes, inputAttributes">
				<Select
					name="animal"
					placeholder="Select an animal"
					className="custom-class"
					attributes={{ id: "test-id" }}
					inputAttributes={{ "aria-label": "test-label" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas, canvasElement }) => {
		const native = canvasElement.querySelector(".native-class");
		const nativeInput = canvas.getByRole("combobox");
		const custom = canvasElement.querySelector(".custom-class");
		const [customTrigger] = canvas.getAllByRole("button");

		expect(native).toHaveAttribute("id", "test-id");
		expect(nativeInput).toHaveAttribute("aria-label", "test-label");

		expect(custom).toHaveAttribute("id", "test-id");
		expect(customTrigger).toHaveAttribute("aria-label", "test-label");
	},
};

export const fallback: StoryObj = {
	name: "test: fallbackAdjustLayout",
	render: () => (
		<Example>
			<Example.Item title="fallback">
				<Select
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select>
				<div style={{ height: "1000px" }}></div>
				<Select
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select>
			</Example.Item>
		</Example>
	),
};

export const formControl: StoryObj = {
	name: "test: with FormControl",
	render: () => (
		<Example>
			<Example.Item title="FormControl">
				<FormControl hasError>
					<FormControl.Label>Animal</FormControl.Label>
					<Select name="animal" placeholder="Select an animal">
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const testComposition: StoryObj = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="default with options">
				<Select
					name="animal"
					id="animal"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Group>
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select.Group>
					<Select.Group>
						<div>hello</div>
					</Select.Group>
				</Select>
			</Example.Item>
		</Example>
	),
};

export const nativeRender: StoryObj = {
	name: "native rendering, options, name, id",
	render: () => (
		<Example>
			<Example.Item title="native with option tags">
				<Select
					name="animal"
					id="animal-2"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const [selectWithProp, selectWithTags] = canvas.getAllByRole("combobox");
		const optionsFromProps = within(selectWithProp).getAllByRole("option");
		const optionsFromTags = within(selectWithTags).getAllByRole("option");

		expect(selectWithProp).toHaveAttribute("name", "animal");
		expect(selectWithProp).toHaveAttribute("id", "animal-1");
		expect(optionsFromProps).toHaveLength(3);
		expect(optionsFromProps[0]).toHaveTextContent("Select an animal");
		expect(optionsFromProps[1]).toHaveTextContent("Dog");
		expect(optionsFromProps[2]).toHaveTextContent("Turtle");

		expect(selectWithTags).toHaveAttribute("name", "animal");
		expect(selectWithTags).toHaveAttribute("id", "animal-2");
		expect(optionsFromTags).toHaveLength(3);
		expect(optionsFromTags[0]).toHaveTextContent("Select an animal");
		expect(optionsFromTags[1]).toHaveTextContent("Dog");
		expect(optionsFromTags[2]).toHaveTextContent("Turtle");
	},
};

export const nativeOptgroup: StoryObj = {
	name: "native with optgroup",
	render: () => (
		<Example>
			<Example.Item title="native with optgroup">
				<Select
					name="animal"
					id="animal-optgroup"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<optgroup label="Mammals">
						<option value="dog">Dog</option>
						<option value="cat">Cat</option>
					</optgroup>
					<optgroup label="Reptiles">
						<option value="turtle">Turtle</option>
						<option value="lizard">Lizard</option>
					</optgroup>
				</Select>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const select = canvas.getByRole("combobox");
		const options = within(select).getAllByRole("option");
		const optgroups = within(select).getAllByRole("group");

		expect(select).toHaveAttribute("name", "animal");
		expect(select).toHaveAttribute("id", "animal-optgroup");

		// Should have 2 optgroups
		expect(optgroups).toHaveLength(2);

		// Should have 5 options total (1 placeholder + 4 options)
		expect(options).toHaveLength(5);
		expect(options[0]).toHaveTextContent("Select an animal");
		expect(options[1]).toHaveTextContent("Dog");
		expect(options[2]).toHaveTextContent("Cat");
		expect(options[3]).toHaveTextContent("Turtle");
		expect(options[4]).toHaveTextContent("Lizard");
	},
};

export const nativeHandlers: StoryObj<{
	handleChange: Mock;
	handleControlledChange: Mock;
	handleClick: Mock;
}> = {
	name: "native, controlled, uncontrolled, onChange",
	args: {
		handleChange: fn(),
		handleControlledChange: fn(),
		handleClick: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="native, uncontrolled, onChange">
				<Select
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onChange={args.handleChange}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="native, controlled, onChange">
				<Select
					name="animal-2"
					placeholder="Select an animal"
					value="dog"
					onChange={args.handleControlledChange}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="native, onClick">
				<Select
					name="animal-3"
					placeholder="Select an animal"
					defaultValue="dog"
					onClick={args.handleClick}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [uncontrolled, controlled, focusable] = canvas.getAllByRole("combobox");

		// Uncontrolled

		expect(uncontrolled).toHaveValue("dog");

		await userEvent.selectOptions(uncontrolled, "turtle");

		expect(uncontrolled).toHaveValue("turtle");
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "animal",
			value: "turtle",
			event: expect.objectContaining({ target: uncontrolled }),
		});

		// Controlled

		expect(controlled).toHaveValue("dog");

		await userEvent.selectOptions(controlled, "turtle");

		expect(controlled).toHaveValue("dog");
		expect(args.handleControlledChange).toHaveBeenCalledTimes(1);
		expect(args.handleControlledChange).toHaveBeenCalledWith({
			name: "animal-2",
			value: "turtle",
			event: expect.objectContaining({ target: controlled }),
		});

		// Focus + blur

		await userEvent.click(focusable);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));
	},
};

export const defaultHandlers: StoryObj<{
	handleChange: Mock;
	handleControlledChange: Mock;
	handleClick: Mock;
}> = {
	name: "default, controlled, uncontrolled, onFocus, onBlur, onChange",
	args: {
		handleChange: fn(),
		handleControlledChange: fn(),
		handleClick: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="default, uncontrolled, onChange">
				<Select
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onChange={args.handleChange}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="default, controlled, onChange">
				<Select
					name="animal-2"
					placeholder="Select an animal"
					value="dog"
					onChange={args.handleControlledChange}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
			<Example.Item title="default, onClick">
				<Select
					name="animal-3"
					placeholder="Select an animal"
					defaultValue="dog"
					onClick={args.handleClick}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, canvasElement, args }) => {
		const [uncontrolled] = canvas.getAllByRole("button");
		const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"]');
		const [inputUncontrolled] = Array.from(hiddenInputs);

		// Uncontrolled

		expect(inputUncontrolled).toHaveValue("dog");

		await userEvent.click(uncontrolled);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, uncontrolledOption] = within(canvasElement.ownerDocument.body).getAllByRole("option");

		await userEvent.click(uncontrolledOption);

		expect(inputUncontrolled).toHaveValue("turtle");
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "animal",
			value: "turtle",
		});

		// Controlled
		await userEvent.click(document.body);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [__, controlled, focusable] = canvas.getAllByRole("button");
		const hiddenInputs2 = canvasElement.querySelectorAll('input[type="hidden"]');
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [___, inputControlled] = Array.from(hiddenInputs2);

		expect(inputControlled).toHaveValue("dog");

		await userEvent.click(controlled);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [____, controlledOption] = within(canvasElement.ownerDocument.body).getAllByRole(
			"option"
		);

		await userEvent.click(controlledOption);

		expect(inputControlled).toHaveValue("dog");
		expect(args.handleControlledChange).toHaveBeenCalledTimes(1);
		expect(args.handleControlledChange).toHaveBeenCalledWith({
			name: "animal-2",
			value: "turtle",
		});

		await userEvent.click(focusable);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));
	},
};

export const triggerOnly: StoryObj<{ handleClick: Mock }> = {
	name: "trigger only, onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => {
		const toggle = useToggle();
		const [value, setValue] = React.useState("Dog");

		const handleClick: SelectProps["onClick"] = (e) => {
			args.handleClick(e);
			toggle.toggle();
		};

		return (
			<Example>
				<Example.Item title="trigger only, onClick">
					<SelectTrigger
						name="animal"
						placeholder="Select an animal"
						onClick={handleClick}
						value="dog"
						inputAttributes={{
							"aria-label": "Select an animal",
						}}
					>
						{value}
					</SelectTrigger>
					<Modal
						active={toggle.active}
						onClose={toggle.deactivate}
						position="bottom"
						padding={2}
						attributes={{ "aria-label": "Select an animal" }}
					>
						<div role="listbox" aria-label="Select an animal">
							<MenuItem
								roundedCorners
								onClick={() => {
									setValue("Dog");
									toggle.deactivate();
								}}
								attributes={{
									role: "option",
								}}
							>
								Dog
							</MenuItem>
							<MenuItem
								roundedCorners
								attributes={{
									role: "option",
								}}
								onClick={() => {
									setValue("Turtle");
									toggle.deactivate();
								}}
							>
								Turtle
							</MenuItem>
						</div>
					</Modal>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas, args, canvasElement }) => {
		const [trigger] = canvas.getAllByRole("button");

		const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"]');
		const [input] = Array.from(hiddenInputs);

		expect(trigger).toHaveTextContent("Dog");
		expect(input).toHaveAttribute("name", "animal");
		expect(input).toHaveValue("dog");

		await userEvent.click(trigger);

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: trigger }));
	},
};
