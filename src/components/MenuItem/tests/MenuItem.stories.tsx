import { Example, Placeholder } from "utilities/storybook";
import View from "components/View";
import Text from "components/Text";
import MenuItem from "components/MenuItem";
import IconZap from "icons/Zap";

export default {
	title: "Components/MenuItem",
	component: MenuItem,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/menu-item",
		},
	},
};

export const size = () => (
	<Example>
		<Example.Item title="size: small">
			<MenuItem size="small" icon={IconZap} href="#">
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="size: medium">
			<MenuItem icon={IconZap} onClick={() => {}}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="size: large">
			<MenuItem size="large" icon={IconZap} onClick={() => {}}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title={["responsive size", "[s] small", "[m] medium", "[l+] large"]}>
			<MenuItem size={{ s: "small", m: "medium", l: "large" }} icon={IconZap} onClick={() => {}}>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: neutral">
			<MenuItem color="neutral" icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="color: primary">
			<MenuItem color="primary" icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="color: critical">
			<MenuItem color="critical" icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const selected = () => (
	<Example>
		<Example.Item title="selected, color: neutral">
			<MenuItem color="neutral" selected icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="selected, color: primary">
			<MenuItem color="primary" selected icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
		<Example.Item title="selected, color: critical">
			<MenuItem color="critical" selected icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<MenuItem disabled icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const roundedCorners = () => (
	<Example>
		<Example.Item title="roundedCorners">
			<MenuItem roundedCorners selected icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>

		<Example.Item title={["responsive roundedCorners", "[s]: false", "[m+]: true"]}>
			<MenuItem roundedCorners={{ s: false, m: true }} selected icon={IconZap}>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const slots = () => (
	<Example>
		<Example.Item title="startSlot, endSlot, selected">
			<MenuItem startSlot={<Placeholder h={20} />} endSlot={<Placeholder h={20} />} selected>
				Menu item
			</MenuItem>
		</Example.Item>
	</Example>
);

export const aligner = () => (
	<Example>
		<Example.Item title="size: small">
			<View gap={2}>
				<Text variant="title-6">Heading</Text>
				<MenuItem.Aligner>
					<MenuItem size="small" selected onClick={() => {}}>
						Menu item
					</MenuItem>
				</MenuItem.Aligner>
			</View>
		</Example.Item>

		<Example.Item title="size: medium">
			<View gap={2}>
				<Text variant="title-6">Heading</Text>
				<MenuItem.Aligner>
					<MenuItem selected>Menu item</MenuItem>
				</MenuItem.Aligner>
			</View>
		</Example.Item>

		<Example.Item title="size: large">
			<View gap={2}>
				<Text variant="title-6">Heading</Text>
				<MenuItem.Aligner>
					<MenuItem size="large" selected>
						Menu item
					</MenuItem>
				</MenuItem.Aligner>
			</View>
		</Example.Item>
	</Example>
);
