import React from "react";
import { Example } from "utilities/storybook";
import View from "components/View";
import Button from "components/Button";
import Badge from "components/Badge";
import Alert from "components/Alert";
import Card from "components/Card";
import DropdownMenu from "components/DropdownMenu";
import Theme from "components/Theme";
import { getThemeCSS, generateThemeColors, baseThemeDefinition } from "themes";

export default { title: "Themes" };

const css = getThemeCSS("green", {
	color: {
		backgroundPrimary: { hex: "#1abc9c", hexDark: "#00E5C4" },
		backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#00E5C4" },
	},
});

const css2 = getThemeCSS("peach", {
	color: {
		backgroundPrimary: { hex: "#ffbe76" },
		backgroundPrimaryHighlighted: { hex: "#ffbe76" },
	},
});

const cssGenerated = getThemeCSS("generated", {
	...baseThemeDefinition,
	color: generateThemeColors({ primary: "#2563eb" }),
});

const componentExamples = (
	<View gap={4}>
		<View gap={2} direction="row">
			<Button color="primary">Primary button</Button>
			<Button color="critical">Primary button</Button>
			<Button color="positive">Primary button</Button>
			<Button color="neutral">Primary button</Button>
		</View>
		<View gap={2} direction="row">
			<Button color="primary" variant="outline">
				Primary button
			</Button>
			<Button color="critical" variant="outline">
				Primary button
			</Button>
			<Button color="positive" variant="outline">
				Primary button
			</Button>
			<Button color="neutral" variant="outline">
				Primary button
			</Button>
		</View>
		<View direction="row" gap={4}>
			<View.Item columns={6}>
				<Alert color="primary">Primary</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert color="critical">Critical</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert color="positive">Positive</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Alert color="neutral">Neutral</Alert>
			</View.Item>
			<View.Item columns={6}>
				<Card>
					<View gap={2} align="start">
						<Badge variant="outline" color="primary">
							Badge
						</Badge>
						<DropdownMenu>
							<DropdownMenu.Trigger>
								{(attributes) => (
									<Button variant="faded" attributes={attributes}>
										Menu
									</Button>
								)}
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item>Item 1</DropdownMenu.Item>
								<DropdownMenu.Item>Item 1</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					</View>
				</Card>
			</View.Item>
		</View>
	</View>
);

export const base = () => (
	<Example>
		<Example.Item title="custom runtime theme">
			<style>{css}</style>
			<Theme name="green">
				<Button color="primary">Primary button</Button>
			</Theme>
		</Example.Item>
		<Example.Item title="on colors generation">
			<style>{css2}</style>
			<Theme name="peach">
				<Button color="primary">Primary button</Button>
			</Theme>
		</Example.Item>
	</Example>
);

export const generation = () => (
	<Example>
		<Example.Item title="base">
			<style>{cssGenerated}</style>
			<View gap={4}>
				<View.Item>Generated theme</View.Item>
				<Theme name="generated">{componentExamples}</Theme>
				{/* <View.Item>Reshaped theme</View.Item> */}
				{/* <Theme name="reshaped">{componentExamples}</Theme> */}
			</View>
		</Example.Item>
	</Example>
);

const onColorsCss = getThemeCSS(
	"on-color",
	{
		color: {
			backgroundPrimary: { hex: "#1abc9c", hexDark: "#16a085" },
			backgroundPrimaryHighlighted: { hex: "#16a085", hexDark: "#1abc9c" },
		},
	},
	{
		onColorValues: {
			primary: {
				hexLight: "#d1fae5",
				hexDark: "#022c22",
			},
		},
	}
);

export const onColors = () => (
	<Example>
		<Example.Item title="custom on color values">
			<style>{onColorsCss}</style>
			<Theme name="on-color">
				<View gap={2} direction="row">
					<Button color="primary">Primary button</Button>
					<Button color="critical">Critical button</Button>
				</View>
			</Theme>
		</Example.Item>
	</Example>
);
