import { Example } from "utilities/storybook";
import Hidden from "components/Hidden";

export default {
	title: "Utilities/Hidden",
	component: Hidden,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden",
		},
	},
};

export const visibility = () => (
	<Example>
		<Example.Item title="hide: always">
			<Hidden hide={true}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on s">
			<Hidden hide={{ s: false, m: true }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on l/xl">
			<Hidden hide={{ s: true, l: false }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on m/l/xl">
			<Hidden hide={{ s: true, m: false }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on m">
			<Hidden hide={{ s: true, m: false, l: true }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="shown on s/xl">
			<Hidden hide={{ s: false, m: true, xl: false }}>Content</Hidden>
		</Example.Item>
		<Example.Item title="hide: always, visibility">
			<Hidden hide visibility>
				Content
			</Hidden>
		</Example.Item>
	</Example>
);
