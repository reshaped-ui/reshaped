import View from "components/View";
import Image from "components/Image";
import React from "react";
import Carousel from "components/Carousel";
import { Placeholder } from "utilities/storybook";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={20} gap={6}>
			<View position="absolute" insetTop={0} insetStart={0}>
				<Image src="./logo.svg" />
			</View>

			{props.children}
		</View>
	);
};

export const preview = () => {
	return (
		<Preview>
			<Component />
		</Preview>
	);
};

const Component = () => {
	return (
		<View align="center" justify="center" height="150px">
			<Carousel attributes={{ "data-testid": "test-id" }} visibleItems={2}>
				<Placeholder h={100}>Content</Placeholder>
				<Placeholder h={100}>Content</Placeholder>
				<Placeholder h={100}>Content</Placeholder>
				<Placeholder h={100}>Content</Placeholder>
				<Placeholder h={100}>Content</Placeholder>
				<Placeholder h={100}>Content</Placeholder>
			</Carousel>
		</View>
	);
};
