import { Placeholder, Example } from "utilities/storybook";
import ActionBar from "components/ActionBar";

export default {
	title: "Components/ActionBar",
	component: ActionBar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/action-bar",
		},
	},
};

export const position = {
	name: "position",
	render: () => (
		<Example>
			<Example.Item title="position: top">
				<ActionBar position="top">
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="position: bottom">
				<ActionBar>
					<Placeholder />
				</ActionBar>
			</Example.Item>
		</Example>
	),
};

export const elevated = {
	name: "elevated",
	render: () => (
		<Example>
			<Example.Item title="elevated, position: top">
				<ActionBar position="top" elevated>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="elevated, position: bottom">
				<ActionBar elevated>
					<Placeholder />
				</ActionBar>
			</Example.Item>
		</Example>
	),
};

export const padding = {
	name: "padding, paddingBlock, paddingInline",
	render: () => (
		<Example>
			<Example.Item title="padding: 6">
				<ActionBar padding={6}>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="paddingBlock: 2, paddingInline: 4">
				<ActionBar paddingBlock={2} paddingInline={4}>
					<Placeholder />
				</ActionBar>
			</Example.Item>

			<Example.Item title="padding: [s] 4, [m+] 6">
				<ActionBar padding={{ s: 4, m: 6 }}>
					<Placeholder />
				</ActionBar>
			</Example.Item>
		</Example>
	),
};
