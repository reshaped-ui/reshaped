import React from "react";
import { Example } from "utilities/storybook";
import Radio from "components/Radio";

export default { title: "Components/Radio" };

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
