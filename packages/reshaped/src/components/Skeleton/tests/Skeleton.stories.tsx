import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Skeleton from "components/Skeleton";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Skeleton",
	component: Skeleton,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/skeleton",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="text">
				<Skeleton />
			</Example.Item>

			<Example.Item title="view, rectangle">
				<Skeleton width="100px" height="100px" />
			</Example.Item>

			<Example.Item title="view, circle">
				<Skeleton width="100px" height="100px" borderRadius="circular" />
			</Example.Item>

			<Example.Item title="view, rectangle, responsive">
				<Skeleton width={{ s: "100px", m: "200px" }} height={{ s: "100px", m: "200px" }} />
			</Example.Item>
		</Example>
	),
};

export const radius = {
	name: "radius",
	render: () => (
		<Example>
			<Example.Item title="radius=small">
				<Skeleton width="60px" height="60px" borderRadius="small" />
			</Example.Item>

			<Example.Item title="radius=medium">
				<Skeleton width="60px" height="60px" borderRadius="medium" />
			</Example.Item>

			<Example.Item title="radius=large">
				<Skeleton width="60px" height="60px" borderRadius="large" />
			</Example.Item>

			<Example.Item title="radius=circular">
				<Skeleton width="60px" height="60px" borderRadius="circular" />
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Skeleton className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
