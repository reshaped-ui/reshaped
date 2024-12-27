import { StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";
import FormControl from "components/FormControl";
import Radio from "components/Radio";
import RadioGroup from "components/RadioGroup";
import TextField from "components/TextField";
import View from "components/View";

export default {
	title: "Utilities/FormControl/tests",
	component: FormControl,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/form-control",
		},
	},
};

export const className: StoryObj = {
	name: "id",
	render: () => (
		<FormControl id="test-id" hasError>
			<FormControl.Label>Label</FormControl.Label>
			<TextField name="name" />
			<FormControl.Helper>Caption</FormControl.Helper>
			<FormControl.Error>Error</FormControl.Error>
		</FormControl>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const input = canvas.getByRole("textbox");
		const label = canvas.getByText("Label");

		expect(input).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("aria-describedby", `test-id-caption test-id-error`);

		expect(label).toHaveAttribute("for", "test-id");
		expect(label).toHaveAttribute("id", `test-id-label`);
	},
};

export const group: StoryObj = {
	name: "group",
	render: () => (
		<FormControl group>
			<FormControl.Label>Label</FormControl.Label>
			<RadioGroup name="name">
				<View gap={2}>
					<Radio value="1">One</Radio>
					<Radio value="2">Two</Radio>
				</View>
			</RadioGroup>
		</FormControl>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const group = canvas.getByRole("group");

		expect(group).toBeInTheDocument();
	},
};
