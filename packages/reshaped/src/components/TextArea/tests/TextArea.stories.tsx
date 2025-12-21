import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Button from "components/Button";
import FormControl from "components/FormControl";
import Text from "components/Text";
import TextArea from "components/TextArea";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/TextArea",
	component: TextArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-area",
		},
	},
};

export const variants = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<TextArea variant="faded" name="Name" placeholder="Enter your name" />
			</Example.Item>

			<Example.Item title="variant: ghost">
				<TextArea variant="ghost" name="Name" placeholder="Enter your name" />
			</Example.Item>

			<Example.Item title="variant: headless">
				<TextArea variant="headless" name="Name" placeholder="Enter your name" />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: medium">
				<TextArea name="Name" placeholder="Enter your name" size="medium" />
			</Example.Item>

			<Example.Item title="size: large">
				<TextArea name="Name" placeholder="Enter your name" size="large" />
			</Example.Item>

			<Example.Item title="size: xlarge">
				<TextArea name="Name" placeholder="Enter your name" size="xlarge" />
			</Example.Item>

			<Example.Item title={["responsive size", "[s] large", "[m+] medium"]}>
				<TextArea name="Name" placeholder="Enter your name" size={{ s: "xlarge", m: "medium" }} />
			</Example.Item>
		</Example>
	),
};

export const resize = {
	name: "resize",
	render: () => (
		<Example>
			<Example.Item title="resize: none">
				<TextArea name="Name" placeholder="Enter your name" resize="none" />
			</Example.Item>
			<Example.Item title="resize: auto">
				<TextArea name="Name" placeholder="Enter your name" resize="auto" />
			</Example.Item>
		</Example>
	),
};

export const error = {
	name: "hasError",
	render: () => (
		<Example>
			<Example.Item title="error">
				<TextArea name="Name" placeholder="Enter your name" hasError />
			</Example.Item>
		</Example>
	),
};

export const aligner = {
	name: "aligner",
	render: () => (
		<Example>
			<Example.Item title="aligner">
				<View gap={2}>
					<Text variant="featured-2">What problem are you trying to solve?</Text>
					<TextArea.Aligner>
						<TextArea
							variant="headless"
							placeholder="Try something like 'I have a job'"
							name="description"
						/>
					</TextArea.Aligner>
					<View.Item>
						<Button>Next</Button>
					</View.Item>
				</View>
			</Example.Item>
		</Example>
	),
};

export const edgeCases = {
	name: "test: edge cases",
	render: () => (
		<Example>
			<Example.Item title="long value without breaks">
				<TextArea
					name="hey"
					defaultValue={`<div style="position:relative;width:100%;padding-top:calc(150% + 72px)">
	<iframe src="nskjdfdsdkjfsjkdfhbsjlhdfbsjlhfbs;jhbsdljfhsbljhfsbljhfbsjlfdhbsljhfbsdljhfbsljhfbslufbhsdlfds" />
</div>`}
					resize="auto"
					placeholder="Placeholder"
				/>
			</Example.Item>
		</Example>
	),
};

export const render: StoryObj = {
	name: "base",
	render: () => <TextArea name="test-name" inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveAttribute("name", "test-name");
		expect(input).toHaveAccessibleName("Label");
	},
};

export const placeholder: StoryObj = {
	name: "placeholder",
	render: () => (
		<TextArea
			name="test-name"
			placeholder="Placeholder"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("");
		expect(input).toHaveAttribute("placeholder", "Placeholder");
	},
};

export const id: StoryObj = {
	name: "id",
	render: () => (
		<TextArea name="test-name" id="test-id" inputAttributes={{ "aria-label": "Label" }} />
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		expect(input).toHaveAttribute("id", "test-id");
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => <TextArea name="test-name" disabled inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		expect(input).toBeDisabled();
	},
};

export const defaultValue: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<TextArea
			name="test-name"
			defaultValue="value"
			onChange={args.handleChange}
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("value");

		input.focus();
		await userEvent.keyboard("2");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("2value");
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<TextArea
			name="test-name"
			value="value"
			onChange={args.handleChange}
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveValue("value");

		input.focus();
		await userEvent.keyboard("2");

		expect(args.handleChange).toBeCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: "2value",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("value");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<TextArea
				className="test-classname"
				attributes={{ id: "test-id" }}
				name="name"
				inputAttributes={{ id: "test-input-id", "aria-label": "Label" }}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.getByRole("textbox");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};

export const formControl = {
	name: "test: form control",
	render: () => (
		<Example>
			<Example.Item title="with helper">
				<FormControl>
					<FormControl.Label>Name</FormControl.Label>
					<TextArea name="name" placeholder="Enter your name" />
					<FormControl.Helper>Helper</FormControl.Helper>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
			<Example.Item title="with error">
				<FormControl hasError>
					<FormControl.Label>Name</FormControl.Label>
					<TextArea name="name" placeholder="Enter your name" />
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
};
