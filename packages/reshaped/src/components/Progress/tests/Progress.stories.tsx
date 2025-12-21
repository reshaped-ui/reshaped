import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";

import Button from "components/Button";
import Progress from "components/Progress";
import View from "components/View";
import { Example } from "utilities/storybook";

export default {
	title: "Components/Progress",
	component: Progress,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/progress",
		},
	},
};

export const value = {
	name: "value",
	render: () => (
		<Example>
			<Example.Item title="value: 50">
				<Progress value={50} ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="value: 20, min: 0, max: 40">
				<Progress value={20} min={0} max={40} ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="value: 50, min: 0, max: 40">
				<Progress value={50} min={0} max={40} ariaLabel="rating value" />
			</Example.Item>
		</Example>
	),
};

export const size = {
	name: "size",
	render: () => (
		<Example>
			<Example.Item title="size: small, value: 50">
				<Progress value={50} size="small" ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="size: medium, value: 50">
				<Progress value={50} size="medium" ariaLabel="rating value" />
			</Example.Item>
		</Example>
	),
};

export const color = {
	name: "color",
	render: () => (
		<Example>
			<Example.Item title="color: critical, value: 50">
				<Progress value={50} color="critical" ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="color: warning, value: 50">
				<Progress value={50} color="warning" ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="color: positive, value: 50">
				<Progress value={50} color="positive" ariaLabel="rating value" />
			</Example.Item>
			<Example.Item title="color: media, value: 50">
				<View padding={4} backgroundColor="black" borderRadius="medium">
					<Progress value={50} color="media" ariaLabel="rating value" />
				</View>
			</Example.Item>
		</Example>
	),
};

export const duration = {
	name: "duration",
	render: () => {
		const [active, setActive] = React.useState(false);

		const handleChange = () => {
			setActive((state) => !state);
		};

		return (
			<Example>
				<Example.Item title="duration: 2000">
					<View gap={3}>
						<View.Item>
							<Button onClick={handleChange}>Change</Button>
						</View.Item>

						<Progress value={active ? 100 : 0} duration={2000} ariaLabel="rating value" />
					</View>
				</Example.Item>
			</Example>
		);
	},
};

export const render: StoryObj = {
	name: "rendering",
	render: () => <Progress value={75} min={50} max={100} ariaLabel="progress" />,
	play: async ({ canvas }) => {
		const el = canvas.getByRole("progressbar");

		expect(el).toBeInTheDocument();
		expect(el).toHaveAttribute("aria-valuenow", "75");
		expect(el).toHaveAttribute("aria-valuemin", "50");
		expect(el).toHaveAttribute("aria-valuemax", "100");
		expect(el).toHaveAccessibleName("progress");
	},
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Progress className="test-classname" attributes={{ id: "test-id" }} ariaLabel="progress" />
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");
	},
};
