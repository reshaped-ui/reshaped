import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import Button from "components/Button";
import View from "components/View";
import useKeyboardMode from "hooks/useKeyboardMode";

export default {
	title: "Hooks/useKeyboardMode",
	parameters: {
		chromatic: { disableSnapshot: true },
	},
};

const Component = () => {
	const { activate, deactivate, disable, enable } = useKeyboardMode();

	return (
		<View direction="row" gap={2}>
			<Button onClick={activate}>Activate</Button>
			<Button onClick={deactivate}>Deactivate</Button>
			<Button onClick={disable}>Disable</Button>
			<Button onClick={enable}>Enable</Button>
		</View>
	);
};

export const base: StoryObj = {
	name: "base",
	render: () => <Component />,
	play: async ({ canvas }) => {
		const attribute = "data-rs-keyboard";
		const root = document.documentElement;
		const activateTrigger = canvas.getAllByRole("button")[0];
		const deactivateTrigger = canvas.getAllByRole("button")[1];
		const disableTrigger = canvas.getAllByRole("button")[2];
		const enableTrigger = canvas.getAllByRole("button")[3];

		expect(root).not.toHaveAttribute(attribute);

		await userEvent.click(activateTrigger);
		expect(root).toHaveAttribute(attribute);

		await userEvent.click(deactivateTrigger);
		expect(root).not.toHaveAttribute(attribute);

		await userEvent.click(disableTrigger);
		await userEvent.click(activateTrigger);
		expect(root).not.toHaveAttribute(attribute);

		await userEvent.click(enableTrigger);
		await userEvent.click(activateTrigger);
		expect(root).toHaveAttribute(attribute);
	},
};
