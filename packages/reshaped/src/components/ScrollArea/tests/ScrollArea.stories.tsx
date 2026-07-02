import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fn, Mock, userEvent, waitFor } from "storybook/test";

import Button from "@/components/Button";
import Card from "@/components/Card";
import ScrollArea from "@/components/ScrollArea";
import View from "@/components/View";
import { Example } from "@/utilities/storybook";

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
					<View backgroundColor="neutral-faded" padding={4}>
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
					<View backgroundColor="neutral-faded" padding={4} width="150%" height="100px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="horizontal and vertical scroll">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="neutral-faded" padding={4} width="150%">
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
					<View backgroundColor="neutral-faded" padding={4} width="150%">
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
					<View backgroundColor="neutral-faded" padding={4} width="150%">
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
					<View backgroundColor="neutral-faded" padding={4} width="150%">
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

export const overscrollBehavior = {
	name: "overscrollBehavior",
	render: () => (
		<Example>
			<Example.Item title="overscrollBehavior: auto">
				<ScrollArea height="200px" scrollbarDisplay="visible">
					<View padding={16} backgroundColor="neutral-faded" borderRadius="medium">
						<ScrollArea height="200px" scrollbarDisplay="visible">
							<View backgroundColor="neutral" padding={4} borderRadius="medium">
								{Array(20)
									.fill("")
									.map((_, index) => {
										return <div key={index}>Item {index + 1}</div>;
									})}
							</View>
						</ScrollArea>
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="overscrollBehavior: contain">
				<ScrollArea height="200px" scrollbarDisplay="visible" overscrollBehavior="contain">
					<View padding={16} backgroundColor="neutral-faded" borderRadius="medium">
						<ScrollArea height="200px" scrollbarDisplay="visible">
							<View backgroundColor="neutral" padding={4} borderRadius="medium">
								{Array(20)
									.fill("")
									.map((_, index) => {
										return <div key={index}>Item {index + 1}</div>;
									})}
							</View>
						</ScrollArea>
					</View>
				</ScrollArea>
			</Example.Item>
		</Example>
	),
};

export const fade = {
	name: "fade",
	render: () => (
		<Example>
			<Example.Item title="fade, vertical scroll">
				<ScrollArea height="100px" fade>
					<View backgroundColor="neutral-faded" padding={4}>
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

			<Example.Item title="fade, horizontal scroll">
				<ScrollArea height="100px" fade>
					<View backgroundColor="neutral-faded" padding={4} width="150%" height="100px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="fade, horizontal and vertical scroll">
				<ScrollArea height="100px" fade>
					<View backgroundColor="neutral-faded" padding={4} width="150%">
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

			<Example.Item title="fade, no scrollable overflow">
				<ScrollArea height="100px" fade>
					<View backgroundColor="neutral-faded" padding={4}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
					<View backgroundColor="neutral-faded" padding={4}>
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
					<View backgroundColor="neutral-faded" padding={4}>
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
					<View backgroundColor="neutral-faded" padding={4}>
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
					<View backgroundColor="neutral-faded" padding={4}>
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

export const testComposition: StoryObj = {
	name: "test: composition",
	render: () => {
		const [count, setCount] = React.useState(10);
		const [height, setHeight] = React.useState(100);

		return (
			<Example>
				<Example.Item title="composition height">
					<View height="200px">
						<Card height="100%" padding={0}>
							<ScrollArea scrollbarDisplay="visible">
								{/* Should stretch to 100% */}
								<View height="100%" padding={4} backgroundColor="primary-faded" />
							</ScrollArea>
						</Card>
					</View>
				</Example.Item>

				<Example.Item title="dynamic height change, content">
					<View gap={4}>
						<View.Item>
							<Button onClick={() => setCount((prev) => prev + 10)}>Add more items</Button>
						</View.Item>

						<ScrollArea height="200px" scrollbarDisplay="visible">
							<View gap={2}>
								{Array.from({ length: count }).map((_, i) => (
									<View.Item key={i}>Item {i + 1}</View.Item>
								))}
							</View>
						</ScrollArea>
					</View>
				</Example.Item>

				<Example.Item title="dynamic height change, size">
					<View gap={4}>
						<View.Item>
							<Button onClick={() => setHeight((prev) => prev + 10)}>Increase height</Button>
						</View.Item>

						<ScrollArea height="200px" scrollbarDisplay="visible">
							<View height={height} padding={4} backgroundColor="neutral-faded" />
						</ScrollArea>
					</View>
				</Example.Item>
			</Example>
		);
	},
};
