import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import Stepper from "components/Stepper";
import Button from "components/Button";
import View from "components/View";

export default {
	title: "Components/Stepper",
	component: Stepper,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/stepper",
		},
	},
};

const Demo = (props: { subtitle?: string; activeId?: number }) => {
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

export const direction = () => (
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
);

export const labelDisplay = () => (
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
);

export const edgeCases = () => (
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
);
