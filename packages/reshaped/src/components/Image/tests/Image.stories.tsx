import { StoryObj } from "@storybook/react-vite";
import { expect, fn, Mock, waitFor } from "storybook/test";

import Icon from "components/Icon";
import View from "components/View";
import IconZap from "icons/Zap";
import { Example } from "utilities/storybook";

import Image from "../Image";

export default {
	title: "Utility components/Image",
	component: Image,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/image",
		},
	},
};

const imgUrl =
	"https://images.unsplash.com/photo-1536880756060-98a6a140f0a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80";

export const src: StoryObj = {
	name: "src, alt",
	render: () => (
		<Example>
			<Example.Item title="src, alt">
				<Image src={imgUrl} alt="Image alt" />
			</Example.Item>

			<Example.Item title="src">
				<Image src={imgUrl} />
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const presentation = canvas.getByRole("presentation");
		const img = canvas.getByRole("img");

		expect(presentation).toBeInTheDocument();
		expect(img).toBeInTheDocument();
		expect(img).toHaveAccessibleName("Image alt");
	},
};

export const size = {
	name: "width, height, maxWidth, aspectRatio",
	render: () => (
		<Example>
			<Example.Item title="width: 200px">
				<Image src={imgUrl} width="200px" />
			</Example.Item>
			<Example.Item title="height: 200px">
				<Image src={imgUrl} height="200px" />
			</Example.Item>
			<Example.Item title="maxWidth: 200px">
				<Image src={imgUrl} maxWidth="200px" />
			</Example.Item>
			<Example.Item title="aspectRatio: 1/1">
				<Image src={imgUrl} aspectRatio={1 / 1} width="300px" />
			</Example.Item>
			<Example.Item title={["responsive width", "[s] 200px", "[m+] 300px"]}>
				<Image src={imgUrl} width={{ s: "200px", m: "300px" }} />
			</Example.Item>
			<Example.Item title="width: 200px, fallback">
				<Image fallback={imgUrl} width="200px" />
			</Example.Item>
		</Example>
	),
};

export const radius = {
	name: "borderRadius",
	render: () => (
		<Example>
			<Example.Item title="radius: small">
				<View width="300px">
					<Image src={imgUrl} borderRadius="small" />
				</View>
			</Example.Item>
			<Example.Item title="radius: medium">
				<View width="300px">
					<Image src={imgUrl} borderRadius="medium" />
				</View>
			</Example.Item>
			<Example.Item title="radius: large">
				<View width="300px">
					<Image src={imgUrl} borderRadius="large" />
				</View>
			</Example.Item>
			<Example.Item title="radius: circular">
				<View width="300px">
					<Image src={imgUrl} borderRadius="circular" />
				</View>
			</Example.Item>
		</Example>
	),
};

export const displayMode = {
	name: "displayMode",
	render: () => (
		<Example>
			<Example.Item title="mode: cover">
				<Image src={imgUrl} height="200px" width="100%" displayMode="cover" />
			</Example.Item>
			<Example.Item title="mode: contain">
				<Image src={imgUrl} height="200px" width="100%" displayMode="contain" />
			</Example.Item>
		</Example>
	),
};

export const outline = {
	name: "outline",
	render: () => (
		<Example>
			<Example.Item title="outline: true">
				<Image src={imgUrl} height="200px" width="100%" outline borderRadius="small" />
			</Example.Item>
		</Example>
	),
};

export const onLoad: StoryObj<{ handleLoad: ReturnType<typeof fn> }> = {
	name: "onLoad",
	args: {
		handleLoad: fn(),
	},
	render: (args) => <Image src={imgUrl} alt="photo" onLoad={args.handleLoad} />,
	play: async ({ canvas, args }) => {
		const { handleLoad } = args;
		const img = canvas.getByRole("img");

		await waitFor(() => {
			expect(handleLoad).toHaveBeenCalledTimes(1);
			expect(handleLoad).toHaveBeenCalledWith(
				expect.objectContaining({ target: img, type: "load" })
			);
		});
	},
};

export const onError: StoryObj<{ handleError: Mock }> = {
	name: "onError",
	args: {
		handleError: fn(),
	},
	render: (args) => <Image src="/invalid.png" alt="photo" onError={args.handleError} />,
	play: async ({ canvas, args }) => {
		const { handleError } = args;
		const img = canvas.getByRole("img");

		await waitFor(() => {
			expect(handleError).toHaveBeenCalledTimes(1);
			expect(handleError).toHaveBeenCalledWith(
				expect.objectContaining({ target: img, type: "error" })
			);
		});
	},
};

export const fallback = {
	name: "fallback",
	render: () => (
		<Example>
			<Example.Item title="fallback, background, on error">
				<View width="300px">
					<View aspectRatio={16 / 9}>
						<Image src="error" fallback />
					</View>
				</View>
			</Example.Item>
			<Example.Item title="fallback, image, on error">
				<View width="300px">
					<View aspectRatio={16 / 9}>
						<Image src="error" fallback={imgUrl} />
					</View>
				</View>
			</Example.Item>

			<Example.Item title="fallback, icon, on error">
				<View width="300px">
					<View aspectRatio={16 / 9}>
						<Image src="error" fallback={<Icon svg={IconZap} size={10} />} />
					</View>
				</View>
			</Example.Item>
			<Example.Item title="fallback, icon, no url">
				<View width="300px">
					<View aspectRatio={16 / 9}>
						<Image fallback={<Icon svg={IconZap} size={10} />} />
					</View>
				</View>
			</Example.Item>
		</Example>
	),
};

export const renderImage: StoryObj = {
	name: "renderImage",
	render: () => (
		<Example>
			<Example.Item title="renderImage">
				<Image
					src={imgUrl}
					alt="Amsterdam canal"
					// eslint-disable-next-line jsx-a11y/alt-text
					renderImage={(attributes) => <img {...attributes} id="test-image" />}
				/>
			</Example.Item>
			<Example.Item title="renderImage, fallback">
				<Image
					src="error"
					fallback={imgUrl}
					alt="Amsterdam canal 2"
					// eslint-disable-next-line jsx-a11y/alt-text
					renderImage={(attributes) => <img {...attributes} id="test-image-fallback" />}
				/>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const images = canvas.getAllByRole("img");

		expect(images[0]).toHaveAccessibleName("Amsterdam canal");
		expect(images[0]).toHaveAttribute("id", "test-image");

		expect(images[1]).toHaveAccessibleName("Amsterdam canal 2");
		expect(images[1]).toHaveAttribute("id", "test-image-fallback");
	},
};

export const imageAttributes: StoryObj = {
	name: "className, attributes,imageAttributes",
	render: () => (
		<div data-testid="root">
			<Image
				src={imgUrl}
				alt="photo"
				className="test-classname"
				attributes={{ id: "test-id" }}
				imageAttributes={{ "data-testid": "test-img-id" }}
			/>
		</div>
	),
	play: async ({ canvas }) => {
		const img = canvas.getByRole("img");
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
		expect(img).toHaveAttribute("data-testid", "test-img-id");
	},
};

export const ratio = {
	name: "test: aspectRatio",
	render: () => (
		<Example>
			<Example.Item title="ratio: 16/9">
				<View aspectRatio={16 / 9}>
					<Image src={imgUrl} />
				</View>
			</Example.Item>
			<Example.Item title="ratio: 16/9, displayMode: contain">
				<View aspectRatio={16 / 9}>
					<Image src={imgUrl} displayMode="contain" />
				</View>
			</Example.Item>
		</Example>
	),
};
