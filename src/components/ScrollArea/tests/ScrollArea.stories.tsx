import { useRef } from "react";
import { Example } from "utilities/storybook";
import ScrollArea from "components/ScrollArea";
import View from "components/View";
import Button from "components/Button";

export default { title: "Utilities/ScrollArea" };

const Demo = () => {
	const ref = useRef<HTMLDivElement | null>(null);

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
		<Example.Item title="horizontal">
			<ScrollArea height="120px" scrollbarDisplay="visible">
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
