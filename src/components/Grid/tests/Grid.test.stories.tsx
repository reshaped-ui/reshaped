import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Grid from "components/Grid";

export default {
	title: "Utilities/Grid/tests",
	component: Grid,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/grid",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const as: StoryObj = {
	name: "as",
	render: () => (
		<Grid as="ul">
			<Grid.Item as="li">Content</Grid.Item>
		</Grid>
	),
	play: ({ canvas }) => {
		const ul = canvas.getByRole("list");
		const li = canvas.getByRole("listitem");

		expect(ul).toBeInTheDocument();
		expect(li).toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Grid className="test-class" attributes={{ id: "test-id" }}>
				<Grid.Item className="test-item-class" attributes={{ id: "test-item-id" }}>
					Content
				</Grid.Item>
			</Grid>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const item = root?.firstChild;

		expect(root).toHaveAttribute("id", "test-id");
		expect(root).toHaveClass("test-class");

		expect(item).toHaveAttribute("id", "test-item-id");
		expect(item).toHaveClass("test-item-class");
	},
};
