import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Badge from "components/Badge";
import Scrim from "components/Scrim";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Scrim",
	component: Scrim,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/scrim",
		},
	},
};

const Placeholder = () => <View height={50} backgroundColor="primary" />;

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title="position: center">
				<Scrim backgroundSlot={<Placeholder />}>Scrim</Scrim>
			</Example.Item>

			<Example.Item title="position: bottom">
				<Scrim position="bottom" backgroundSlot={<Placeholder />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: top">
				<Scrim position="top" backgroundSlot={<Placeholder />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: start">
				<Scrim position="start" backgroundSlot={<Placeholder />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: end">
				<Scrim position="end" backgroundSlot={<Placeholder />}>
					Scrim
				</Scrim>
			</Example.Item>
		</Example>
	),
};

export const padding = {
	name: "padding",
	render: () => (
		<Example>
			<Example.Item title="padding: 2">
				<Scrim padding={2} position="bottom" backgroundSlot={<Placeholder />} borderRadius="medium">
					<Badge>Scrim</Badge>
				</Scrim>
			</Example.Item>

			<Example.Item title="paddingInline: 2, paddingBlock: 3">
				<Scrim
					paddingInline={3}
					paddingBlock={2}
					position="bottom"
					backgroundSlot={<Placeholder />}
					borderRadius="medium"
				>
					Scrim
				</Scrim>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Scrim className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</Scrim>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const composition = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="without backgroundSlot, size is based on the parent component">
				<div style={{ height: 300, position: "relative" }}>
					<Scrim>Text</Scrim>
				</div>
			</Example.Item>
		</Example>
	),
};
