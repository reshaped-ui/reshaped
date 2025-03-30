import React from "react";
import { StoryObj } from "@storybook/react";
import { Example } from "utilities/storybook";
import ScrollArea from "components/ScrollArea";
import View from "components/View";
import Button from "components/Button";

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

export const direction = {
	name: "direction",
	render: () => (
		<Example>
			<Example.Item title="vertical">
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

			<Example.Item title="horizontal">
				<ScrollArea height="100px" scrollbarDisplay="visible">
					<View backgroundColor="elevation-base" padding={4} width="150%" height="100px">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s
					</View>
				</ScrollArea>
			</Example.Item>

			<Example.Item title="horizontal, vertical">
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

export const visibility = {
	name: "scrollbarDisplay",
	render: () => (
		<Example>
			<Example.Item title="visibility: hover">
				<ScrollArea height="100px">
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

			<Example.Item title="visibility: hidden">
				<ScrollArea height="100px" scrollbarDisplay="hidden">
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

			<Example.Item title="visibility: visible">
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
		</Example>
	),
};

export const composition = {
	name: "composition",
	render: () => (
		<Example>
			<Example.Item title="nested">
				<ScrollArea height="100px">
					<View padding={4} paddingInline={16}>
						<ScrollArea height="200px">
							{Array(20)
								.fill("")
								.map((_, index) => {
									return <div key={index}>Item {index + 1}</div>;
								})}
						</ScrollArea>
					</View>
				</ScrollArea>
			</Example.Item>
		</Example>
	),
};

export const dynamicHeight: StoryObj = {
	name: "composition, dynamic height change",
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
	// TODO: After Using play(), Storybook makes the scroll lag, but not when triggered manually in the browser
	// play: async ({ canvas }) => {
	// 	const trigger = canvas.getAllByRole("button")[0];
	// 	await userEvent.click(trigger);
	// },
};
