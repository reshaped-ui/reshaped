import { Example } from "utilities/storybook";
import Avatar from "components/Avatar";
import View from "components/View";
import IconZap from "icons/Zap";

export default {
	title: "Components/Avatar",
	component: Avatar,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/avatar",
		},
	},
};

export const content = () => (
	<Example>
		<Example.Item title="With image">
			<Avatar
				src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png"
				alt="Reshaped"
			/>
		</Example.Item>
		<Example.Item title="With initials">
			<Avatar initials="RS" />
		</Example.Item>
		<Example.Item title="With icon">
			<Avatar icon={IconZap} />
		</Example.Item>
	</Example>
);

export const size = () => (
	<Example>
		<Example.Item title="size: 6">
			<View direction="row" gap={3}>
				<Avatar size={6} icon={IconZap} />
				<Avatar size={6} initials="RS" squared />
			</View>
		</Example.Item>

		<Example.Item title="size: 15">
			<View direction="row" gap={3}>
				<Avatar size={15} icon={IconZap} />
				<Avatar size={15} initials="RS" squared />
			</View>
		</Example.Item>

		<Example.Item title="size: 40">
			<View direction="row" gap={3}>
				<Avatar size={40} icon={IconZap} />
				<Avatar size={40} initials="RS" squared />
			</View>
		</Example.Item>

		<Example.Item title={["responsive size", "[s] 10", "[m+] 20"]}>
			<View direction="row" gap={3}>
				<Avatar size={{ s: 10, m: 20 }} icon={IconZap} />
				<Avatar size={{ s: 10, m: 20 }} icon={IconZap} squared />
			</View>
		</Example.Item>
	</Example>
);

export const squared = () => (
	<Example>
		<Example.Item title="squared, with image">
			<Avatar
				squared
				src="https://pbs.twimg.com/profile_images/1096029593335676929/OZbE9ZXV_400x400.png"
			/>
		</Example.Item>
		<Example.Item title="squared, with initials">
			<Avatar squared initials="RS" />
		</Example.Item>
		<Example.Item title="squared, with initials">
			<Avatar squared icon={IconZap} />
		</Example.Item>
	</Example>
);

export const colors = () => (
	<Example>
		<Example.Item title="color: neutral">
			<Avatar color="neutral" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: neutral, variant: faded">
			<Avatar color="neutral" variant="faded" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: primary">
			<Avatar color="primary" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: primary, variant: faded">
			<Avatar color="primary" variant="faded" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: positive">
			<Avatar color="positive" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: positive, variant: faded">
			<Avatar color="positive" variant="faded" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: warning">
			<Avatar color="warning" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: warning, variant: faded">
			<Avatar color="warning" variant="faded" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: critical">
			<Avatar color="critical" icon={IconZap} />
		</Example.Item>
		<Example.Item title="color: critical, variant: faded">
			<Avatar color="critical" variant="faded" icon={IconZap} />
		</Example.Item>
	</Example>
);
