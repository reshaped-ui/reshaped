import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Timeline from "components/Timeline";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Timeline",
	component: Timeline,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/timeline",
		},
	},
};

export const base = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="children passed directly">
				<Timeline>
					<Placeholder />
					<Placeholder />
					<Placeholder />
				</Timeline>
			</Example.Item>
			<Example.Item title="children wrapped with Timeline.Item">
				<Timeline>
					<Timeline.Item>
						<Placeholder />
					</Timeline.Item>
					<Timeline.Item>
						<Placeholder />
					</Timeline.Item>
					<Timeline.Item>
						<Placeholder />
					</Timeline.Item>
				</Timeline>
			</Example.Item>
		</Example>
	),
};

export const marker = {
	name: "markerSlot",
	render: () => (
		<Example>
			<Example.Item title="slot">
				<Timeline>
					<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
						<Placeholder />
					</Timeline.Item>
					<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
						<Placeholder />
					</Timeline.Item>
					<Timeline.Item markerSlot={<Placeholder h="20px" w="20px" />}>
						<Placeholder />
					</Timeline.Item>
				</Timeline>
			</Example.Item>

			<Example.Item title="null marker">
				<Timeline>
					<Timeline.Item markerSlot={null}>
						<Placeholder />
					</Timeline.Item>
					<Timeline.Item markerSlot={null}>
						<Placeholder />
					</Timeline.Item>
				</Timeline>
			</Example.Item>
		</Example>
	),
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
