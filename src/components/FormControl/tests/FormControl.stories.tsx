import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Example } from "utilities/storybook";
import FormControl from "components/FormControl";
import TextField from "components/TextField";
import View from "components/View";

export default {
	title: "Utility components/FormControl",
	component: FormControl,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/form-control",
		},
	},
};

export const status: StoryObj = {
	name: "status",
	render: () => (
		<Example>
			<Example.Item title="status: default">
				<FormControl>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>
			</Example.Item>

			<Example.Item title="status: error">
				<FormControl hasError>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
					<FormControl.Error>Error</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const inputs = canvas.getAllByRole("textbox");

		expect(inputs[0]).toHaveAccessibleName("Label");
		expect(inputs[0]).toHaveAccessibleDescription("Caption");

		expect(inputs[1]).toHaveAccessibleName("Label");
		expect(inputs[1]).toHaveAccessibleDescription("Caption Error");
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: medium">
				<FormControl size="medium">
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>

			<Example.Item title="size: large">
				<FormControl size="large">
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" size="large" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<FormControl disabled>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toBeDisabled();
	},
};

export const required = {
	name: "required",
	render: () => (
		<Example>
			<Example.Item title="required">
				<FormControl required>
					<FormControl.Label>Label</FormControl.Label>
					<TextField name="name" />
					<FormControl.Helper>Caption</FormControl.Helper>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const composition = {
	name: "test: composition",
	render: () => (
		<Example>
			<Example.Item title="horizontal">
				<FormControl>
					<View direction="row" gap={10} align="center">
						<View width="100px">
							<FormControl.Label>Label</FormControl.Label>
						</View>
						<View.Item grow>
							<TextField name="name" placeholder="Enter value" />
						</View.Item>
					</View>
				</FormControl>
			</Example.Item>
		</Example>
	),
};
