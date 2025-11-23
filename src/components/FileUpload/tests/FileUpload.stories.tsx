import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, fn } from "storybook/test";

import Button from "components/Button";
import FileUpload from "components/FileUpload";
import Icon from "components/Icon";
import Image from "components/Image";
import Link from "components/Link";
import View from "components/View";
import IconMic from "icons/Mic";
import { Example } from "utilities/storybook";

export default {
	title: "Components/FileUpload",
	component: FileUpload,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/file-upload",
		},
	},
};

const Demo = () => {
	const [files, setFiles] = React.useState<File[]>([]);

	return (
		<View gap={2}>
			<FileUpload name="file" onChange={(args) => setFiles((prev) => [...prev, ...args.value])}>
				<View gap={3}>
					<Icon svg={IconMic} size={8} />
					Drop files to attach
				</View>
			</FileUpload>
			<View paddingBottom={20}>
				<View gap={2} direction="row" position="absolute">
					{files &&
						Array.from(files).map((file) => {
							return (
								<Image
									key={file.name}
									src={URL.createObjectURL(file)}
									width="60px"
									height="60px"
									borderRadius="small"
								/>
							);
						})}
				</View>
			</View>
		</View>
	);
};

export const base = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="Base upload with previews">
				<Demo />
			</Example.Item>
			<Example.Item title="With trigger">
				<FileUpload name="file">
					<div>
						Drop files to attach, or{" "}
						<FileUpload.Trigger>
							<Link variant="plain">browse</Link>
						</FileUpload.Trigger>
					</div>
				</FileUpload>
			</Example.Item>
		</Example>
	),
};

export const inline = {
	name: "inline, variant, render props",
	render: () => {
		return (
			<Example>
				<Example.Item title="inline">
					<FileUpload name="file" inline onChange={console.log}>
						<View padding={2} paddingInline={3}>
							Upload
						</View>
					</FileUpload>
				</Example.Item>
				<Example.Item title="variant headless">
					<FileUpload name="file2" variant="headless" onChange={console.log}>
						<Button variant="outline" fullWidth>
							Upload
						</Button>
					</FileUpload>
				</Example.Item>
				<Example.Item title="variant headless, inline">
					<FileUpload name="file2" variant="headless" inline onChange={console.log}>
						<Button>Upload</Button>
					</FileUpload>
				</Example.Item>
				<Example.Item title="inline, render props">
					<FileUpload name="file3" variant="headless" inline onChange={console.log}>
						{(props) => <Button highlighted={props.highlighted}>Upload</Button>}
					</FileUpload>
				</Example.Item>
			</Example>
		);
	},
};

export const height = {
	name: "height",
	render: () => (
		<Example>
			<Example.Item title="Custom height">
				<FileUpload name="file" height="300px">
					<View gap={3}>
						<Icon svg={IconMic} size={8} />
						Drop files to attach
					</View>
				</FileUpload>
			</Example.Item>
		</Example>
	),
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

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<div data-testid="root">
			<FileUpload name="test-name" disabled>
				Content
			</FileUpload>
		</div>
	),
	play: async ({ canvas }) => {
		const input = canvas.getByTestId("root").querySelector("input");
		expect(input).toBeDisabled();
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

export const testWithButton = {
	name: "test: with button",
	render: () => (
		<FileUpload name="file">
			<View gap={2} direction="row">
				<FileUpload.Trigger>
					<Button>Upload</Button>
				</FileUpload.Trigger>
				<Button onClick={console.log}>Another button</Button>
			</View>
		</FileUpload>
	),
};
