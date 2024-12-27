import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import Text from "components/Text";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Utilities/Text/tests",
	component: Text,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/text",
		},
	},
};

export const as: StoryObj = {
	name: "as",
	render: () => <Text as="ul">Content</Text>,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const el = canvas.getByRole("list");

		expect(el).toBeInTheDocument();
	},
};

export const headingAs: StoryObj = {
	name: "heading tag resolving",
	render: () => <Text variant="title-3">Content</Text>,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const el = canvas.getByRole("heading");

		expect(el.tagName).toBe("H3");
	},
};

export const headingAsResponsive: StoryObj = {
	name: "heading tag resolving, responsive",
	render: () => <Text variant={{ s: "title-3", m: "title-4" }}>Content</Text>,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const el = canvas.getByRole("heading");

		expect(el.tagName).toBe("H4");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Text className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</Text>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
