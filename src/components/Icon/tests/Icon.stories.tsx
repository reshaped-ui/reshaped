import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Icon from "components/Icon";
import Text from "components/Text";
import View from "components/View";
import IconMic from "icons/Mic";
import IconZap from "icons/Zap";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/Icon",
	component: Icon,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/icon",
		},
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: 4">
				<Icon svg={IconZap} size={4} />
			</Example.Item>
			<Example.Item title="size: 8">
				<Icon svg={IconZap} size={8} />
			</Example.Item>
			<Example.Item title="size: 100%">
				<View width={25} height={25}>
					<Icon svg={IconZap} size="100%" />
				</View>
			</Example.Item>
			<Example.Item title={["responsive size", "[s] 5", "[m]: 10"]}>
				<Icon svg={IconZap} size={{ s: 5, m: 10 }} />
			</Example.Item>
			<Example.Item title="size: inherit from font">
				<Text variant="title-6">
					<View direction="row" align="center" gap={2}>
						<Icon svg={IconZap} />
						<View.Item>Reshaped</View.Item>
					</View>
				</Text>
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<Icon svg={IconZap} color="neutral" />
			</Example.Item>
			<Example.Item title="color: neutral-faded">
				<Icon svg={IconZap} color="neutral-faded" />
			</Example.Item>
			<Example.Item title="color: primary">
				<Icon svg={IconZap} color="primary" />
			</Example.Item>
			<Example.Item title="color: critical">
				<Icon svg={IconZap} color="critical" />
			</Example.Item>
			<Example.Item title="color: positive">
				<Icon svg={IconZap} color="positive" />
			</Example.Item>
			<Example.Item title="color: disabled">
				<Icon svg={IconZap} color="disabled" />
			</Example.Item>
			<Example.Item title="color: inherit">
				<div style={{ color: "tomato" }}>
					<Icon svg={IconZap} />
				</div>
			</Example.Item>
		</Example>
	),
};

export const autoWidth = {
	name: "autoWidth, blank",
	render: () => (
		<Example>
			<Example.Item title="square boundaries">
				<div style={{ background: "var(--rs-color-background-neutral)", display: "inline-block" }}>
					<Icon svg={IconMic} size={10} />
				</div>
			</Example.Item>
			<Example.Item title="auto width boundaries">
				<div style={{ background: "var(--rs-color-background-neutral)", display: "inline-block" }}>
					<Icon svg={IconMic} size={10} autoWidth />
				</div>
			</Example.Item>
			<Example.Item title="blank">
				<div style={{ background: "var(--rs-color-background-neutral)", display: "inline-block" }}>
					<Icon svg={null} size={10} />
				</div>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Icon svg={IconZap} className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const render: StoryObj = {
	name: "test: hidden from sr",
	render: () => (
		<div data-testid="root">
			<Icon svg={IconZap} />
		</div>
	),
	play: ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toBeInTheDocument();
		expect(root).toHaveAttribute("aria-hidden");
	},
};
