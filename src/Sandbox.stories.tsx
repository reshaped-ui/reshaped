import View from "components/View";
import Image from "components/Image";
import Button from "components/Button";
import React from "react";
import useToggle from "hooks/useToggle";
import Popover from "components/Popover";

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
			<Popover autoFocus={false}>
				<Popover.Trigger>
					{(attributes) => <Button attributes={attributes}>Open</Button>}
				</Popover.Trigger>
				<Popover.Content>
					<View gap={2} align="start">
						Popover content
						<View direction="row" gap={2}>
							<Button onClick={() => {}}>Action 1</Button>
							<Button onClick={() => {}}>Action 2</Button>
						</View>
					</View>
				</Popover.Content>
			</Popover>
		</View>
	);
};
