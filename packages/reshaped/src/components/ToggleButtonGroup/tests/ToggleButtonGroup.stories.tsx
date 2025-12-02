import { StoryObj } from "@storybook/react-vite";
import { expect, fn, Mock, userEvent } from "storybook/test";

import ToggleButton from "components/ToggleButton";
import ToggleButtonGroup from "components/ToggleButtonGroup";
import IconCheckmark from "icons/Checkmark";
import IconMinus from "icons/Minus";
import IconPlus from "icons/Plus";
import { Example } from "utilities/storybook";

export default {
	title: "Components/ToggleButtonGroup",
	component: ToggleButtonGroup,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toggle-button-group",
		},
	},
};

export const single: StoryObj<{
	handleUncontrolledChange: Mock;
	handleControlledChange: Mock;
	handleItemChange: Mock;
}> = {
	name: "checked, defaultChecked, onChange",
	args: {
		handleUncontrolledChange: fn(),
		handleControlledChange: fn(),
		handleItemChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="single, uncontrolled, onChange">
				<ToggleButtonGroup onChange={args.handleUncontrolledChange}>
					<ToggleButton value="1" onChange={args.handleItemChange}>
						Button
					</ToggleButton>
					<ToggleButton value="2">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
			<Example.Item title="single, controlled, onChange">
				<ToggleButtonGroup onChange={args.handleControlledChange} value={[]}>
					<ToggleButton value="3" onChange={args.handleItemChange}>
						Button
					</ToggleButton>
					<ToggleButton value="4">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [uncontrolledButton1, uncontrolledButton2, controlledButton1, controlledButton2] =
			canvas.getAllByRole("button");

		await userEvent.click(uncontrolledButton1);

		expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(1);
		expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
			value: ["1"],
			event: expect.objectContaining({ target: uncontrolledButton1 }),
		});

		await userEvent.click(uncontrolledButton2);

		expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(2);
		expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
			value: ["2"],
			event: expect.objectContaining({ target: uncontrolledButton2 }),
		});

		await userEvent.click(controlledButton1);

		expect(args.handleControlledChange).toHaveBeenCalledTimes(1);
		expect(args.handleControlledChange).toHaveBeenLastCalledWith({
			value: ["3"],
			event: expect.objectContaining({ target: controlledButton1 }),
		});

		await userEvent.click(controlledButton2);

		expect(args.handleControlledChange).toHaveBeenCalledTimes(2);
		expect(args.handleControlledChange).toHaveBeenLastCalledWith({
			value: ["4"],
			event: expect.objectContaining({ target: controlledButton2 }),
		});

		expect(args.handleItemChange).not.toHaveBeenCalled();
	},
};

export const multiple: StoryObj<{
	handleUncontrolledChange: Mock;
	handleControlledChange: Mock;
}> = {
	name: "selectionMode, checked, defaultChecked, onChange",
	args: {
		handleUncontrolledChange: fn(),
		handleControlledChange: fn(),
	},
	render: (args) => (
		<Example>
			<Example.Item title="multiple, uncontrolled, onChange">
				<ToggleButtonGroup onChange={args.handleUncontrolledChange} selectionMode="multiple">
					<ToggleButton value="1">Button</ToggleButton>
					<ToggleButton value="2">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
			<Example.Item title="multiple, controlled, onChange">
				<ToggleButtonGroup
					onChange={args.handleControlledChange}
					value={[]}
					selectionMode="multiple"
				>
					<ToggleButton value="3">Button</ToggleButton>
					<ToggleButton value="4">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas, args }) => {
		const [uncontrolledButton1, uncontrolledButton2, controlledButton1, controlledButton2] =
			canvas.getAllByRole("button");

		await userEvent.click(uncontrolledButton1);

		expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(1);
		expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
			value: ["1"],
			event: expect.objectContaining({ target: uncontrolledButton1 }),
		});

		await userEvent.click(uncontrolledButton2);

		expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(2);
		expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
			value: ["1", "2"],
			event: expect.objectContaining({ target: uncontrolledButton2 }),
		});

		await userEvent.click(controlledButton1);

		expect(args.handleControlledChange).toHaveBeenCalledTimes(1);
		expect(args.handleControlledChange).toHaveBeenLastCalledWith({
			value: ["3"],
			event: expect.objectContaining({ target: controlledButton1 }),
		});

		await userEvent.click(controlledButton2);

		expect(args.handleControlledChange).toHaveBeenCalledTimes(2);
		expect(args.handleControlledChange).toHaveBeenLastCalledWith({
			value: ["4"],
			event: expect.objectContaining({ target: controlledButton2 }),
		});
	},
};

export const selectedColor: StoryObj = {
	name: "color,selectedColor",
	render: () => (
		<Example>
			<Example.Item title="selectedColor: primary">
				<ToggleButtonGroup selectedColor="primary" defaultValue={["2"]}>
					<ToggleButton value="1">Button</ToggleButton>
					<ToggleButton value="2">Button</ToggleButton>
					<ToggleButton value="3">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
			<Example.Item title="color: primary, selectedColor: critical">
				<ToggleButtonGroup color="primary" selectedColor="critical" defaultValue={["2"]}>
					<ToggleButton value="1" variant="ghost">
						Button
					</ToggleButton>
					<ToggleButton value="2" variant="ghost">
						Button
					</ToggleButton>
					<ToggleButton value="3" variant="ghost">
						Button
					</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ToggleButtonGroup className="test-classname" attributes={{ id: "test-id" }}>
				<ToggleButton>Button 1</ToggleButton>
				<ToggleButton>Button 1</ToggleButton>
			</ToggleButtonGroup>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const testIcon = {
	name: "test: icon only",
	render: () => (
		<Example>
			<Example.Item title="icon only">
				<ToggleButtonGroup selectedColor="primary">
					<ToggleButton value="1" icon={IconPlus} />
					<ToggleButton value="2" icon={IconMinus} />
					<ToggleButton value="3" icon={IconCheckmark} />
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
};
