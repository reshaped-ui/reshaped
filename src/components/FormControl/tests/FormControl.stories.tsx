import React from "react";
import { Example } from "utilities/storybook";
import FormControl, { useFormControl } from "components/FormControl";
import RadioGroup from "components/RadioGroup";
import Radio from "components/Radio";
import View from "components/View";

export default { title: "Utilities/FormControl" };

const Input = () => {
	const { attributes } = useFormControl();

	return <input {...attributes} />;
};

export const status = () => (
	<Example>
		<Example.Item title="status: default">
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
				<FormControl.Error>Error</FormControl.Error>
			</FormControl>
		</Example.Item>

		<Example.Item title="status: error">
			<FormControl hasError>
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
				<FormControl.Error>Error</FormControl.Error>
			</FormControl>
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<FormControl size="medium">
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
			</FormControl>
		</Example.Item>
		<Example.Item title="size: large">
			<FormControl size="large">
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
			</FormControl>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<FormControl disabled>
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
			</FormControl>
		</Example.Item>
	</Example>
);

export const required = () => (
	<Example>
		<Example.Item title="required">
			<FormControl required>
				<FormControl.Label>Label</FormControl.Label>
				<Input />
				<FormControl.Helper>Caption</FormControl.Helper>
			</FormControl>
		</Example.Item>
	</Example>
);

export const group = () => (
	<Example>
		<Example.Item title="form group">
			<FormControl group>
				<FormControl.Label>Favorite animals:</FormControl.Label>

				<RadioGroup name="animalGroup">
					<View gap={2}>
						<Radio value="dog">Dog</Radio>
						<Radio value="cat">Cat</Radio>
					</View>
				</RadioGroup>
			</FormControl>
		</Example.Item>
	</Example>
);
