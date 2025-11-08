import React from "react";

import Text from "components/Text";
import View from "components/View";

type Props = {
	title?: string | string[];
	children?: React.ReactNode;
};

const Example: React.FC<{ children: React.ReactNode; title?: React.ReactNode }> & {
	Item: typeof ExampleItem;
} = (props) => {
	return (
		<View gap={3} attributes={props.title ? { style: { marginTop: -17 } } : undefined}>
			{props.title && (
				<View
					bleed={4}
					paddingInline={4}
					paddingBlock={3}
					backgroundColor="neutral-faded"
					borderColor="neutral-faded"
					position="sticky"
					insetTop={0}
					zIndex={100}
				>
					{props.title}
				</View>
			)}
			{props.children}
		</View>
	);
};

const ExampleItem: React.FC<Props> = (props) => {
	const { children } = props;
	const title = typeof props.title === "string" ? [props.title] : props.title;

	return (
		<View
			borderColor="neutral-faded"
			borderRadius="medium"
			overflow="hidden"
			backgroundColor="elevation-base"
		>
			{title && (
				<View paddingInline={4} paddingBlock={3} backgroundColor="neutral-faded">
					{title.map((line, index) => (
						<Text variant="body-3" color={index > 0 ? "neutral-faded" : "neutral"} key={index}>
							{line}
						</Text>
					))}
				</View>
			)}
			<View padding={4} backgroundColor="page">
				{children}
			</View>
		</View>
	);
};

Example.Item = ExampleItem;
export default Example;
