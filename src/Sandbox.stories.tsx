import View from "components/View";
import Image from "components/Image";
import React from "react";
import Select from "components/Select";
import useToggle from "hooks/useToggle";
import Modal from "components/Modal";
import MenuItem from "components/MenuItem";

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
	const toggle = useToggle();
	const [value, setValue] = React.useState("Dog");

	const handleClick = () => {
		toggle.toggle();
	};

	return (
		<>
			<Select name="animal" placeholder="Select an animal" onClick={handleClick}>
				{value}
			</Select>
			<Modal active={toggle.active} onClose={toggle.deactivate} position="bottom" padding={2}>
				<MenuItem
					roundedCorners
					onClick={() => {
						setValue("Dog");
						toggle.deactivate();
					}}
					attributes={{
						role: "option",
					}}
				>
					Dog
				</MenuItem>
				<MenuItem
					roundedCorners
					attributes={{
						role: "option",
					}}
					onClick={() => {
						setValue("Turtle");
						toggle.deactivate();
					}}
				>
					Turtle
				</MenuItem>
			</Modal>
		</>
	);
};
