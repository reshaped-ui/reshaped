import React from "react";
import { Example } from "utilities/storybook";
import Checkbox from "components/Checkbox";

export default { title: "Components/Checkbox" };

export const selection = () => (
	<Example>
		<Example.Item title="unselected">
			<Checkbox name="animal" value="dog">
				Checkbox
			</Checkbox>
		</Example.Item>

		<Example.Item title="checked, uncontrolled">
			<Checkbox name="animal" value="dog" defaultChecked>
				Checkbox
			</Checkbox>
		</Example.Item>

		<Example.Item title="checked, controlled">
			<Checkbox name="animal" value="dog" checked>
				Checkbox
			</Checkbox>
		</Example.Item>

		<Example.Item title="indeterminate">
			<Checkbox name="animal" value="dog" indeterminate>
				Checkbox
			</Checkbox>
		</Example.Item>
	</Example>
);

export const error = () => (
	<Example>
		<Example.Item title="error">
			<Checkbox name="animal" value="dog" hasError>
				Checkbox
			</Checkbox>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<Checkbox name="animal" value="dog" disabled>
				Checkbox
			</Checkbox>
		</Example.Item>
		<Example.Item title="disabled, checked">
			<Checkbox name="animal" value="dog" disabled checked>
				Checkbox
			</Checkbox>
		</Example.Item>
		<Example.Item title="disabled, indeterminate">
			<Checkbox name="animal" value="dog" disabled indeterminate>
				Checkbox
			</Checkbox>
		</Example.Item>
	</Example>
);
