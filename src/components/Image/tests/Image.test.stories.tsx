import { StoryObj } from "@storybook/react";
import { within, expect, fn, waitFor } from "@storybook/test";
import Image from "components/Image";

export default {
	title: "Utilities/Image/tests",
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
	name: "src, presentation",
	render: () => <Image src={imgUrl} />,
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole("presentation");

		expect(img).toHaveAttribute("src", imgUrl);
	},
};

export const ariaLabel: StoryObj = {
	name: "src, alt",
	render: () => <Image src={imgUrl} alt="photo" />,
	play: ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole("img");

		expect(img).toHaveAccessibleName("photo");
	},
};

export const onLoad: StoryObj<{ handleLoad: ReturnType<typeof fn> }> = {
	name: "onLoad",
	args: {
		handleLoad: fn(),
	},
	render: (args) => <Image src={imgUrl} alt="photo" onLoad={args.handleLoad} />,
	play: async ({ canvasElement, args }) => {
		const { handleLoad } = args;
		const canvas = within(canvasElement);
		const img = canvas.getByRole("img");

		await waitFor(() => {
			expect(handleLoad).toHaveBeenCalledTimes(1);
			expect(handleLoad).toHaveBeenCalledWith(
				expect.objectContaining({ target: img, type: "load" })
			);
		});
	},
};

export const onError: StoryObj<{ handleError: ReturnType<typeof fn> }> = {
	name: "onError",
	args: {
		handleError: fn(),
	},
	render: (args) => <Image src="/invalid.png" alt="photo" onError={args.handleError} />,
	play: async ({ canvasElement, args }) => {
		const { handleError } = args;
		const canvas = within(canvasElement);
		const img = canvas.getByRole("img");

		await waitFor(() => {
			expect(handleError).toHaveBeenCalledTimes(1);
			expect(handleError).toHaveBeenCalledWith(
				expect.objectContaining({ target: img, type: "error" })
			);
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Image src={imgUrl} className="test-classname" attributes={{ id: "test-id" }} />
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const imageAttributes: StoryObj = {
	name: "imageAttributes",
	render: () => (
		<div data-testid="root">
			<Image
				src={imgUrl}
				alt="photo"
				attributes={{ id: "test-id" }}
				imageAttributes={{ id: "test-img-id" }}
			/>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const img = canvas.getByRole("img");

		expect(img).toHaveAttribute("id", "test-img-id");
	},
};
