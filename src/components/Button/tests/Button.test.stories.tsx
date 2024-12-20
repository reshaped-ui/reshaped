import { Meta, StoryObj } from "@storybook/react";

import { Example, Placeholder } from "utilities/storybook";
import Button from "components/Button";
import View from "components/View";
import Image from "components/Image";
import Avatar from "components/Avatar";
import Hotkey from "components/Hotkey";
import IconZap from "icons/Zap";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
	title: "Components/Button/Test cases",
	component: Button,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/button",
		},
	},
};

export default meta;

export const colorPrimary: Story = {
	args: {
		color: "primary",
		children: "Button",
	},
};

export const colorNeutral: Story = {
	args: {
		color: "primary",
		children: "Button",
	},
};
