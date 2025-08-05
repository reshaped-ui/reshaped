import View from "components/View";
import Image from "components/Image";
import React from "react";
import Carousel from "components/Carousel";
import { Placeholder } from "utilities/storybook";
import Calendar from "components/Calendar";
import DropdownMenu from "components/DropdownMenu";
import Button from "components/Button";
import Modal from "components/Modal";
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
	const menuModalToggle = useToggle();
	return (
		<View align="center" justify="center" height="150px" paddingTop={20}>
			<DropdownMenu>
				<DropdownMenu.Trigger>
					{(attributes) => <Button attributes={attributes}>Open menu</Button>}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item onClick={menuModalToggle.activate}>Open dialog</DropdownMenu.Item>
					<DropdownMenu.Item>Item 2</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu>
			<Modal active={menuModalToggle.active} onClose={menuModalToggle.deactivate}>
				<View gap={3} direction="row">
					<DropdownMenu>
						<DropdownMenu.Trigger>
							{(attributes) => <Button attributes={attributes}>Open menu</Button>}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Item>Item 1</DropdownMenu.Item>
							<DropdownMenu.Item>Item 2</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu>
					<Button onClick={menuModalToggle.deactivate}>Close</Button>
				</View>
			</Modal>
		</View>
	);
};
