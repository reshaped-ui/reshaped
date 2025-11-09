import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Container from "components/Container";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Utility components/Container",
	component: Container,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/container",
		},
	},
};

export const padding = {
	name: "padding",
	render: () => (
		<Example>
			<Example.Item title="padding: default">
				<Container>
					<Placeholder />
				</Container>
			</Example.Item>
			<Example.Item title="padding: 0">
				<Container padding={0}>
					<Placeholder />
				</Container>
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "width, height, maxHeight",
	render: () => (
		<Example>
			<Example.Item title="width: 200px, height: 200px">
				<Container width="200px" height="200px">
					<Placeholder h="100%" />
				</Container>
			</Example.Item>
			<Example.Item title="width: 200px, height: 200px, maxHeight: 100px">
				<Container width="200px" height="200px" maxHeight="100px">
					<Placeholder h="100%" />
				</Container>
			</Example.Item>
			<Example.Item title="width, height: [s] 100px, [m+] 200px">
				<Container width={{ s: "100px", m: "200px" }} height={{ s: "100px", m: "200px" }}>
					<Placeholder h="100%" />
				</Container>
			</Example.Item>
			<Example.Item title="width, height: [s] 100px, [m+] 200px, maxHeight: [s] 50px, [m+]: 100px">
				<Container
					width={{ s: "100px", m: "200px" }}
					height={{ s: "100px", m: "200px" }}
					maxHeight={{ s: "50px", m: "100px" }}
				>
					<Placeholder h="100%" />
				</Container>
			</Example.Item>
		</Example>
	),
};

export const flex = {
	name: "align, justify",
	render: () => (
		<Example>
			<Example.Item title="align: center, justify: center">
				<Container align="center" justify="center" height="200px">
					<Placeholder />
				</Container>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Container className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder />
			</Container>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
