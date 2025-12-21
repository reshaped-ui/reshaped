import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { userEvent, expect, waitFor, fn, Mock } from "storybook/test";

import Button from "components/Button";
import ScrollArea from "components/ScrollArea";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Utility components/ScrollArea",
	component: ScrollArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/scroll-area",
		},
		// Skip because axe core incorrectly reports contrast issues
		a11y: {
			disable: true,
		},
	},
};

export const base = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="vertical scroll">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="elevation-base" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="horizontal scroll">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="elevation-base" padding={4} width="150%" height="100px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="horizontal and vertical scroll">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="elevation-base" padding={4} width="150%">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>
		</Example>
	),
};

export const scrollbarDisplay = {
	name: "scrollbarDisplay",
	render: () => (
		<Example>
			<Example.Item title="scrollbarDisplay: hover">
				<ScrollArea height="100px">
					<View backgroundColor="elevation-base" padding={4} width="150%">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="scrollbarDisplay: hidden">
				<ScrollArea height="100px" scrollbarDisplay="hidden">
					<View backgroundColor="elevation-base" padding={4} width="150%">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="scrollbarDisplay: visible">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="elevation-base" padding={4} width="150%">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>
		</Example>
	),
};

export const height = {
	name: "height, maxHeight",
	render: () => (
		<Example>
			<Example.Item title="height: 80px">
				<ScrollArea height="80px">
					<View backgroundColor="elevation-base" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="responsive height: s 80px, m: 120px">
				<ScrollArea height={{ s: "80px", m: "120px" }}>
					<View backgroundColor="elevation-base" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="maxHeight: 80px">
				<ScrollArea maxHeight="80px">
					<View backgroundColor="elevation-base" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="responsive max height: s 80px, m: 200px">
				<ScrollArea maxHeight={{ s: "80px", m: "200px" }}>
					<View backgroundColor="elevation-base" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</Example.Item>
		</Example>
	),
};

export const onScroll: StoryObj<{ handleScroll: Mock }> = {
	name: "ref, onScroll",
	args: {
		handleScroll: fn(),
	},
	render: (args) => {
		const ref = React.useRef<HTMLDivElement>(null);

		return (
			<View gap={4}>
				<View.Item>
					<Button onClick={() => ref.current?.scrollBy({ top: 50, left: 50 })}>Scroll</Button>
				</View.Item>
				<ScrollArea
					height="100px"
					ref={ref}
					scrollbarDisplay="visible"
					onScroll={args.handleScroll}
				>
					<View backgroundColor="neutral-faded" padding={4} width="1000px" height="200px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book. It has
						survived not only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s with the release of
						Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</View>
				</ScrollArea>
			</View>
		);
	},
	play: async ({ canvas, args }) => {
		const trigger = canvas.getAllByRole("button")[0];

		await userEvent.click(trigger);

		await waitFor(() => {
			expect(args.handleScroll).toHaveBeenCalledTimes(1);
			// x value is flaky, so only testing y here
			expect(args.handleScroll).toHaveBeenCalledWith(expect.objectContaining({ y: 0.5 }));
		});
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<ScrollArea className="test-classname" attributes={{ id: "test-id" }}>
				Content
			</ScrollArea>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};

export const testNested = {
	name: "test: nested",
	render: () => (
		<ScrollArea height="100px" scrollbarDisplay="visible">
			<View padding={4} paddingInline={16}>
				<ScrollArea height="200px" scrollbarDisplay="visible">
					{Array(20)
						.fill("")
						.map((_, index) => {
							return <div key={index}>Item {index + 1}</div>;
						})}
				</ScrollArea>
			</View>
		</ScrollArea>
	),
};

export const testDynamicHeight: StoryObj = {
	name: "test: dynamic height change",
	render: () => {
		const [count, setCount] = React.useState(10);

		return (
			<View gap={4}>
				<View.Item>
					<Button onClick={() => setCount((prev) => prev + 10)}>Add more items</Button>
				</View.Item>

				<ScrollArea height="200px" scrollbarDisplay="visible">
					<View gap={2}>
						{new Array(count).fill("").map((_, i) => (
							<View.Item key={i}>Item {i + 1}</View.Item>
						))}
					</View>
				</ScrollArea>
			</View>
		);
	},
};
