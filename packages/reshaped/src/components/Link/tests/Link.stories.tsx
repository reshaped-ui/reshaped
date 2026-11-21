import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Link from "@/components/Link";
import Text from "@/components/Text";
import { Example } from "@/utilities/storybook";
import IconZap from "@/icons/Zap";

export default {
	title: "Components/Link",
	component: Link,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: underline">
				<Link href="http://reshaped.so" attributes={{ target: "_blank" }}>
					Reshaped
				</Link>
			</Example.Item>
			<Example.Item title="variant: plain">
				<Link onClick={() => {}} variant="plain">
					Link
				</Link>
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: primary">
				<Link color="primary" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item title="color: critical">
				<Link color="critical" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item title="color: positive">
				<Link color="positive" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item title="color: warning">
				<Link color="warning" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item title="color: inherit">
				<Link color="inherit" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "icon",
	render: () => (
		<Example>
			<Example.Item title="icon, variant: underline">
				<Link icon={IconZap} onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item title="icon, variant: plain">
				<Link icon={IconZap} variant="plain" onClick={() => {}}>
					Link
				</Link>
			</Example.Item>
			<Example.Item
				title={["icon, variant: underline", "should inherit display-1 size from the parent"]}
			>
				<Text variant="featured-3">
					<Link icon={IconZap} variant="underline" onClick={() => {}}>
						Instant delivery
					</Link>
				</Text>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Link disabled onClick={() => {}}>
			Trigger
		</Link>
	),
	play: ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};

export const fullWidth: StoryObj = {
	name: "fullWidth",
	render: () => (
		<Link fullWidth onClick={() => {}}>
			Trigger
		</Link>
	),
};

export const testMultilineInText = {
	name: "test: multiline",
	render: () => (
		<Example>
			<Example.Item title="should wrap inside the text">
				<div>
					Someone asked me to write this text that is boring to ready for everyone and to add&nbsp;
					<Link href="/">this very very long link</Link> to it.
				</div>
			</Example.Item>
		</Example>
	),
};
