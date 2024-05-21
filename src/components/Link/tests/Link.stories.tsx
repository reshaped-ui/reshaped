import { Example } from "utilities/storybook";
import Link from "components/Link";
import Text from "components/Text";
import IconZap from "icons/Zap";

export default {
	title: "Components/Link",
	component: Link,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/breadcrumbs",
		},
	},
};

export const variant = () => (
	<Example>
		<Example.Item title="variant: underline">
			<Link href="http://reshaped.so" attributes={{ target: "_blank" }}>
				Reshaped
			</Link>
		</Example.Item>
		<Example.Item title="variant: plain">
			<Link onClick={() => {}} variant="plain">
				Link
			</Link>
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: primary">
			<Link color="primary">Link</Link>
		</Example.Item>
		<Example.Item title="color: critical">
			<Link color="critical">Link</Link>
		</Example.Item>
		<Example.Item title="color: positive">
			<Link color="positive">Link</Link>
		</Example.Item>
		<Example.Item title="color: warning">
			<Link color="warning">Link</Link>
		</Example.Item>
		<Example.Item title="color: inherit">
			<Link color="inherit">Link</Link>
		</Example.Item>
	</Example>
);

export const disabled = () => (
	<Example>
		<Example.Item title="disabled">
			<Link disabled>Link</Link>
		</Example.Item>
	</Example>
);

export const withIcon = () => (
	<Example>
		<Example.Item title="icon, variant: underline">
			<Link icon={IconZap}>Link</Link>
		</Example.Item>
		<Example.Item title="icon, variant: plain">
			<Link icon={IconZap} variant="plain">
				Link
			</Link>
		</Example.Item>
		<Example.Item
			title={["icon, variant: underline", "should inherit display-1 size from the parent"]}
		>
			<Text variant="title-3">
				<Link icon={IconZap} variant="underline">
					Instant delivery
				</Link>
			</Text>
		</Example.Item>
	</Example>
);

export const testMultilineInText = () => (
	<Example>
		<Example.Item title="should wrap inside the text">
			<div>
				Someone asked me to write this text that is boring to ready for everyone and to add&nbsp;
				<Link href="/">this very very long link</Link> to it.
			</div>
		</Example.Item>
	</Example>
);
