import { StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";

import Button from "components/Button";
import Stepper from "components/Stepper";
import View from "components/View";
import { Example, Placeholder } from "utilities/storybook";

export default {
	title: "Components/Stepper",
	component: Stepper,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/stepper",
		},
	},
};

const Demo: React.FC<{ subtitle?: string; activeId?: number }> = (props) => {
	const [activeId, setActiveId] = React.useState(props.activeId ?? 1);

	const content = (
		<View gap={3}>
			<Placeholder />
			<View direction="row" gap={3}>
				<Button onClick={() => setActiveId((prev) => Math.max(0, prev - 1))}>Previous</Button>
				<Button onClick={() => setActiveId((prev) => Math.min(2, prev + 1))}>Next</Button>
			</View>
		</View>
	);

	return (
		<Stepper activeId={activeId} direction="column">
			<Stepper.Item
				completed={activeId > 0}
				title="Step 1"
				subtitle={props.subtitle || "Step subtitle"}
			>
				{content}
			</Stepper.Item>
			<Stepper.Item completed={activeId > 1} title="Step 2">
				{content}
			</Stepper.Item>
			<Stepper.Item completed={activeId > 2} title="Step 3 very long title">
				{content}
			</Stepper.Item>
		</Stepper>
	);
};

export const direction = {
	name: "direction",
	render: () => (
		<Example>
			<Example.Item title="direction: row">
				<Stepper activeId="1">
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
			<Example.Item title="direction: column">
				<Stepper activeId="1" direction="column">
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
		</Example>
	),
};

export const labelDisplay = {
	name: "labelDisplay",
	render: () => (
		<Example>
			<Example.Item title="direction: row, labels hidden">
				<Stepper activeId="1" labelDisplay="hidden">
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
			<Example.Item title="direction: column, labels hiden">
				<Stepper activeId="1" direction="column" labelDisplay="hidden">
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
			<Example.Item title="direction: row, labels hidden on s">
				<Stepper activeId="1" labelDisplay={{ s: "hidden", m: "inline" }}>
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
		</Example>
	),
};

export const gap = {
	name: "gap",
	render: () => (
		<Example>
			<Example.Item title="gap: 6, direction: row">
				<Stepper activeId="1" gap={6}>
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
			<Example.Item title="gap: 6, direction: column">
				<Stepper activeId="1" direction="column" gap={6}>
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
			<Example.Item title={["responsive gap", "[s] 2", "[m+] 5"]}>
				<Stepper activeId="1" gap={{ s: 2, m: 5 }}>
					<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
					<Stepper.Item title="Step 2" />
					<Stepper.Item title="Step 3 very long title" />
				</Stepper>
			</Example.Item>
		</Example>
	),
};

export const className: StoryObj = {
	name: "className, attributes",
	render: () => (
		<div data-testid="root">
			<Stepper className="test-classname" attributes={{ id: "test-id" }}>
				<Stepper.Item attributes={{ id: "test-item-id" }} className="test-item-classname" />
			</Stepper>
		</div>
	),
	play: async ({ canvas }) => {
		const root = canvas.getByTestId("root").firstChild;
		const item = root?.firstChild;

		expect(root).toHaveClass("test-classname");
		expect(root).toHaveAttribute("id", "test-id");

		expect(item).toHaveClass("test-item-classname");
		expect(item).toHaveAttribute("id", "test-item-id");
	},
};

export const edgeCases = {
	name: "test: edge cases",
	render: () => (
		<Example>
			<Example.Item
				title={[
					"multiline subtitle",
					"should wrap the text correctly",
					"should display the connector correctly",
				]}
			>
				<Demo
					activeId={0}
					subtitle="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy"
				/>
			</Example.Item>
		</Example>
	),
};
