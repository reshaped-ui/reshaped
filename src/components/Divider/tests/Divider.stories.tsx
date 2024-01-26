import { Example, Placeholder } from "utilities/storybook";
import View from "components/View";
import Divider from "components/Divider";

export default {
	title: "Components/Divider",
	component: Divider,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/divider",
		},
	},
};

export const rendering = () => (
	<Example>
		<Example.Item title="default rendering">
			<Divider />
		</Example.Item>

		<Example.Item title={["blank rendering", "box should overlap with divider"]}>
			<View width="40px" height="10px" backgroundColor="primary" />
			<Divider blank />
		</Example.Item>
	</Example>
);

export const vertical = () => (
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
);
