import { StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Carousel from "components/Carousel";

export default {
	title: "Components/Carousel/tests",
	component: Carousel,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/carousel",
		},
	},
};

export const render: StoryObj = {
	name: "rendering",
	render: () => (
		<Carousel attributes={{ "data-testid": "test-id" }}>
			<div>Content</div>
			<div>Content</div>
		</Carousel>
	),
	play: async ({ canvas }) => {
		const elRoot = canvas.getByTestId("test-id");
		const elItems = canvas.getAllByText("Content");
		const elButtons = elRoot.querySelectorAll("button");

		expect(elRoot).toBeInTheDocument();
		expect(elRoot.tagName).toBe("SECTION");
		expect(elItems).toHaveLength(2);
		expect(elButtons).toHaveLength(2);
	},
};

export const navigationDisplay: StoryObj = {
	name: "navigationDisplay",
	render: () => (
		<Carousel navigationDisplay="hidden" attributes={{ "data-testid": "test-id" }}>
			<div>Content</div>
		</Carousel>
	),
	play: async ({ canvas }) => {
		const elRoot = canvas.getByTestId("test-id");
		const elButtons = elRoot.querySelectorAll("button");

		expect(elButtons).toHaveLength(0);
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Carousel className="test-classname" attributes={{ id: "test-id" }}>
				<div>Content</div>
			</Carousel>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
