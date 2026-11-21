import HiddenVisually from "@/components/HiddenVisually";
import { Example } from "@/utilities/storybook";

export default {
	title: "Utility components/HiddenVisually",
	component: HiddenVisually,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-visually",
		},
	},
};

export const visibility = {
	name: "visibility",
	render: () => (
		<Example>
			<Example.Item title="pronounced by screen readers">
				<HiddenVisually>Screen-reader only</HiddenVisually>
			</Example.Item>
		</Example>
	),
};
