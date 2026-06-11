import React from "react";

import Image from "@/components/Image";
import View from "@/components/View";
import Tabs from "./components/Tabs";

export default {
	title: "Sandbox",
	chromatic: { disableSnapshot: true },
};

const Preview: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<View padding={25} gap={6}>
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
		<View align="center" justify="center" height="100px">
			<Tabs variant="pills-raised" defaultValue="0">
				<Tabs.List>
					<Tabs.Item value="0">Themes</Tabs.Item>
					<Tabs.Item value="1">Components</Tabs.Item>
					<Tabs.Item value="2">Templates</Tabs.Item>
				</Tabs.List>
			</Tabs>
		</View>
	);
};
