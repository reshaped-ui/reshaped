import View from "components/View";
import Image from "components/Image";
import Button from "components/Button";
import React from "react";
import Badge from "components/Badge";
import FormControl from "components/FormControl";
import Autocomplete from "components/Autocomplete";
import IconZap from "icons/Zap";
import ToggleButtonGroup from "components/ToggleButtonGroup";
import ToggleButton from "components/ToggleButton";

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
			<ToggleButtonGroup>
				<ToggleButton value="1">Button 1</ToggleButton>
				<ToggleButton value="2">Button 2</ToggleButton>
				<ToggleButton value="3">Button 3</ToggleButton>
			</ToggleButtonGroup>
		</View>
	);
};
