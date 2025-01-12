import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Avatar from "components/Avatar";

export default {
	title: "Components/Avatar/tests",
	component: Avatar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/avatar",
		},
	},
};

export const src: StoryObj = {
	name: "src",
	render: () => (
		<Avatar src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png" />
	),
	play: ({ canvas }) => {
		const presentation = canvas.getByRole("presentation");
		expect(presentation).toBeInTheDocument();
	},
};

export const srcAlt: StoryObj = {
	name: "src, alt",
	render: () => (
		<Avatar
			src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png"
			alt="test alt"
		/>
	),
	play: ({ canvas }) => {
		const img = canvas.getByRole("img");
		expect(img).toHaveAccessibleName("test alt");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Avatar initials="RS" className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
