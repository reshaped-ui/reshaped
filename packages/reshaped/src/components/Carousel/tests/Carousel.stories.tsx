import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Carousel from "@/components/Carousel";
import { Example, Placeholder } from "@/utilities/storybook";

export default {
	title: "Components/Carousel",
	component: Carousel,
	parameters: {
		// Skip because of the aria-hidden applied to buttons, they're replaced by screen reader navigation
		a11y: {
			disable: true,
		},
		iframe: {
			url: "https://reshaped.so/docs/components/carousel",
		},
	},
};

export const base: StoryObj = {
	name: "base",
	render: () => (
		<Carousel attributes={{ "data-testid": "test-id" }} visibleItems={3}>
			<Placeholder h={100}>Content</Placeholder>
			<Placeholder h={100}>Content</Placeholder>
			<Placeholder h={100}>Content</Placeholder>
			<Placeholder h={100}>Content</Placeholder>
			<Placeholder h={100}>Content</Placeholder>
			<Placeholder h={100}>Content</Placeholder>
		</Carousel>
	),
	play: ({ canvas }) => {
		const root = canvas.getByTestId("test-id");
		const items = canvas.getAllByText("Content");
		const buttons = root.querySelectorAll("button");

		expect(root).toBeInTheDocument();
		expect(root.tagName).toBe("SECTION");
		expect(items).toHaveLength(6);
		expect(buttons).toHaveLength(2);
	},
};

export const visibleItems = {
	name: "visibleItems",
	render: () => (
		<Example>
			<Example.Item title="visibleItems: 3">
				<Carousel visibleItems={3}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>

			<Example.Item title={["responsive visibleItems", "s: 2, m+ 3"]}>
				<Carousel visibleItems={{ s: 2, m: 3 }}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>

			<Example.Item title="visibleItems: auto">
				<Carousel>
					<Placeholder h={100} />
					<Placeholder h={100} w={200} />
					<Placeholder h={100} w={300} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>
		</Example>
	),
};

export const gap = {
	name: "gap",
	render: () => (
		<Example>
			<Example.Item title="gap: 2, visibleItems 3">
				<Carousel visibleItems={3} gap={2}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>

			<Example.Item title={["gap: responsive, visibleItems: 3", "s: 2, l: 8"]}>
				<Carousel visibleItems={3} gap={{ s: 2, l: 8 }}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>
		</Example>
	),
};

export const bleed = {
	name: "bleed",
	render: () => (
		<Example>
			<Example.Item title="bleed: 4, visibleItems: 3">
				<Carousel visibleItems={3} bleed={4}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>

			<Example.Item title={["responsive bleed, visibleItems: 3", "[s] 4, [l+] 0"]}>
				<Carousel visibleItems={3} bleed={{ s: 4, l: 0 }}>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>
		</Example>
	),
};

export const navigationDisplay: StoryObj = {
	name: "navigationDisplay",
	render: () => (
		<Example>
			<Example.Item title="navigationDisplay: hidden">
				<Carousel
					visibleItems={3}
					navigationDisplay="hidden"
					attributes={{ "data-testid": "test-id" }}
				>
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
					<Placeholder h={100} />
				</Carousel>
			</Example.Item>
		</Example>
	),
	play: ({ canvas }) => {
		const root = canvas.getByTestId("test-id");
		const buttons = root.querySelectorAll("button");

		expect(buttons).toHaveLength(0);
	},
};
