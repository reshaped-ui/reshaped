import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Hidden from "components/Hidden";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/Hidden",
	component: Hidden,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden",
		},
	},
};

export const visibility = {
	name: "visibility",
	render: () => (
		<Example>
			<Example.Item title="hide: always">
				<Hidden hide={true}>Content</Hidden>
			</Example.Item>
			<Example.Item title="shown on s">
				<Hidden hide={{ s: false, m: true }}>Content</Hidden>
			</Example.Item>
			<Example.Item title="shown on l/xl">
				<Hidden hide={{ s: true, l: false }}>Content</Hidden>
			</Example.Item>
			<Example.Item title="shown on m/l/xl">
				<Hidden hide={{ s: true, m: false }}>Content</Hidden>
			</Example.Item>
			<Example.Item title="shown on m">
				<Hidden hide={{ s: true, m: false, l: true }}>Content</Hidden>
			</Example.Item>
			<Example.Item title="shown on s/xl">
				<Hidden hide={{ s: false, m: true, xl: false }}>Content</Hidden>
			</Example.Item>
			<Example.Item title="hide: always, visibility">
				<Hidden hide visibility>
					Content
				</Hidden>
			</Example.Item>
		</Example>
	),
};

export const as: StoryObj = {
	name: "as",
	render: () => <Hidden as="span">Content</Hidden>,
	play: ({ canvas }) => {
		const el = canvas.getByText("Content");

		expect(el.tagName).toEqual("SPAN");
	},
};
