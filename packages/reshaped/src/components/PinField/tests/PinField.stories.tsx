import { StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import FormControl from "components/FormControl";
import PinField from "components/PinField";
import { Example } from "utilities/storybook";

export default {
	title: "Components/PinField",
	component: PinField,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/pin-field",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => <PinField name="test-name" inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole("textbox");

		expect(elInput).toBeInTheDocument();
		expect(elInput).toHaveAttribute("name", "test-name");
		expect(elInput).toHaveAttribute("autocomplete", "one-time-code");
		expect(elInput).toHaveAttribute("inputmode", "numeric");
	},
};

export const variant = {
	name: "variant",
	render: () => (
		<Example>
			<Example.Item title="variant: faded">
				<PinField name="pin" variant="faded" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<PinField name="pin" size="small" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: medium">
				<PinField name="pin" size="medium" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: large">
				<PinField name="pin" size="large" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: xlarge">
				<PinField name="pin" size="xlarge" inputAttributes={{ "aria-label": "Pin" }} />
			</Example.Item>

			<Example.Item title="size: responsive, s: medium, m+: xlarge">
				<PinField
					name="pin"
					size={{ s: "medium", m: "xlarge" }}
					inputAttributes={{ "aria-label": "Pin" }}
				/>
			</Example.Item>
		</Example>
	),
};

export const valueLength: StoryObj = {
	name: "valueLength",
	render: () => (
		<PinField name="test-name" valueLength={6} inputAttributes={{ "aria-label": "Label" }} />
	),
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole("textbox");

		expect(elInput).toHaveAttribute("maxlength", "6");
	},
};

export const defaultValue: StoryObj<{ handleChange?: ReturnType<typeof fn> }> = {
	name: "defaultValue, uncontrolled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<PinField
			name="test-name"
			onChange={args.handleChange}
			defaultValue="12"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const elInput = canvas.getByRole("textbox");

		elInput.focus();
		await userEvent.keyboard("3");

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			value: "123",
			name: "test-name",
			event: expect.objectContaining({ target: elInput }),
		});
		expect(elInput).toHaveValue("123");
	},
};

export const value: StoryObj<{ handleChange?: ReturnType<typeof fn> }> = {
	name: "value, controlled",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<PinField
			name="test-name"
			onChange={args.handleChange}
			value="12"
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const elInput = canvas.getByRole("textbox");

		elInput.focus();
		await userEvent.keyboard("3");

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			value: "123",
			name: "test-name",
			event: expect.objectContaining({ target: elInput }),
		});
		expect(elInput).toHaveValue("12");
	},
};

export const pattern: StoryObj<{ handleChange?: ReturnType<typeof fn> }> = {
	name: "pattern",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<PinField
			name="test-name"
			pattern="alphabetic"
			defaultValue="ab"
			onChange={args.handleChange}
			inputAttributes={{ "aria-label": "Label" }}
		/>
	),
	play: async ({ canvas, args }) => {
		const elInput = canvas.getByRole("textbox");

		elInput.focus();
		await userEvent.keyboard("3");

		expect(elInput).toHaveValue("ab");
		expect(args.handleChange).toHaveBeenCalledTimes(0);

		await userEvent.keyboard("c");
		expect(elInput).toHaveValue("abc");
		expect(args.handleChange).toHaveBeenCalledTimes(1);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<PinField
				name="test-name"
				className="test-classname"
				attributes={{ id: "test-id" }}
				inputAttributes={{ "aria-label": "Label", id: "test-input-id" }}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.queryByLabelText("Label");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};

export const formControl: StoryObj = {
	name: "test: with FormControl",
	render: () => (
		<FormControl>
			<FormControl.Label>Label</FormControl.Label>
			<PinField name="test-name" />
		</FormControl>
	),
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole("textbox");

		expect(elInput).toHaveAccessibleName("Label");
	},
};

export const keyboard: StoryObj = {
	name: "test: keyboard navigation",
	render: () => <PinField name="test-name" inputAttributes={{ "aria-label": "Label" }} />,
	play: async ({ canvas }) => {
		const elInput = canvas.getByRole<HTMLInputElement>("textbox");

		elInput.focus();

		expect(elInput.selectionStart).toEqual(0);
		expect(elInput.selectionEnd).toEqual(0);

		await userEvent.keyboard("1");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(1);
			expect(elInput.selectionEnd).toEqual(1);
		});

		await userEvent.keyboard("234");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(3);
			expect(elInput.selectionEnd).toEqual(4);
		});

		// Move back to the first character
		await userEvent.keyboard("{ArrowLeft/}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(2);
			expect(elInput.selectionEnd).toEqual(3);
		});
		await userEvent.keyboard("{ArrowLeft/}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(1);
			expect(elInput.selectionEnd).toEqual(2);
		});
		await userEvent.keyboard("{ArrowLeft}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(0);
			expect(elInput.selectionEnd).toEqual(1);
		});

		// Move to the third character
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(1);
			expect(elInput.selectionEnd).toEqual(2);
		});
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(2);
			expect(elInput.selectionEnd).toEqual(3);
		});

		expect(elInput).toHaveValue("1234");
		await userEvent.keyboard("{backspace}");
		expect(elInput).toHaveValue("124");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(2);
			expect(elInput.selectionEnd).toEqual(3);
		});

		// Switched to type mode
		await userEvent.keyboard("{ArrowRight}");

		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(3);
			expect(elInput.selectionStart).toEqual(3);
		});

		// Can't move further
		await userEvent.keyboard("{ArrowRight}");
		await waitFor(() => {
			expect(elInput.selectionStart).toEqual(3);
			expect(elInput.selectionStart).toEqual(3);
		});
	},
};
