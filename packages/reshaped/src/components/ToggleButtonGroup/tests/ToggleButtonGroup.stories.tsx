import { StoryObj } from "@storybook/react-vite";

import ToggleButton from "@/components/ToggleButton";
import ToggleButtonGroup from "@/components/ToggleButtonGroup";
import { Example } from "@/utilities/storybook";
import IconCheckmark from "@/icons/Checkmark";
import IconMinus from "@/icons/Minus";
import IconPlus from "@/icons/Plus";

export default {
	title: "Components/ToggleButtonGroup",
	component: ToggleButtonGroup,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/toggle-button-group",
		},
	},
};

export const selectedColor: StoryObj = {
	name: "color, selectedColor, selectedVariant",
	render: () => (
		<Example>
			<Example.Item title="selectedColor: primary">
				<ToggleButtonGroup selectedColor="primary" defaultValue={["2"]}>
					<ToggleButton value="1">Button</ToggleButton>
					<ToggleButton value="2">Button</ToggleButton>
					<ToggleButton value="3">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
			<Example.Item title="color: primary, selectedColor: critical">
				<ToggleButtonGroup color="primary" selectedColor="critical" defaultValue={["2"]}>
					<ToggleButton value="1" variant="ghost">
						Button
					</ToggleButton>
					<ToggleButton value="2" variant="ghost">
						Button
					</ToggleButton>
					<ToggleButton value="3" variant="ghost">
						Button
					</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
			<Example.Item title="color: primary, selectedColor: critical, selectedVariant: solid">
				<ToggleButtonGroup selectedColor="primary" selectedVariant="solid" defaultValue={["2"]}>
					<ToggleButton value="1">Button</ToggleButton>
					<ToggleButton value="2">Button</ToggleButton>
					<ToggleButton value="3">Button</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<Example>
			<Example.Item title="disabled">
				<ToggleButtonGroup selectedColor="critical" value={["1"]}>
					<ToggleButton disabled value="1" color="critical">
						Button
					</ToggleButton>
					<ToggleButton disabled value="2" color="critical">
						Button
					</ToggleButton>
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
};

export const testIcon = {
	name: "test: icon only",
	render: () => (
		<Example>
			<Example.Item title="icon only">
				<ToggleButtonGroup selectedColor="primary">
					<ToggleButton value="1" icon={IconPlus} />
					<ToggleButton value="2" icon={IconMinus} />
					<ToggleButton value="3" icon={IconCheckmark} />
				</ToggleButtonGroup>
			</Example.Item>
		</Example>
	),
};
