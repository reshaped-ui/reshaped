import React from "react";

import Calendar from "components/Calendar";
import Image from "components/Image";
import View from "components/View";

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
		<>
			<Calendar defaultMonth={new Date(2020, 0)} monthsToRender={2} range />
		</>
	);
};
