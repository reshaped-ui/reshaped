import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import Container from "components/Container";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Utilities/Container/tests",
	component: Container,
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
			<Container className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</Container>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
