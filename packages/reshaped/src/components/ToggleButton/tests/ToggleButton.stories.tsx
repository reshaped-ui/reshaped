import { type StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, type Mock } from "storybook/test";

import { Example } from "utilities/storybook";

import ToggleButton from "../ToggleButton";

export default {
	title: "Components/ToggleButton",
	component: ToggleButton,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toggle-button",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="outline">
				<ToggleButton>Button</ToggleButton>
			</Example.Item>
			<Example.Item title="ghost">
				<ToggleButton variant="ghost">Button</ToggleButton>
			</Example.Item>
		</Example>
	),
};

export const selectedColor = {
	name: "selectedColor",
	render: () => (
		<Example>
			<Example.Item title="selectedColor: primary">
				<ToggleButton selectedColor="primary" defaultChecked>
					Button
				</ToggleButton>
			</Example.Item>
		</Example>
	),
};

export const onChange: StoryObj<{ handleUncontrolledChange: Mock; handleControlledChange: Mock }> =
	{
		name: "checked, defaultChecked, onChange",
		args: {
			handleUncontrolledChange: fn(),
			handleControlledChange: fn(),
		},
		render: (args) => (
			<Example>
				<Example.Item title="defaultChecked, onChange">
					<ToggleButton defaultChecked onChange={args.handleUncontrolledChange} value="1">
						Button
					</ToggleButton>
				</Example.Item>
				<Example.Item title="checked, onChange">
					<ToggleButton checked onChange={args.handleControlledChange} value="2">
						Button
					</ToggleButton>
				</Example.Item>
			</Example>
		),
		play: async ({ canvas, args }) => {
			const [uncontrolledButton, controlledButton] = canvas.getAllByRole("button");

			await userEvent.click(uncontrolledButton);

			expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(1);
			expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
				checked: false,
				value: "1",
				event: expect.objectContaining({ target: uncontrolledButton }),
			});

			await userEvent.click(uncontrolledButton);

			expect(args.handleUncontrolledChange).toHaveBeenCalledTimes(2);
			expect(args.handleUncontrolledChange).toHaveBeenLastCalledWith({
				checked: true,
				value: "1",
				event: expect.objectContaining({ target: uncontrolledButton }),
			});

			await userEvent.click(controlledButton);

			expect(args.handleControlledChange).toHaveBeenCalledTimes(1);
			expect(args.handleControlledChange).toHaveBeenLastCalledWith({
				checked: false,
				value: "2",
				event: expect.objectContaining({ target: controlledButton }),
			});

			await userEvent.click(controlledButton);

			// Stayed checked after the first click
			expect(args.handleControlledChange).toHaveBeenCalledTimes(2);
			expect(args.handleControlledChange).toHaveBeenLastCalledWith({
				checked: false,
				value: "2",
				event: expect.objectContaining({ target: uncontrolledButton }),
			});
		},
	};

export const onClick: StoryObj<{ handleClick: Mock }> = {
	name: "onClick",
	args: {
		handleClick: fn(),
	},
	render: (args) => <ToggleButton onClick={args.handleClick}>Button</ToggleButton>,
	play: async ({ canvas, args }) => {
		const [button] = canvas.getAllByRole("button");

		await userEvent.click(button);

		expect(args.handleClick).toHaveBeenCalledOnce();
		expect(args.handleClick).toHaveBeenLastCalledWith(expect.objectContaining({ target: button }));
	},
};
