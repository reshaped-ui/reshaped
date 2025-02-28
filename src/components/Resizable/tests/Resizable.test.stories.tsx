import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Resizable from "components/Resizable";

export default {
	title: "Components/Resizable/tests",
	component: Resizable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/Resizable",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Resizable className="test-classname" attributes={{ id: "test-id" }}>
				<Resizable.Item>Content</Resizable.Item>
			</Resizable>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
