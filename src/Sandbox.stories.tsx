import View from "components/View";
import Image from "components/Image";
import React from "react";
import Text from "components/Text";
import Button from "components/Button";
import ProgressIndicator from "components/ProgressIndicator";
import Scrim from "components/Scrim";
import IconChevronLeft from "icons/ChevronLeft";
import IconChevronRight from "icons/ChevronRight";
import Select from "components/Select";

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
		<Select.Custom name="animal" placeholder="Select an animal">
			<Select.OptionGroup label="Birds">
				<Select.Option value="pigeon">Pigeon</Select.Option>
				<Select.Option value="parrot">Parrot</Select.Option>
			</Select.OptionGroup>

			<Select.OptionGroup label="Sea Mammals">
				<Select.Option value="dog">Whale</Select.Option>
				<Select.Option value="turtle">Dolphin</Select.Option>
			</Select.OptionGroup>
		</Select.Custom>
	);
};
