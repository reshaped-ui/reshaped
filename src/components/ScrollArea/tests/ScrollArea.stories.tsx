import React from "react";
import { useRef } from "react";
import { Example } from "utilities/storybook";
import ScrollArea from "components/ScrollArea";
import View from "components/View";
import Button from "components/Button";
import useToggle from "hooks/useToggle";

export default {
	title: "Utilities/ScrollArea",
	component: ScrollArea,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/scroll-area",
		},
	},
};

const Demo = () => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<View gap={4}>
			<Button onClick={() => ref.current?.scrollTo({ top: 100, behavior: "smooth" })}>
				Scroll
			</Button>
			<ScrollArea height="100px" scrollbarDisplay="visible" ref={ref}>
				<View backgroundColor="neutral-faded" padding={4}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</View>
	);
};

export const direction = () => (
	<Example>
		<Example.Item title="vertical">
			<ScrollArea height="100px" scrollbarDisplay="visible" onScroll={console.log}>
				<View backgroundColor="neutral-faded" padding={4}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</Example.Item>
		<Example.Item title="horizontal">
			<ScrollArea height="120px" scrollbarDisplay="visible" onScroll={console.log}>
				<View backgroundColor="neutral-faded" padding={4} width="500px">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s
				</View>
			</ScrollArea>
		</Example.Item>
		<Example.Item title="both directions">
			<ScrollArea height="100px" scrollbarDisplay="visible">
				<View backgroundColor="neutral-faded" padding={4} width="500px">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</Example.Item>
	</Example>
);

export const visibility = () => (
	<Example>
		<Example.Item title="visibility: hover">
			<ScrollArea height="100px">
				<View backgroundColor="neutral-faded" padding={4}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</Example.Item>
		<Example.Item title="visibility: hidden">
			<ScrollArea height="100px" scrollbarDisplay="hidden">
				<View backgroundColor="neutral-faded" padding={4}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</Example.Item>
		<Example.Item title="visibility: visible">
			<ScrollArea height="100px" scrollbarDisplay="visible">
				<View backgroundColor="neutral-faded" padding={4}>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
					been the industry's standard dummy text ever since the 1500s, when an unknown printer took
					a galley of type and scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
					Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum.
				</View>
			</ScrollArea>
		</Example.Item>
	</Example>
);

export const ref = () => (
	<Example>
		<Example.Item title="external ref">
			<Demo />
		</Example.Item>
	</Example>
);

export const edgeCases = () => {
	const toggle = useToggle(true);
	const [count, setCount] = React.useState(20);

	return (
		<Example>
			<Example.Item title="dynamic content update">
				<View gap={4}>
					<Button onClick={toggle.toggle}>Toggle</Button>
					<ScrollArea height="100px" scrollbarDisplay="visible" ref={ref}>
						<View
							backgroundColor="neutral-faded"
							padding={4}
							width={toggle.active ? "120%" : "90%"}
						>
							{toggle.active ? (
								<React.Fragment>
									Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
									Ipsum has been the industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make a type specimen
									book. It has survived not only five centuries, but also the leap into electronic
									typesetting, remaining essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum passages, and more recently
									with desktop publishing software like Aldus PageMaker including versions of Lorem
									Ipsum.
								</React.Fragment>
							) : null}
						</View>
					</ScrollArea>
				</View>
			</Example.Item>

			<Example.Item title="add items">
				<View gap={4}>
					<Button onClick={() => setCount((prev) => prev + 10)}>Add</Button>

					<ScrollArea height="200px" scrollbarDisplay="visible">
						{Array(count)
							.fill("")
							.map((_, index) => {
								return <div key={index}>Item {index + 1}</div>;
							})}
					</ScrollArea>
				</View>
			</Example.Item>

			<Example.Item title="nested, hover only for the current area">
				<ScrollArea height="100px">
					<View padding={8}>
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
	);
};
