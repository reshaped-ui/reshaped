import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Text from "components/Text";

export default {
	title: "Utility components/Text/tests",
	component: Text,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/text",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const asProp: StoryObj = {
	name: "as",
	render: () => <Text as="h1">Content</Text>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("heading");

		expect(el).toBeInTheDocument();
	},
};

export const headingAs: StoryObj = {
	name: "heading tag resolving",
	render: () => <Text variant="title-3">Content</Text>,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("heading");

		expect(el.tagName).toBe("H3");
	},
};

export const headingAsResponsive: StoryObj = {
	name: "heading tag resolving, responsive",
	render: () => <Text variant={{ s: "title-3", m: "title-4" }}>Content</Text>,
	play: async ({ canvas }) => {
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
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
