import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { Example, Placeholder } from "@/utilities/storybook";

export default {
	title: "Components/Card",
	component: Card,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/components/card",
		},
	},
};

export const padding = {
	name: "padding",
	render: () => (
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
	),
};

export const borderRadius = {
	name: "borderRadius",
	render: () => (
		<Example>
			<Example.Item title="borderRadius: small">
				<Card borderRadius="small">
					<Placeholder h={10} />
				</Card>
			</Example.Item>
			<Example.Item title="borderRadius: medium">
				<Card borderRadius="medium">
					<Placeholder h={30} />
				</Card>
			</Example.Item>
			<Example.Item title="borderRadius: large">
				<Card borderRadius="large">
					<Placeholder h={60} />
				</Card>
			</Example.Item>
			<Example.Item title={["borderRadius: responsive", "[s] small", "[m+] large"]}>
				<Card borderRadius={{ s: "small", m: "large" }}>
					<Placeholder h={60} />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const selected = {
	name: "selected",
	render: () => {
		const [selected, setSelected] = useState(true);

		return (
			<Example title={<Button onClick={() => setSelected(!selected)}>Toggle selecion</Button>}>
				<Example.Item title="selected">
					<Card selected={selected}>
						<Placeholder />
					</Card>
				</Example.Item>
			</Example>
		);
	},
};

export const raised = {
	name: "raised",
	render: () => (
		<Example>
			<Example.Item title="raised">
				<Card raised>
					<Placeholder />
				</Card>
			</Example.Item>
		</Example>
	),
};

export const bleed = {
	name: "bleed",
	render: () => (
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
	),
};

export const layout = {
	name: "height, direction, gap, align, justify",
	render: () => (
		<Example>
			<Example.Item title="height: 200px">
				<Card height="200px" />
			</Example.Item>

			<Example.Item title="direction: row, gap: 4, align: center, justify: space-between">
				<Card direction="row" gap={4} align="center" justify="space-between">
					<Placeholder />
					<Placeholder h={100} />
				</Card>
			</Example.Item>
		</Example>
	),
};
