import { StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";

import Avatar from "@/components/Avatar";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";
import IconZap from "@/icons/Zap";

export default {
	title: "Components/Avatar",
	component: Avatar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/avatar",
		},
	},
};

export const src: StoryObj = {
	name: "src, alt",
	render: () => (
		<Example>
			<Example.Item title="src, alt">
				<Avatar
					src="https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
					alt="Amsterdam canal"
					size={12}
				/>
			</Example.Item>

			<Example.Item title="src">
				<Avatar src="https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80" />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const presentation = canvas.getByRole("presentation");
		const img = canvas.getByRole("img");

		expect(presentation).toBeInTheDocument();
		expect(img).toBeInTheDocument();
		expect(img).toHaveAccessibleName("Amsterdam canal");
	},
};

export const initials: StoryObj = {
	name: "initials, icon",
	render: () => (
		<Example>
			<Example.Item title="initials">
				<Avatar initials="RS" />
			</Example.Item>

			<Example.Item title="icon">
				<Avatar icon={IconZap} />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: 6">
				<View direction="row" gap={3}>
					<Avatar size={6} icon={IconZap} />
					<Avatar size={6} initials="RS" squared />
				</View>
			</Example.Item>

			<Example.Item title="size: 15">
				<View direction="row" gap={3}>
					<Avatar size={15} icon={IconZap} />
					<Avatar size={15} initials="RS" squared />
				</View>
			</Example.Item>

			<Example.Item title="size: 40">
				<View direction="row" gap={3}>
					<Avatar size={40} icon={IconZap} />
					<Avatar size={40} initials="RS" squared />
				</View>
			</Example.Item>

			<Example.Item title={["responsive size", "[s] 10", "[m+] 20"]}>
				<View direction="row" gap={3}>
					<Avatar size={{ s: 10, m: 20 }} icon={IconZap} />
					<Avatar size={{ s: 10, m: 20 }} icon={IconZap} squared />
				</View>
			</Example.Item>
		</Example>
	),
};

export const squared = {
	name: "squared",
	render: () => (
		<Example>
			<Example.Item title="squared, with image">
				<Avatar
					squared
					src="https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
				/>
			</Example.Item>
			<Example.Item title="squared, with initials">
				<Avatar squared initials="RS" />
			</Example.Item>
			<Example.Item title="squared, with initials">
				<Avatar squared icon={IconZap} />
			</Example.Item>
		</Example>
	),
};

export const colors = {
	name: "color, variant",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<View gap={4} direction="row">
					<Avatar color="neutral" icon={IconZap} />
					<Avatar color="neutral" variant="faded" icon={IconZap} />
				</View>
			</Example.Item>
			<Example.Item title="color: primary">
				<View gap={4} direction="row">
					<Avatar color="primary" icon={IconZap} />
					<Avatar color="primary" variant="faded" icon={IconZap} />
				</View>
			</Example.Item>
			<Example.Item title="color: positive">
				<View gap={4} direction="row">
					<Avatar color="positive" icon={IconZap} />
					<Avatar color="positive" variant="faded" icon={IconZap} />
				</View>
			</Example.Item>
			<Example.Item title="color: warning">
				<View gap={4} direction="row">
					<Avatar color="warning" icon={IconZap} />
					<Avatar color="warning" variant="faded" icon={IconZap} />
				</View>
			</Example.Item>
			<Example.Item title="color: critical">
				<View gap={4} direction="row">
					<Avatar color="critical" icon={IconZap} />
					<Avatar color="critical" variant="faded" icon={IconZap} />
				</View>
			</Example.Item>
		</Example>
	),
};

export const fallback = {
	name: "test: fallback",
	render: () => {
		const [error, setError] = useState(false);

		return (
			<Avatar
				src={error ? undefined : "/foo"}
				icon={IconZap}
				imageAttributes={{
					onError: () => setError(true),
				}}
			/>
		);
	},
};

export const renderImage = {
	name: "renderImage",
	render: () => (
		<Example>
			<Example.Item title="renderImage">
				<Avatar
					src="https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80"
					alt="Amsterdam canal"
					// oxlint-disable-next-line jsx_a11y/alt-text
					renderImage={(attributes) => <img {...attributes} id="test-image" />}
				/>
			</Example.Item>
		</Example>
	),
};
