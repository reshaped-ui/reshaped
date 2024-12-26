import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import ActionBar from "components/ActionBar";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Components/ActionBar/tests",
	component: ActionBar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/action-bar",
		},
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ActionBar className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</ActionBar>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
