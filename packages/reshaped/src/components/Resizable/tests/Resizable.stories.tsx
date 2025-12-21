import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Button from "components/Button";
import Resizable from "components/Resizable";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Resizable",
	component: Resizable,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/resizable",
		},
		// Skip because of the aria-hidden applied to buttons, they're not needed for the screen reader navigation
		a11y: {
			disable: true,
		},
	},
};

const Panel = (props: { height?: string }) => (
	<View
		backgroundColor="neutral-faded"
		borderRadius="medium"
		align="center"
		justify="center"
		height={props.height ?? "100%"}
	>
		Panel
	</View>
);

const Handle = () => {
	return (
		<Resizable.Handle>
			{(attributes, props) => (
				<View
					backgroundColor={props.status === "dragging" ? "primary" : "primary-faded"}
					padding={props.direction === "column" ? 1 : 8}
					height="100%"
					align="center"
					justify="center"
					borderRadius="small"
					animated
				>
					<Button attributes={attributes} type="button">
						Drag me
					</Button>
				</View>
			)}
		</Resizable.Handle>
	);
};

export const direction = {
	name: "direction",
	render: () => {
		return (
			<Example>
				<Example.Item title="row">
					<Resizable height="200px">
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
					</Resizable>
				</Example.Item>
				<Example.Item title="column">
					<Resizable height="400px" direction="column">
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
					</Resizable>
				</Example.Item>

				{/* Test that page doesn't scroll on dragging */}
				<div style={{ height: 2000 }} />
			</Example>
		);
	},
};

export const children = {
	name: "children",
	render: () => {
		return (
			<Example>
				<Example.Item title="render props, row">
					<Resizable height="200px">
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
					</Resizable>
				</Example.Item>
				<Example.Item title="render props, column">
					<Resizable height="400px" direction="column">
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Resizable.Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
						<Handle />
						<Resizable.Item>
							<Panel />
						</Resizable.Item>
					</Resizable>
				</Example.Item>
			</Example>
		);
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="bordered, row">
				<Resizable height="200px" variant="bordered">
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
					<Resizable.Handle />
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
					<Resizable.Handle />
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
				</Resizable>
			</Example.Item>
			<Example.Item title="bordered, column">
				<Resizable height="400px" direction="column" variant="bordered">
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
					<Resizable.Handle />
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
					<Resizable.Handle />
					<Resizable.Item>
						<Panel />
					</Resizable.Item>
				</Resizable>
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "minSize, maxSize, defaultSize",
	render: () => (
		<Resizable className="test-classname" attributes={{ id: "test-id" }} height="200px">
			<Resizable.Item>
				<Panel />
			</Resizable.Item>
			<Resizable.Handle />
			<Resizable.Item minSize="200px" maxSize="500px" defaultSize="300px">
				<Panel />
			</Resizable.Item>
		</Resizable>
	),
};

export const layout = {
	name: "height, gap",
	render: () => (
		<Resizable height="100px" gap={8}>
			<Resizable.Item>
				<Panel />
			</Resizable.Item>
			<Resizable.Handle />
			<Resizable.Item>
				<Panel />
			</Resizable.Item>
		</Resizable>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Resizable className="test-classname" attributes={{ id: "test-id" }} height="200px">
				<Resizable.Item>
					<Panel />
				</Resizable.Item>
				<Resizable.Handle />
				<Resizable.Item>
					<Panel />
				</Resizable.Item>
			</Resizable>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
