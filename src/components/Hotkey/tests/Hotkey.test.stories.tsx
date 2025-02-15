import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Hotkey from "../Hotkey";

export default {
	title: "Components/Hotkey/tests",
	component: Hotkey,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/hotkey",
		},
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Hotkey className="test-classname" attributes={{ id: "test-id" }}>
				⌘K
			</Hotkey>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild as HTMLElement;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(root?.tagName).toBe("KBD");
	},
};
