import { Example, Placeholder } from "utilities/storybook";
import View from "components/View";
import Divider from "components/Divider";
import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

export default {
	title: "Components/Divider",
	component: Divider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/divider",
		},
	},
};

export const rendering: StoryObj = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="default rendering">
				<Divider />
			</Example.Item>

			<Example.Item title={["blank rendering", "box should overlap with divider"]}>
				<View width="40px" height="10px" backgroundColor="primary" />
				<Divider blank />
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const [el] = canvas.getAllByRole("separator");

		expect(el).toHaveAttribute("aria-orientation", "horizontal");
	},
};

export const vertical: StoryObj = {
	name: "vertical",
	render: () => (
		<Example>
			<Example.Item title="vertical">
				<View gap={3} direction="row" align="stretch">
					<Placeholder />
					<View.Item>
						<Divider vertical />
					</View.Item>
					<Placeholder />
				</View>
			</Example.Item>

			<Example.Item title={["responsive vertical", "[s] true", "[m+]: false"]}>
				<View gap={3} direction={{ s: "row", m: "column" }} align="stretch">
					<Placeholder />
					<View.Item>
						<Divider vertical={{ s: true, m: false }} />
					</View.Item>
					<Placeholder />
				</View>
			</Example.Item>
		</Example>
	),
	play: async ({ canvas }) => {
		const [el, elResponsive] = canvas.getAllByRole("separator");

		expect(el).toHaveAttribute("aria-orientation", "vertical");
		expect(elResponsive).not.toHaveAttribute("aria-orientation");
	},
};

export const label = {
	name: "children, contentPosition",
	render: () => {
		return (
			<Example>
				<Example.Item title="alignment">
					<View gap={4}>
						<Divider>Centered label</Divider>
						<Divider contentPosition="start">Start label</Divider>
						<Divider contentPosition="end">End label</Divider>
					</View>
				</Example.Item>

				<Example.Item title="responsive">
					<View gap={3} direction={{ s: "column", m: "row" }} align="stretch">
						<Placeholder />
						<View.Item>
							<Divider vertical={{ s: false, m: true }}>or pick second option</Divider>
						</View.Item>
						<Placeholder />
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Divider className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
