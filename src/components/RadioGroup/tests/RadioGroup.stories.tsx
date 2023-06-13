import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import RadioGroup from "components/RadioGroup";
import Radio from "components/Radio";

export default { title: "Components/RadioGroup" };

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<RadioGroup name="unselected">
				<View gap={3}>
					<Radio value="dog">Radio 1</Radio>
					<Radio value="cat">Radio 2</Radio>
				</View>
			</RadioGroup>
		</Example.Item>

		<Example.Item title="checked, uncontrolled">
			<RadioGroup name="uncontrolled" defaultValue={"dog"}>
				<View gap={3}>
					<Radio value="dog">Radio 1</Radio>
					<Radio value="cat">Radio 2</Radio>
				</View>
			</RadioGroup>
		</Example.Item>

		<Example.Item title="checked, controlled">
			<RadioGroup name="controlled" value={"dog"}>
				<View gap={3}>
					<Radio value="dog">Radio 1</Radio>
					<Radio value="cat">Radio 2</Radio>
				</View>
			</RadioGroup>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<RadioGroup name="disabled" disabled>
				<View gap={3}>
					<Radio value="dog">Dog</Radio>
					<Radio value="cat">Cat</Radio>
				</View>
			</RadioGroup>
		</Example.Item>
	</Example>
);
