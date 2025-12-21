import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import Badge from "components/Badge";
import Button from "components/Button";
import Divider from "components/Divider";
import FormControl from "components/FormControl";
import Select from "components/Select";
import Text from "components/Text";
import TextField from "components/TextField";
import View from "components/View";
import IconZap from "icons/Zap";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/TextField",
	component: TextField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/text-field",
		},
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<TextField variant="faded" name="Name" placeholder="Enter your name" />
			</Example.Item>

			<Example.Item title="variant: headless">
				<TextField variant="ghost" name="Name" placeholder="Enter your name" />
			</Example.Item>

			<Example.Item title="variant: headless">
				<TextField variant="headless" name="Name" placeholder="Enter your name" />
			</Example.Item>
		</Example>
	),
};

export const rounded = {
	name: "rounded",
	render: () => (
		<Example>
			<Example.Item title="rounded">
				<TextField
					rounded
					name="Name"
					placeholder="Enter your name"
					icon={IconZap}
					prefix="+31"
					endSlot={<Button rounded size="small" icon={IconZap} />}
				/>
			</Example.Item>

			<Example.Item title="rounded, variant: faded">
				<View direction="row" gap={2}>
					<View.Item grow>
						<TextField
							rounded
							variant="faded"
							name="Name"
							placeholder="Enter your name"
							startSlot={
								<Badge rounded size="small">
									Hello
								</Badge>
							}
						/>
					</View.Item>
					<Button rounded>Submit</Button>
				</View>
			</Example.Item>
		</Example>
	),
};

export const error = {
	name: "hasError",
	render: () => (
		<Example>
			<Example.Item title="error">
				<TextField name="Name" placeholder="Enter your name" hasError />
			</Example.Item>
		</Example>
	),
};

export const attachments = {
	name: "icon, endIcon, suffix, prefix, startSlot, endSlot, startSlotPadding, endSlotPadding",
	render: () => (
		<Example>
			<Example.Item title="icon">
				<TextField name="Name" placeholder="Enter your name" value="Reshaped" icon={IconZap} />
			</Example.Item>
			<Example.Item title="endIcon">
				<TextField name="Name" placeholder="Enter your name" value="Reshaped" endIcon={IconZap} />
			</Example.Item>

			<Example.Item title={["startSlot", "vertical and horizontal padding aligned"]}>
				<TextField
					name="Name"
					placeholder="Enter your name"
					value="Reshaped"
					startSlot={<Placeholder h={20} />}
				/>
			</Example.Item>

			<Example.Item title={["endSlot", "vertical and horizontal padding aligned"]}>
				<TextField
					name="Name"
					placeholder="Enter your name"
					value="Reshaped"
					endSlot={
						<Button
							icon={IconZap}
							size="small"
							onClick={() => {}}
							attributes={{ "aria-label": "Action" }}
						/>
					}
				/>
			</Example.Item>

			<Example.Item title="paddingSlotStart=4, paddingSlotEnd=2">
				<TextField
					name="Name"
					placeholder="Enter your name"
					value="Reshaped"
					startSlotPadding={4}
					endSlotPadding={2}
					startSlot={<Placeholder h={20} />}
					endSlot={<Placeholder h={20} />}
				/>
			</Example.Item>

			<Example.Item title="with all affixes">
				<TextField
					name="Name"
					placeholder="Enter your name"
					value="Reshaped"
					endIcon={IconZap}
					icon={IconZap}
					prefix="Estimated value"
					suffix="m2"
					startSlot={<Placeholder h={20} />}
					endSlot={<Placeholder h={20} />}
				/>
			</Example.Item>

			<Example.Item title="multiline wrap">
				<TextField
					name="Name"
					placeholder="Enter your name"
					value="Reshaped"
					startSlot={[...Array(10).keys()].map((i) => (
						<Badge size="small" key={i}>
							Item {i + 1}
						</Badge>
					))}
					multiline
				/>
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<TextField name="Name" placeholder="Enter your name" size="small" icon={IconZap} />
			</Example.Item>

			<Example.Item title="size: medium">
				<TextField name="Name" placeholder="Enter your name" size="medium" icon={IconZap} />
			</Example.Item>

			<Example.Item title="size: large">
				<TextField name="Name" placeholder="Enter your name" size="large" icon={IconZap} />
			</Example.Item>

			<Example.Item title="size: xlarge">
				<TextField name="Name" placeholder="Enter your name" size="xlarge" icon={IconZap} />
			</Example.Item>

			<Example.Item title={["responsive size", "[s] xlarge", "[m+] medium"]}>
				<TextField
					name="Name"
					placeholder="Enter your name"
					size={{ s: "xlarge", m: "medium" }}
					icon={IconZap}
				/>
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
					<TextField.Aligner>
						<TextField
							variant="headless"
							placeholder="Try something like 'I have a job'"
							name="description"
						/>
					</TextField.Aligner>
					<View.Item>
						<Button>Next</Button>
					</View.Item>
				</View>
			</Example.Item>
		</Example>
	),
};

export const render: StoryObj = {
	name: "base",
	render: () => <TextField name="test-name" inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");

		expect(input).toHaveAttribute("name", "test-name");
		expect(input).toHaveAccessibleName("Label");
	},
};

export const placeholder: StoryObj = {
	name: "placeholder",
	render: () => (
		<TextField
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
		<TextField name="test-name" id="test-id" inputAttributes={{ "aria-label": "Label" }} />
	),
	play: async ({ canvas }) => {
		const input = canvas.getByRole("textbox");
		expect(input).toHaveAttribute("id", "test-id");
	},
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => <TextField name="test-name" disabled inputAttributes={{ "aria-label": "Label" }} />,
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
		<TextField
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
			value: "value2",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("value2");
	},
};

export const value: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<TextField
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
			value: "value2",
			event: expect.objectContaining({ target: input }),
		});
		expect(input).toHaveValue("value");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<TextField
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
					<TextField name="name" placeholder="Enter your name" />
					<FormControl.Helper>Helper</FormControl.Helper>
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
			<Example.Item title="with error">
				<FormControl hasError>
					<FormControl.Label>Name</FormControl.Label>
					<TextField name="name" placeholder="Enter your name" />
					<FormControl.Error>This field is required</FormControl.Error>
				</FormControl>
			</Example.Item>
		</Example>
	),
};

export const foo = () => {
	return (
		<TextField
			name="test-name"
			inputAttributes={{ "aria-label": "Label" }}
			endSlotPadding={0}
			endSlot={
				<View gap={0} direction="row" align="stretch">
					<Divider color="neutral" vertical />
					<Select.Custom
						name="test-name"
						inputAttributes={{ "aria-label": "Label" }}
						variant="ghost"
					>
						<Select.Option value="dog">Dog</Select.Option>
						<Select.Option value="turtle">Turtle</Select.Option>
					</Select.Custom>
				</View>
			}
		/>
	);
};
