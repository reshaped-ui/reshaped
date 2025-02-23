import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Timeline from "components/Timeline";

export default {
	title: "Components/Timeline/tests",
	component: Timeline,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/timeline",
		},
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Timeline className="test-classname" attributes={{ id: "test-id" }}>
				<Timeline.Item className="test-item-classname" attributes={{ id: "test-item-id" }}>
					Content
				</Timeline.Item>
				<Timeline.Item>Content</Timeline.Item>
			</Timeline>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const items = canvas.getAllByRole("listitem");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");

		expect(items).toHaveLength(2);
		expect(items[0]).toHaveClass("test-item-classname");
		expect(items[0]).toHaveAttribute("id", "test-item-id");
	},
};
