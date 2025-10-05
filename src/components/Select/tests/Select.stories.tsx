import React from "react";
import { expect, fn, Mock, userEvent, waitFor, within } from "storybook/test";
import { StoryObj } from "@storybook/react-vite";
import IconZap from "icons/Zap";
import { Example, Placeholder } from "utilities/storybook";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import MenuItem from "components/MenuItem";
import Select, { SelectProps } from "components/Select";
import FormControl from "components/FormControl";

export default {
	title: "Components/Select",
	component: Select,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/select",
		},
	},
};

export const nativeRender: StoryObj = {
	name: "native rendering, options, name, id",
	render: () => (
		<Example>
			<Example.Item title="native with options prop">
				<Select
					name="animal"
					id="animal-1"
					placeholder="Select an animal"
					options={[
						{ label: "Dog", value: "dog" },
						{ label: "Turtle", value: "turtle" },
					]}
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				/>
			</Example.Item>
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

export const customRender: StoryObj = {
	name: "custom rendering, name, id, option groups",
	render: () => (
		<Example>
			<Example.Item title="custom with options">
				<Select.Custom
					name="animal"
					id="animal-1"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="native with option tags">
				<Select.Custom
					name="animal-2"
					id="animal-2"
					placeholder="Select an animal"
					inputAttributes={{
						"aria-label": "Select an animal",
					}}
				>
					<Select.OptionGroup label="Birds">
						<Select.Option value="pigeon">Pigeon</Select.Option>
						<Select.Option value="parrot">Parrot</Select.Option>
					</Select.OptionGroup>
					<Select.OptionGroup label="Sea Mammals">
						<Select.Option value="whale">Whale</Select.Option>
						<Select.Option value="dolphin">Dolphin</Select.Option>
					</Select.OptionGroup>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, canvasElement, mount }) => {
		await mount();
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

		// Testing options with groups
		// Remount to instantly close select
		await mount();

		const [_, triggerWithGroups] = canvas.getAllByRole("button");
		const hiddenInputs2 = canvasElement.querySelectorAll('input[type="hidden"]');
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

export const nativeHandlers: StoryObj<{
	handleChange: Mock;
	handleControlledChange: Mock;
	handleFocus: Mock;
	handleBlur: Mock;
	handleClick: Mock;
}> = {
	name: "native, controlled, uncontrolled, onFocus, onBlur, onChange",
	args: {
		handleChange: fn(),
		handleControlledChange: fn(),
		handleFocus: fn(),
		handleBlur: fn(),
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
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="native, controlled, onChange">
				<Select
					name="animal"
					placeholder="Select an animal"
					value="dog"
					onChange={args.handleControlledChange}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="native, onFocus, onBlur, onClick">
				<Select
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onFocus={args.handleFocus}
					onBlur={args.handleBlur}
					onClick={args.handleClick}
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
			name: "animal",
			value: "turtle",
			event: expect.objectContaining({ target: controlled }),
		});

		// Focus + blur

		await userEvent.click(focusable);

		expect(args.handleFocus).toHaveBeenCalledTimes(1);
		expect(args.handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));

		await userEvent.click(document.body);

		expect(args.handleBlur).toHaveBeenCalledTimes(1);
		expect(args.handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));
	},
};

