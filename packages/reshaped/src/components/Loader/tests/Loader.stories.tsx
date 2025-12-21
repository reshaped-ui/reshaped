import { StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import Loader from "components/Loader";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Loader",
	component: Loader,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/loader",
		},
	},
};

export const size = {
	name: "size",
	render: () => {
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
	},
};

export const color = {
	name: "color",
	render: () => (
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
	),
};

export const ariaLabel: StoryObj = {
	name: "ariaLabel",
	render: () => <Loader ariaLabel="Loading" attributes={{ "data-testid": "root" }} />,
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root");

		expect(root).toHaveAttribute("aria-live", "assertive");
		expect(root).toHaveAttribute("aria-label", "Loading");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Loader className="test-classname" attributes={{ id: "test-id" }} ariaLabel="Loading" />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
