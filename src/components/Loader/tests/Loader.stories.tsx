import { Example } from "utilities/storybook";
import Loader from "components/Loader";

export default {
	title: "Components/Loader",
	component: Loader,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/loader",
		},
	},
};

export const size = () => (
	<Example>
		<Example.Item title="size: medium">
			<Loader size="medium" />
		</Example.Item>
		<Example.Item title="size: small">
			<Loader size="small" />
		</Example.Item>
		<Example.Item title={["responsive size", "[s] small", "[m+] medium"]}>
			<Loader size={{ s: "small", m: "medium" }} />
		</Example.Item>
	</Example>
);

export const color = () => (
	<Example>
		<Example.Item title="color: primary">
			<Loader />
		</Example.Item>
		<Example.Item title="color: critical">
			<Loader color="critical" />
		</Example.Item>
		<Example.Item title="color: positive">
			<Loader color="positive" />
		</Example.Item>
		<Example.Item title="color: inherit">
			<Loader color="inherit" />
		</Example.Item>
	</Example>
);
