import View from "components/View";
import Image from "components/Image";
import React from "react";
import Carousel from "components/Carousel";
import { Placeholder } from "utilities/storybook";
import Calendar from "components/Calendar";

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
		<View align="center" justify="center" height="150px" paddingTop={20}>
			<Calendar />
		</View>
	);
};
