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

export const base = {
	name: "base",
	render: () => (
		<Example>
			<Example.Item title="base">
				<Accordion defaultActive>
					<Accordion.Trigger>Trigger</Accordion.Trigger>
					<Accordion.Content>
						<View paddingTop={2}>
							<Placeholder />
						</View>
					</Accordion.Content>
				</Accordion>
			</Example.Item>
		</Example>
	),
};

export const icon = {
	name: "iconSize, iconPosition",
	render: () => (
		<Example>
			<Example.Item title="iconSize: 6">
				<Accordion iconSize={6}>
					<Accordion.Trigger>Trigger</Accordion.Trigger>
					<Accordion.Content>
						<View paddingTop={2}>
							<Placeholder />
						</View>
					</Accordion.Content>
				</Accordion>
			</Example.Item>

			<Example.Item title="iconPosition: start">
				<Accordion iconPosition="start">
					<Accordion.Trigger>Trigger</Accordion.Trigger>
					<Accordion.Content>
						<View paddingTop={2}>
							<Placeholder />
						</View>
					</Accordion.Content>
				</Accordion>
			</Example.Item>
		</Example>
	),
};

export const composition = {
	name: "composition",
	render: () => {
		const toggle = useToggle();
		const [activeValue, setActiveValue] = React.useState<number | null>(null);

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
	},
};
