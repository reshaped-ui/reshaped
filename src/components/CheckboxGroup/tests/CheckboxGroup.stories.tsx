import { Example } from "utilities/storybook";
import View from "components/View";
import CheckboxGroup from "components/CheckboxGroup";
import Checkbox from "components/Checkbox";

export default {
	title: "Components/CheckboxGroup",
	component: CheckboxGroup,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/checkbox",
		},
	},
};

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<CheckboxGroup name="animal">
				<View gap={3}>
					<Checkbox value="dog">Checkbox 1</Checkbox>
					<Checkbox value="cat">Checkbox 2</Checkbox>
				</View>
			</CheckboxGroup>
		</Example.Item>

		<Example.Item title="checked, uncontrolled">
			<CheckboxGroup name="animal" defaultValue={["dog"]}>
				<View gap={3}>
					<Checkbox value="dog">Checkbox 1</Checkbox>
					<Checkbox value="cat">Checkbox 2</Checkbox>
				</View>
			</CheckboxGroup>
		</Example.Item>

		<Example.Item title="checked, controlled">
			<CheckboxGroup name="animal" value={["dog"]}>
				<View gap={3}>
					<Checkbox value="dog">Checkbox 1</Checkbox>
					<Checkbox value="cat">Checkbox 2</Checkbox>
				</View>
			</CheckboxGroup>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<CheckboxGroup name="animal" disabled>
				<View gap={3}>
					<Checkbox value="dog">Dog</Checkbox>
					<Checkbox value="cat">Cat</Checkbox>
				</View>
			</CheckboxGroup>
		</Example.Item>
	</Example>
);
