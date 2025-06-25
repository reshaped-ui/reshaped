import { StoryObj } from "@storybook/react-vite";
import { expect, fn, Mock, userEvent } from "storybook/test";
import { Example } from "utilities/storybook";
import ToggleButtonGroup from "components/ToggleButtonGroup";
import ToggleButton from "components/ToggleButton";

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
