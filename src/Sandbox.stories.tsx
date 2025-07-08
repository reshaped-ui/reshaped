import View from "components/View";
import Image from "components/Image";
import Button from "components/Button";
import React from "react";
import ToggleButtonGroup from "components/ToggleButtonGroup";
import ToggleButton from "components/ToggleButton";
import useToggle from "hooks/useToggle";

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
	const { toggle, active } = useToggle();

	return (
		<View align="center" justify="center" height="150px">
			<Button onClick={toggle}>{active.toString()}</Button>
		</View>
	);
};
