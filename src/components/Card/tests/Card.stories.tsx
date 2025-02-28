import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import Card from "components/Card";
import View from "components/View";

export default {
	title: "Components/Card",
	component: Card,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/card",
		},
	},
};

export const padding = () => (
	<Example>
		<Example.Item title="padding: default">
			<Card>
				<Placeholder />
			</Card>
		</Example.Item>

		<Example.Item title="padding: 2">
			<Card padding={2}>
				<Placeholder />
			</Card>
		</Example.Item>

		<Example.Item title="padding: 0">
			<Card padding={0}>
				<Placeholder />
			</Card>
		</Example.Item>

		<Example.Item title={["responsive padding", "[s] 4", "[m+] 8"]}>
			<Card padding={{ s: 4, m: 8 }}>
				<Placeholder />
			</Card>
		</Example.Item>
	</Example>
);

export const actionable = () => (
	<Example>
		<Example.Item title="button role">
			<Card onClick={() => {}} attributes={{ "aria-label": "action" }}>
				<Placeholder />
			</Card>
		</Example.Item>
		<Example.Item title="link role">
			<Card href="#" attributes={{ "aria-label": "action" }}>
				<Placeholder />
			</Card>
		</Example.Item>
	</Example>
);

export const selected = () => (
	<Example>
		<Example.Item title="selected">
			<Card selected>
				<Placeholder />
			</Card>
		</Example.Item>
	</Example>
);

export const elevated = () => (
	<Example>
		<Example.Item title="elevated">
			<Card elevated>
				<Placeholder />
			</Card>
		</Example.Item>
	</Example>
);

export const bleed = () => (
	<Example>
		<Example.Item title="bleed: 4">
			<Card bleed={4}>
				<Placeholder />
			</Card>
		</Example.Item>
		<Example.Item title={["responsive bleed", "[s] 4", "[m+] 0"]}>
			<Card bleed={{ s: 4, m: 0 }}>
				<Placeholder />
			</Card>
		</Example.Item>
	</Example>
);

export const height = () => (
	<Example>
		<Example.Item title="height: 200px">
			<Card height="200px" />
		</Example.Item>
	</Example>
);
