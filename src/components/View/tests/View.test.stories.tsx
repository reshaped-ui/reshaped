import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import View from "components/View";

export default {
	title: "Utilities/View/tests",
	component: View,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/view",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const asProp: StoryObj = {
	name: "as",
	render: () => (
		<View as="ul">
			<View.Item as="li">Content</View.Item>
		</View>
	),
	play: async ({ canvas }) => {
		const list = canvas.getByRole("list");
		const item = canvas.getByRole("listitem");

		expect(list).toBeInTheDocument();
		expect(item).toBeInTheDocument();
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<View className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</View>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const itemClassName: StoryObj = {
	name: "item className, attributes",
	render: () => (
		<div data-testid="root">
			<View.Item className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</View.Item>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
