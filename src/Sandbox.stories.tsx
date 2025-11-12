import React from "react";

import Autocomplete from "components/Autocomplete";
import Container from "components/Container";
import FormControl from "components/FormControl";
import Image from "components/Image";
import View from "components/View";
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
	const toggle = useToggle(true);
	return (
		<Container width="300px">
			<FormControl>
				<FormControl.Label>Label</FormControl.Label>
				<Autocomplete
					name="fruit"
					placeholder="Pick your food"
					active={toggle.active}
					onOpen={() => {
						toggle.activate();
					}}
					onClose={() => {
						toggle.deactivate();
					}}
					onChange={(args) => console.log(args)}
				>
					{["Pizza", "Pie", "Ice-cream"].map((v) => {
						return (
							<Autocomplete.Item key={v} value={v}>
								{v}
							</Autocomplete.Item>
						);
					})}
				</Autocomplete>
			</FormControl>
		</Container>
	);
};
