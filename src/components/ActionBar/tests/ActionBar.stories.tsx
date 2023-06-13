import React from "react";
import { Placeholder, Example } from "utilities/storybook";
import ActionBar from "components/ActionBar";

export default { title: "Components/ActionBar" };

export const position = () => (
	<Example>
		<Example.Item title="position: top">
			<ActionBar position="top">
				<Placeholder />
			</ActionBar>
		</Example.Item>

		<Example.Item title="position: bottom">
			<ActionBar>
				<Placeholder />
			</ActionBar>
		</Example.Item>
	</Example>
);

export const elevated = () => (
	<Example>
		<Example.Item title="elevated, position: top">
			<ActionBar position="top" elevated>
				<Placeholder />
			</ActionBar>
		</Example.Item>

		<Example.Item title="elevated, position: bottom">
			<ActionBar elevated>
				<Placeholder h={16} />
			</ActionBar>
		</Example.Item>
	</Example>
);

export const padding = () => (
	<Example>
		<Example.Item title="padding: 6">
			<ActionBar padding={6}>
				<Placeholder />
			</ActionBar>
		</Example.Item>

		<Example.Item title={["padding: responsive", "[s] 4", "[m+] 6"]}>
			<ActionBar padding={{ s: 4, m: 6 }}>
				<Placeholder />
			</ActionBar>
		</Example.Item>
	</Example>
);
