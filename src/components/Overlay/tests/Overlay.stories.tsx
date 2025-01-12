import { StoryObj } from "@storybook/react";
import { userEvent } from "@storybook/test";
import { Example } from "utilities/storybook";
import Overlay from "components/Overlay";
import Button from "components/Button";
import useToggle from "hooks/useToggle";

export default {
	title: "Utilities/Overlay",
	component: Overlay,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/overlay",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.toggle}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate}>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const transparent: StoryObj = {
	name: "transparent",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.toggle}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} transparent>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};

export const blurred: StoryObj = {
	name: "blurred",
	render: () => {
		const overlayToggle = useToggle(false);

		return (
			<Example>
				<Example.Item title="base">
					<Button onClick={overlayToggle.toggle}>Open overlay</Button>
					<Overlay active={overlayToggle.active} onClose={overlayToggle.deactivate} blurred>
						Overlay content
					</Overlay>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);
	},
};
