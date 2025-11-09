import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Scrim from "components/Scrim";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Scrim",
	component: Scrim,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/scrim",
		},
	},
};

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title="position: center">
				<Scrim backgroundSlot={<Placeholder h={200} />}>Scrim</Scrim>
			</Example.Item>

			<Example.Item title="position: bottom">
				<Scrim position="bottom" backgroundSlot={<Placeholder h={200} />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: top">
				<Scrim position="top" backgroundSlot={<Placeholder h={200} />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: start">
				<Scrim position="start" backgroundSlot={<Placeholder h={200} />}>
					Scrim
				</Scrim>
			</Example.Item>

			<Example.Item title="position: end">
				<Scrim position="end" backgroundSlot={<Placeholder h={200} />}>
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
