import React from "react";
import { Example } from "utilities/storybook";
import Stepper from "components/Stepper";
import Button from "components/Button";
import View from "components/View";

export default { title: "Components/Stepper" };

const Demo = () => {
	const [activeId, setActiveId] = React.useState(1);

	const content = (
		<View gap={3}>
			<View.Item>Content</View.Item>
			<View direction="row" gap={3}>
				<Button onClick={() => setActiveId((prev) => prev - 1)}>Previous</Button>
				<Button onClick={() => setActiveId((prev) => prev + 1)}>Next</Button>
			</View>
		</View>
	);

	return (
		<Stepper activeId={activeId.toString()} direction="column">
			<Stepper.Item completed={activeId > 0} title="Step 1" subtitle="Step subtitle">
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

export const base = () => (
	<Example>
		<Example.Item title="direction: row">
			<Stepper activeId="1">
				<Stepper.Item completed title="Step 1" subtitle="Step subtitle" />
				<Stepper.Item title="Step 2" />
				<Stepper.Item title="Step 3 very long title" />
			</Stepper>
		</Example.Item>
		<Example.Item title="direction: column">
			<Demo />
		</Example.Item>
	</Example>
);
