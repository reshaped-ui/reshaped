import React from "react";
import { Example, Placeholder } from "utilities/storybook";
import Accordion from "components/Accordion";
import Button from "components/Button";
import View from "components/View";
import useToggle from "hooks/useToggle";

export default {
	title: "Utilities/Accordion",
	component: Accordion,
	parameters: {
		iframe: {
			url: "https://reshaped.so/docs/utilities/accordion",
		},
	},
};

class CustomElement extends window.HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });

		if (!this.shadowRoot) return;

		const overlay = (
			<Reshaped>
				<Overlay active>Content</Overlay>
			</Reshaped>
		);
		const root = createRoot(this.shadowRoot);
		root.render(overlay);
	}
}

if (!window.customElements.get("rs-scope")) {
	window.customElements.define("rs-scope", CustomElement);
}

export const behavior = () => (
	<Example>
		<Example.Item title="uncontrolled">
			<Accordion>
				<Accordion.Trigger>Uncontrolled accordion</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
		<Example.Item title="active, uncontrolled">
			<Accordion defaultActive>
				<Accordion.Trigger>Action uncontrolled</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
		<Example.Item title="active, controlled">
			<Accordion active>
				<Accordion.Trigger>Active controlled</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
	</Example>
);

export const icon = () => (
	<Example>
		<Example.Item title="iconSize">
			<Accordion iconSize={6}>
				<Accordion.Trigger>Accordion trigger</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
		<Example.Item title="iconPosition">
			<Accordion iconPosition="start">
				<Accordion.Trigger>Accordion trigger</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
	</Example>
);

export const renderProps = () => (
	<Example>
		<Example.Item title="button controlling accordion content">
			<Accordion>
				<Accordion.Trigger>
					{(attributes, { active }) => (
						<Button attributes={attributes} highlighted={active}>
							Toggle
						</Button>
					)}
				</Accordion.Trigger>
				<Accordion.Content>
					<View paddingTop={2}>
						<Placeholder />
					</View>
				</Accordion.Content>
			</Accordion>
		</Example.Item>
	</Example>
);

const DemoMultiple = () => {
	const [activeValue, setActiveValue] = React.useState<number | null>(null);

	return (
		<View gap={2}>
			{[1, 2, 3].map((i) => (
				<View
					key={i}
					backgroundColor={activeValue === i ? "elevation-base" : undefined}
					animated
					borderRadius="medium"
					borderColor={activeValue === i ? "neutral-faded" : "transparent"}
					shadow={activeValue === i ? "raised" : undefined}
					padding={2}
				>
					<Accordion
						active={activeValue === i}
						onToggle={(active) => setActiveValue(active ? i : null)}
					>
						<Accordion.Trigger>Accordion trigger</Accordion.Trigger>
						<Accordion.Content>
							<View paddingTop={2}>
								<Placeholder />
							</View>
						</Accordion.Content>
					</Accordion>
				</View>
			))}
		</View>
	);
};

export const composition = () => {
	const toggle = useToggle();

	return (
		<Example>
			<Example.Item title="custom content size">
				<Accordion>
					<Accordion.Trigger>Accordion trigger</Accordion.Trigger>
					<Accordion.Content>
						<View paddingTop={2}>
							<Placeholder h={200} />
						</View>
					</Accordion.Content>
				</Accordion>
			</Example.Item>
			<Example.Item title="inside View">
				<View backgroundColor="neutral-faded" borderRadius="medium" padding={4}>
					<Accordion>
						<Accordion.Trigger>Accordion trigger</Accordion.Trigger>
						<Accordion.Content>
							<View paddingTop={2}>
								<Placeholder />
							</View>
						</Accordion.Content>
					</Accordion>
				</View>
			</Example.Item>
			<Example.Item title="multiple items, depending on state">
				<DemoMultiple />
			</Example.Item>
			<Example.Item title="external trigger">
				<Button onClick={toggle.toggle}>Toggle</Button>
				<Accordion active={toggle.active}>
					<Accordion.Content>
						<View paddingTop={2}>
							<Placeholder />
						</View>
					</Accordion.Content>
				</Accordion>
			</Example.Item>
		</Example>
	);
};
