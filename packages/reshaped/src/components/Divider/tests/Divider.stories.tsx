import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Divider from "components/Divider";
import View from "components/View";
import { Example, Placeholder } from "utilities/storybook";

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

export const color: StoryObj = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="neutral-faded">
				<Divider color="neutral-faded" />
			</Example.Item>
			<Example.Item title="neutral">
				<Divider color="neutral" />
			</Example.Item>
		</Example>
	),
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

export const offset: StoryObj = {
	name: "offset",
	render: () => (
		<Example>
			<Example.Item title="offset: 10px">
				<View width="100px" backgroundColor="neutral" paddingBlock={4}>
					<Divider offset="40px" />
				</View>
			</Example.Item>
			<Example.Item title="offset: 10px, vertical">
				<View height="100px" backgroundColor="neutral" paddingInline={4} width="33px">
					<Divider vertical offset="40px" />
				</View>
			</Example.Item>
		</Example>
	),
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
