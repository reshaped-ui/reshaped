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

export const size = () => {
	return (
		<Example>
			<Example.Item title="size: medium">
				<Loader size="medium" ariaLabel="Loading" />
			</Example.Item>
			<Example.Item title="size: small">
				<Loader size="small" ariaLabel="Loading" />
			</Example.Item>
			<Example.Item title="size: large">
				<Loader size="large" ariaLabel="Loading" />
			</Example.Item>
			<Example.Item title={["responsive size", "[s] small", "[m+] medium"]}>
				<Loader size={{ s: "small", m: "medium" }} ariaLabel="Loading" />
			</Example.Item>
		</Example>
	);
};

export const color = () => (
	<Example>
		<Example.Item title="color: primary">
			<Loader ariaLabel="Loading" />
		</Example.Item>
		<Example.Item title="color: critical">
			<Loader color="critical" ariaLabel="Loading" />
		</Example.Item>
		<Example.Item title="color: positive">
			<Loader color="positive" ariaLabel="Loading" />
		</Example.Item>
		<Example.Item title="color: inherit">
			<Loader color="inherit" ariaLabel="Loading" />
		</Example.Item>
	</Example>
);
