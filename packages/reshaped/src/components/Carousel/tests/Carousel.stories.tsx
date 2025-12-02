import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, userEvent, waitFor } from "storybook/test";

import Button from "components/Button";
import Carousel, { type CarouselInstanceRef } from "components/Carousel";
import View from "components/View";
import { Example, Placeholder } from "utilities/storybook";

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
	play: async ({ canvas }) => {
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
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("test-id");
		const buttons = root.querySelectorAll("button");

		expect(buttons).toHaveLength(0);
	},
};

export const instanceRef: StoryObj<{ handleChange: ReturnType<typeof fn> }> = {
	name: "instanceRef, onChange",
	args: {
		handleChange: fn(),
	},
	render: (args) => {
		const carouselRef = React.useRef<CarouselInstanceRef>(null);
		const [index, setIndex] = React.useState(0);

		return (
			<Example>
				<Example.Item title="instanceRef, onChange">
					<View gap={3}>
						<View gap={3} direction="row" align="center">
							<Button onClick={() => carouselRef.current?.navigateBack()}>Back</Button>
							<Button onClick={() => carouselRef.current?.navigateForward()}>Forward</Button>
							<Button onClick={() => carouselRef.current?.navigateTo(3)}>To 3</Button>
							<View.Item>Index: {index}</View.Item>
						</View>
						<Carousel
							visibleItems={2}
							instanceRef={carouselRef}
							navigationDisplay="hidden"
							onChange={(changeArgs) => {
								args.handleChange(changeArgs);
								setIndex(changeArgs.index);
							}}
						>
							<Placeholder h={100}>Item 0</Placeholder>
							<Placeholder h={100}>Item 1</Placeholder>
							<Placeholder h={100}>Item 2</Placeholder>
							<Placeholder h={100}>Item 3</Placeholder>
							<Placeholder h={100}>Item 4</Placeholder>
							<Placeholder h={100}>Item 5</Placeholder>
						</Carousel>
					</View>
				</Example.Item>
			</Example>
		);
	},
	play: async ({ canvas, args }) => {
		const buttons = canvas.getAllByRole("button");
		const backButton = buttons[0];
		const forwardButton = buttons[1];
		const toButton = buttons[2];

		await userEvent.click(forwardButton);

		await waitFor(() => {
			expect(args.handleChange).toHaveBeenCalledWith({ index: 1 });
			expect(args.handleChange).toHaveBeenCalledWith({ index: 2 });
			expect(args.handleChange).not.toHaveBeenCalledWith({ index: 3 });
		});

		args.handleChange.mockClear();
		await userEvent.click(backButton);

		await waitFor(() => {
			expect(args.handleChange).toHaveBeenCalledWith({ index: 0 });
			expect(args.handleChange).toHaveBeenCalledWith({ index: 1 });
		});

		args.handleChange.mockClear();
		await userEvent.click(toButton);

		await waitFor(() => {
			expect(args.handleChange).toHaveBeenCalledWith({ index: 1 });
			expect(args.handleChange).toHaveBeenCalledWith({ index: 2 });
			expect(args.handleChange).toHaveBeenCalledWith({ index: 3 });
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Carousel visibleItems={2} className="test-classname" attributes={{ id: "test-id" }}>
				<Placeholder h={100}>Item 0</Placeholder>
				<Placeholder h={100}>Item 1</Placeholder>
				<Placeholder h={100}>Item 2</Placeholder>
				<Placeholder h={100}>Item 3</Placeholder>
				<Placeholder h={100}>Item 4</Placeholder>
				<Placeholder h={100}>Item 5</Placeholder>
			</Carousel>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
