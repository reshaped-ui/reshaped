import { Example } from "utilities/storybook";
import HiddenVisually from "components/HiddenVisually";

export default {
	title: "Utilities/HiddenVisually",
	component: HiddenVisually,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/hidden-visually",
		},
	},
};

export const visibility = () => (
	<Example>
		<Example.Item title="pronounced by screen readers">
			<HiddenVisually>Screen-reader only</HiddenVisually>
		</Example.Item>
	</Example>
);
