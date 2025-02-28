import { StoryObj } from "@storybook/react";
import { expect, userEvent, fn } from "@storybook/test";
import FileUpload from "components/FileUpload";

export default {
	title: "Components/FileUpload/tests",
	component: FileUpload,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/file-upload",
		},
		chromatic: { disableSnapshot: true },
	},
};

export const onChange: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "name, onChange",
	args: {
		handleChange: fn(),
	},
	render: (args) => (
		<div data-testid="root">
			<FileUpload name="test-name" onChange={args.handleChange}>
				Content
			</FileUpload>
		</div>
	),
	play: async ({ canvas, args }) => {
		const file = new File(["hello"], "hello.png", { type: "image/png" });
		const input = canvas.getByTestId("root").querySelector("input") as HTMLInputElement;

		await userEvent.upload(input, file);

		expect(input).toHaveAttribute("name", "test-name");

		expect(input.files?.[0]).toBe(file);
		expect(input.files).toHaveLength(1);

		expect(args.handleChange).toHaveBeenCalledTimes(1);
		expect(args.handleChange).toHaveBeenCalledWith({
			name: "test-name",
			value: [file],
			event: expect.objectContaining({ target: input }),
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<FileUpload
				name="name"
				className="test-classname"
				attributes={{ id: "test-id" }}
				inputAttributes={{ id: "test-input-id" }}
			>
				Content
			</FileUpload>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const input = canvas.getByTestId("root").querySelector("input");

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(input).toHaveAttribute("id", "test-input-id");
	},
};