export const customHandlers: StoryObj<{
	handleChange: Mock;
	handleControlledChange: Mock;
	handleFocus: Mock;
	handleBlur: Mock;
	handleClick: Mock;
}> = {
	name: "custom, controlled, uncontrolled, onFocus, onBlur, onChange",
	args: {
		handleChange: fn(),
		handleControlledChange: fn(),
		handleFocus: fn(),
		handleBlur: fn(),
		handleClick: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="custom, uncontrolled, onChange">
				<Select.Custom
					name="animal"
					placeholder="Select an animal"
					defaultValue="dog"
					onChange={args.handleChange}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="custom, controlled, onChange">
				<Select.Custom
					name="animal-2"
					placeholder="Select an animal"
					value="dog"
					onChange={args.handleControlledChange}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="native, onFocus, onBlur, onClick">
				<Select.Custom
					name="animal-3"
					placeholder="Select an animal"
					defaultValue="dog"
					onFocus={args.handleFocus}
					onBlur={args.handleBlur}
					onClick={args.handleClick}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, canvasElement, args, mount }) => {
		await mount();

		const [uncontrolled] = canvas.getAllByRole("button");
		const hiddenInputs = canvasElement.querySelectorAll('input[type="hidden"]');
		const [inputUncontrolled] = Array.from(hiddenInputs);

		// Uncontrolled

		expect(inputUncontrolled).toHaveValue("dog");

		await userEvent.click(uncontrolled);

		const [_, uncontrolledOption] = within(canvasElement.ownerDocument.body).getAllByRole("option");

		await userEvent.click(uncontrolledOption);

		expect(inputUncontrolled).toHaveValue("turtle");
		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "animal",
			value: "turtle",
		});

		// Controlled

		await mount();

		const [__, controlled, focusable] = canvas.getAllByRole("button");
		const hiddenInputs2 = canvasElement.querySelectorAll('input[type="hidden"]');
		const [___, inputControlled] = Array.from(hiddenInputs2);

		expect(inputControlled).toHaveValue("dog");

		await userEvent.click(controlled);

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

		// Focus + blur + click

		await userEvent.click(focusable);

		expect(args.handleFocus).toHaveBeenCalledTimes(1);
		expect(args.handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));

		expect(args.handleClick).toHaveBeenCalledTimes(1);
		expect(args.handleClick).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));

		await userEvent.click(document.body);

		expect(args.handleBlur).toHaveBeenCalledTimes(1);
		expect(args.handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target: focusable }));
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
					<Select name="animal" placeholder="Select an animal" onClick={handleClick} value="dog">
						{value}
					</Select>
					<Modal active={toggle.active} onClose={toggle.deactivate} position="bottom" padding={2}>
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

export const multiple: StoryObj<{ handleChange: Mock }> = {
	name: "multiple",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="multiple">
				<Select.Custom
					multiple
					name="animal"
					placeholder="Select an animal"
					defaultValue={["dog"]}
					onChange={args.handleChange}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
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
			<Example.Item title="variant: faded, native">
				<Select variant="faded" name="animal" placeholder="Select an animal">
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: faded, custom">
				<Select.Custom variant="faded" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>

			<Example.Item title="variant: headless, native">
				<Select variant="headless" name="animal" placeholder="Select an animal">
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>

			<Example.Item title="variant: headless, custom">
				<Select.Custom variant="headless" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
};

export const size: StoryObj = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<Select.Custom size="small" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="size: medium">
				<Select.Custom size="medium" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="size: large">
				<Select.Custom size="large" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
			<Example.Item title="size: xlarge">
				<Select.Custom size="xlarge" name="animal" placeholder="Select an animal">
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
};

export const startSlot: StoryObj = {
	name: "icon,startSlot",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<Select.Custom name="animal" placeholder="Select an animal" icon={IconZap}>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>

			<Example.Item title="startSlot">
				<Select.Custom
					name="animal"
					placeholder="Select an animal"
					startSlot={<Placeholder h={20} />}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
};

export const error: StoryObj = {
	name: "error",
	render: () => (
		<Example>
			<Example.Item title="error">
				<Select.Custom name="animal" placeholder="Select an animal" hasError>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled, native">
				<Select name="animal" placeholder="Select an animal" disabled>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="disabled, custom">
				<Select.Custom name="animal" placeholder="Select an animal" disabled>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
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
			<Example.Item title="native, className, attributes, inputAttributes">
				<Select
					name="animal"
					placeholder="Select an animal"
					className="native-class"
					attributes={{ id: "test-id" }}
					inputAttributes={{ "aria-label": "test-label" }}
				>
					<option value="dog">Dog</option>
					<option value="turtle">Turtle</option>
				</Select>
			</Example.Item>
			<Example.Item title="custom, className, attributes, inputAttributes">
				<Select.Custom
					name="animal"
					placeholder="Select an animal"
					className="custom-class"
					attributes={{ id: "test-id" }}
					inputAttributes={{ "aria-label": "test-label" }}
				>
					<Select.Option value="dog">Dog</Select.Option>
					<Select.Option value="turtle">Turtle</Select.Option>
				</Select.Custom>
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
				<Select.Custom
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select.Custom>
				<div style={{ height: "1000px" }}></div>
				<Select.Custom
					name="animal"
					placeholder="Select an animal"
					inputAttributes={{ "aria-label": "Select an animal" }}
				>
					{[...Array(100)].map((_, index) => (
						<Select.Option key={index} value={`item-${index}`}>
							Item {index + 1}
						</Select.Option>
					))}
				</Select.Custom>
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
					<Select.Custom name="animal" placeholder="Select an animal">
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select.Custom>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
};
