import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Badge from "@/components/Badge";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";
import View from "@/components/View";
import { Example, Placeholder } from "@/utilities/storybook";
import IconZap from "@/icons/Zap";

export default {
	title: "Components/MenuItem",
	component: MenuItem,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/menu-item",
		},
	},
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<MenuItem
					size="small"
					icon={IconZap}
					onClick={() => {}}
					endSlot={<Badge size="small">12</Badge>}
				>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="size: medium">
				<MenuItem icon={IconZap} onClick={() => {}} endSlot={<Badge size="small">12</Badge>}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="size: large">
				<MenuItem
					size="large"
					icon={IconZap}
					onClick={() => {}}
					endSlot={<Badge size="medium">12</Badge>}
				>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title={["responsive size", "[s] small", "[m] medium", "[l+] large"]}>
				<MenuItem size={{ s: "small", m: "medium", l: "large" }} icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: neutral">
				<MenuItem color="neutral" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="color: primary">
				<MenuItem color="primary" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="color: critical">
				<MenuItem color="critical" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const selected = {
	name: "selected",
	render: () => (
		<Example>
			<Example.Item title="selected, color: neutral">
				<MenuItem color="neutral" selected icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="selected, color: primary">
				<MenuItem color="primary" selected icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="selected, color: critical">
				<MenuItem color="critical" selected icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const focusIndicator = {
	name: "focusIndicator",
	render: () => (
		<Example>
			<Example.Item title="focusIndicator: outline">
				<MenuItem icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="focusIndicator: highlight">
				<MenuItem focusIndicator="highlight" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
			<Example.Item title="focusIndicator: highlight, color: critical">
				<MenuItem focusIndicator="highlight" color="critical" icon={IconZap} onClick={() => {}}>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const slots = {
	name: "startSlot, endSlot",
	render: () => (
		<Example>
			<Example.Item title="startSlot, endSlot, selected">
				<MenuItem
					startSlot={<Placeholder h={20} />}
					endSlot={<Placeholder h={20} />}
					selected
					onClick={() => {}}
				>
					Menu item
				</MenuItem>
			</Example.Item>
		</Example>
	),
};

export const aligner = {
	name: "aligner",
	render: () => (
		<Example>
			<Example.Item title="size: small">
				<View gap={2}>
					<Text variant="featured-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem size="small" selected onClick={() => {}}>
							Menu item
						</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="size: medium">
				<View gap={2}>
					<Text variant="featured-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem selected onClick={() => {}}>
							Menu item
						</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>

			<Example.Item title="size: large">
				<View gap={2}>
					<Text variant="featured-6">Heading</Text>
					<MenuItem.Aligner>
						<MenuItem size="large" selected onClick={() => {}}>
							Menu item
						</MenuItem>
					</MenuItem.Aligner>
				</View>
			</Example.Item>
		</Example>
	),
};

export const disabled: StoryObj = {
	name: "disabled",
	render: () => (
		<MenuItem disabled onClick={() => {}}>
			Trigger
		</MenuItem>
	),
	play: async ({ canvas }) => {
		const el = canvas.getAllByRole("button")[0];

		expect(el).toBeDisabled();
	},
};
