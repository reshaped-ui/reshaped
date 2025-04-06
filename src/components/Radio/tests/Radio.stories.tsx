import { Example } from "utilities/storybook";
import Radio from "components/Radio";
import View from "components/View";

export default {
	title: "Components/Radio",
	component: Radio,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/radio",
		},
	},
};

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<Radio name="unselected" value="dog">
				Radio
			</Radio>
		</Example.Item>

		<Example.Item title="checked, uncontrolled">
			<Radio name="uncontrolled" value="dog" defaultChecked>
				Radio
			</Radio>
		</Example.Item>

		<Example.Item title="checked, controlled">
			<Radio name="controlled" value="dog" checked>
				Radio
			</Radio>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: small">
			<View gap={4} direction="row">
				<Radio name="animal" value="dog" size="small" defaultChecked>
					Radio
				</Radio>
			</View>
		</Example.Item>
		<Example.Item title="size: medium">
			<View gap={4} direction="row">
				<Radio name="animal" value="dog" size="medium">
					Radio
				</Radio>
			</View>
		</Example.Item>
		<Example.Item title="size: large">
			<View gap={4} direction="row">
				<Radio name="animal" value="dog" size="large">
					Radio
				</Radio>
			</View>
		</Example.Item>
		<Example.Item title="size: responsive, s: small, m: large">
			<View gap={4} direction="row">
				<Radio name="animal" value="dog" size={{ s: "small", m: "large" }}>
					Radio
				</Radio>
			</View>
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<Radio name="error" value="dog" hasError>
				Radio
			</Radio>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<Radio name="disabled" value="dog" disabled>
				Radio
			</Radio>
		</Example.Item>
		<Example.Item title="disabled, checked">
			<Radio name="disabled-checked" value="dog" disabled checked>
				Radio
			</Radio>
		</Example.Item>
	</Example>
);
